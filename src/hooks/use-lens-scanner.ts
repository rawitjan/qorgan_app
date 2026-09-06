'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import {
  ApiError,
  DEMO_ACCOUNT_CHANGED_EVENT,
  createLensScan,
  getAccessToken,
  getLensScan,
  listLensScans,
} from '@/lib/api';
import {
  LensFailureReason,
  LensInputType,
  LensScan,
  LensScanHistoryItem,
  LensScanStage,
  LensTechnicalDetails,
  Locale,
} from '@/types';
import { useMode } from '@/context/mode-context';
import { normalizeRiskLevel } from '@/lib/utils';

const POLL_INTERVAL_MS = 1_200;
const SCAN_TIMEOUT_MS = 240_000;

function toScannerStage(status: LensScan['status']): LensScanStage {
  return status === 'pending' ? 'preparing' : status;
}

function toFailureReason(error: unknown): LensFailureReason {
  if (error instanceof ApiError) {
    if (error.status === 422 || error.status === 401 || error.status === 403) {
      return 'invalid_input';
    }

    if (error.status >= 500) return 'provider_unavailable';
  }

  return 'network_error';
}

function toHistoryItem(scan: LensScan, locale: Locale): LensScanHistoryItem {
  const summary = scan.summary?.trim() || (locale === 'kk' ? 'Талдау аяқталды' : 'Анализ завершён');
  const payloadPreview =
    scan.input?.extracted_urls?.[0] ||
    scan.input?.original_filename ||
    scan.subcategory ||
    scan.category ||
    (locale === 'kk' ? 'Lens тексеруі' : 'Проверка Lens');

  return {
    id: scan.id,
    input_type: scan.input_type,
    payload_preview: payloadPreview,
    risk_score: scan.risk_score ?? 0,
    risk_level: normalizeRiskLevel(scan.risk_level, scan.risk_score),
    category: scan.category || 'unknown',
    summary_kk: summary,
    summary_ru: summary,
    created_at: scan.created_at
      ? new Intl.DateTimeFormat(locale === 'kk' ? 'kk-KZ' : 'ru-RU', {
          dateStyle: 'short',
          timeStyle: 'short',
        }).format(new Date(scan.created_at))
      : locale === 'kk'
        ? 'Жаңа ғана'
        : 'Только что',
    findings_count: scan.findings?.length ?? 0,
  };
}

function toTechnicalDetails(scan: LensScan, fallbackTarget: string): LensTechnicalDetails {
  const metadata = scan.input?.metadata ?? {};
  const startedAt = scan.started_at ? new Date(scan.started_at).getTime() : 0;
  const completedAt = scan.completed_at ? new Date(scan.completed_at).getTime() : 0;
  const extractedTarget = scan.input?.extracted_urls?.[0] || scan.input?.original_filename;

  return {
    target: extractedTarget || fallbackTarget,
    sha256_hash:
      typeof metadata.sha256 === 'string'
        ? metadata.sha256
        : typeof metadata.hash === 'string'
          ? metadata.hash
          : '—',
    heuristic_signals: (scan.signals ?? []).map((signal) => signal.title),
    execution_duration_ms:
      startedAt > 0 && completedAt >= startedAt ? completedAt - startedAt : 0,
  };
}

function waitForNextPoll(signal: AbortSignal): Promise<void> {
  return new Promise((resolve, reject) => {
    const timeoutId = window.setTimeout(resolve, POLL_INTERVAL_MS);

    signal.addEventListener(
      'abort',
      () => {
        window.clearTimeout(timeoutId);
        reject(new DOMException('The scan was cancelled.', 'AbortError'));
      },
      { once: true }
    );
  });
}

export function useLensScanner() {
  const { locale } = useMode();
  const activeRequestRef = useRef<AbortController | null>(null);
  const [inputType, setInputType] = useState<LensInputType>('url');
  const [inputPayload, setInputPayload] = useState('');
  const [filePayload, setFilePayload] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [stage, setStage] = useState<LensScanStage>('idle');
  const [failureReason, setFailureReason] = useState<LensFailureReason | null>(null);
  const [activeScan, setActiveScan] = useState<LensScan | null>(null);
  const [technicalDetails, setTechnicalDetails] = useState<LensTechnicalDetails | null>(null);
  const [history, setHistory] = useState<LensScanHistoryItem[]>([]);
  const [viewMode, setViewMode] = useState<'scanner' | 'history'>('scanner');

  const refreshHistory = useCallback(
    async (signal?: AbortSignal) => {
      const token = await getAccessToken();
      const scans = await listLensScans(token, signal);
      setHistory(
        scans
          .filter((scan) => scan.status === 'completed')
          .map((scan) => toHistoryItem(scan, locale))
      );
    },
    [locale]
  );

  useEffect(() => {
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => {
      refreshHistory(controller.signal).catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === 'AbortError')) {
          console.warn('Lens history is temporarily unavailable.', error);
        }
      });
    }, 0);

    return () => {
      window.clearTimeout(timeoutId);
      controller.abort();
    };
  }, [refreshHistory]);

  useEffect(() => {
    const handleAccountChange = () => {
      activeRequestRef.current?.abort();
      setActiveScan(null);
      setTechnicalDetails(null);
      setStage('idle');
      setHistory([]);
      refreshHistory().catch((error: unknown) => {
        console.warn('Lens history is temporarily unavailable.', error);
      });
    };

    window.addEventListener(DEMO_ACCOUNT_CHANGED_EVENT, handleAccountChange);
    return () => window.removeEventListener(DEMO_ACCOUNT_CHANGED_EVENT, handleAccountChange);
  }, [refreshHistory]);

  useEffect(() => {
    return () => {
      activeRequestRef.current?.abort();
      if (filePreview) URL.revokeObjectURL(filePreview);
    };
  }, [filePreview]);

  const startScan = useCallback(
    async (
      type: LensInputType = inputType,
      payload: string = inputPayload,
      triggerError?: LensFailureReason
    ): Promise<void> => {
      activeRequestRef.current?.abort();
      const controller = new AbortController();
      activeRequestRef.current = controller;
      const activePayload = payload.trim();

      setStage('preparing');
      setFailureReason(null);
      setActiveScan(null);
      setTechnicalDetails(null);

      if (triggerError) {
        setStage('failed');
        setFailureReason(triggerError);
        return;
      }

      if (!activePayload && !filePayload) {
        setStage('failed');
        setFailureReason('invalid_input');
        return;
      }

      try {
        let token = await getAccessToken();
        const createPayload = {
          inputType: type,
          content: filePayload ? undefined : activePayload,
          file: filePayload,
        };
        let createdScan: Awaited<ReturnType<typeof createLensScan>>;

        try {
          createdScan = await createLensScan(token, createPayload, controller.signal);
        } catch (error) {
          if (!(error instanceof ApiError) || error.status !== 401) throw error;

          token = await getAccessToken(true);
          createdScan = await createLensScan(token, createPayload, controller.signal);
        }
        const pollingStartedAt = Date.now();
        let scan = await getLensScan(token, createdScan.id, controller.signal);

        while (scan.status !== 'completed' && scan.status !== 'failed') {
          if (Date.now() - pollingStartedAt >= SCAN_TIMEOUT_MS) {
            throw new ApiError(504, { message: 'Lens scan timed out.' });
          }

          setStage(toScannerStage(scan.status));
          await waitForNextPoll(controller.signal);
          scan = await getLensScan(token, createdScan.id, controller.signal);
        }

        if (scan.status === 'failed') {
          setStage('failed');
          setFailureReason('scan_failed');
          return;
        }

        setActiveScan(scan);
        setTechnicalDetails(toTechnicalDetails(scan, activePayload || filePayload?.name || 'Lens'));
        setHistory((currentHistory) => [
          toHistoryItem(scan, locale),
          ...currentHistory.filter((item) => item.id !== scan.id),
        ]);
        setStage('completed');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;

        setStage('failed');
        setFailureReason(toFailureReason(error));
      } finally {
        if (activeRequestRef.current === controller) {
          activeRequestRef.current = null;
        }
      }
    },
    [filePayload, inputPayload, inputType, locale]
  );

  const resetScanner = useCallback(() => {
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    setStage('idle');
    setActiveScan(null);
    setTechnicalDetails(null);
    setFailureReason(null);
    setFilePayload(null);
    setFilePreview((currentPreview) => {
      if (currentPreview) URL.revokeObjectURL(currentPreview);
      return null;
    });
  }, []);

  const handleFileUpload = useCallback((file: File) => {
    setFilePayload(file);
    setFilePreview((currentPreview) => {
      if (currentPreview) URL.revokeObjectURL(currentPreview);
      return URL.createObjectURL(file);
    });
    setInputPayload(file.name);
  }, []);

  const selectHistoryScan = useCallback(
    async (item: LensScanHistoryItem): Promise<void> => {
      activeRequestRef.current?.abort();
      const controller = new AbortController();
      activeRequestRef.current = controller;
      setViewMode('scanner');
      setStage('preparing');
      setFailureReason(null);

      try {
        const token = await getAccessToken();
        const scan = await getLensScan(token, Number(item.id), controller.signal);
        setActiveScan(scan);
        setTechnicalDetails(toTechnicalDetails(scan, item.payload_preview));
        setStage(scan.status === 'failed' ? 'failed' : toScannerStage(scan.status));
        if (scan.status === 'failed') setFailureReason('scan_failed');
      } catch (error) {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setStage('failed');
        setFailureReason(toFailureReason(error));
      }
    },
    []
  );

  const deleteHistoryItem = useCallback((id: string | number) => {
    setHistory((currentHistory) => currentHistory.filter((item) => item.id !== id));
  }, []);

  const clearHistory = useCallback(() => {
    setHistory([]);
  }, []);

  return {
    inputType,
    setInputType,
    inputPayload,
    setInputPayload,
    filePayload,
    filePreview,
    handleFileUpload,
    stage,
    failureReason,
    activeScan,
    technicalDetails,
    history,
    viewMode,
    setViewMode,
    startScan,
    resetScanner,
    selectHistoryScan,
    deleteHistoryItem,
    clearHistory,
  };
}
