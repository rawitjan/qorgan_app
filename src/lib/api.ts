import type {
  EotinishTemplate,
  LegalRecommendation,
  LensInputType,
  LensScan,
  OfficialLegalResource,
} from "@/types";

type ApiErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

export class ApiError extends Error {
  status: number;
  errors: Record<string, string[]>;

  constructor(status: number, body: ApiErrorBody) {
    super(body.message ?? "Request failed");
    this.name = "ApiError";
    this.status = status;
    this.errors = body.errors ?? {};
  }
}

type ApiOptions = {
  method?: string;
  token?: string | null;
  body?: unknown | FormData;
  signal?: AbortSignal;
};

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";
  const isFormData = options.body instanceof FormData;
  const headers: HeadersInit = { Accept: "application/json" };

  if (!isFormData) {
    headers["Content-Type"] = "application/json";
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  let requestBody: BodyInit | undefined;
  if (options.body !== undefined) {
    requestBody = isFormData ? (options.body as FormData) : JSON.stringify(options.body);
  }

  const response = await fetch(`${baseUrl}${path}`, {
    method: options.method ?? "GET",
    headers,
    body: requestBody,
    signal: options.signal,
    cache: "no-store",
  });

  if (response.status === 204) {
    return undefined as T;
  }

  const data = (await response.json()) as T & ApiErrorBody;

  if (!response.ok) {
    throw new ApiError(response.status, data);
  }

  return data;
}

export type User = {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
};

export type AuthResponse = {
  message: string;
  data: {
    token: string;
    token_type: string;
    user: User;
  };
};

export function register(payload: {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
}) {
  return api<AuthResponse>("/auth/register", { method: "POST", body: payload });
}

export function login(payload: {
  email: string;
  password: string;
  device_name?: string;
}) {
  return api<AuthResponse>("/auth/login", { method: "POST", body: payload });
}

export function logout(token: string) {
  return api<{ message: string; data: null }>("/auth/logout", { method: "POST", token });
}

export function me(token: string) {
  return api<{ message: string; data: User }>("/me", { token });
}

const ACCESS_TOKEN_STORAGE_KEY = "qorgan_access_token";
const ACCESS_TOKEN_EMAIL_STORAGE_KEY = "qorgan_access_token_email";
const DEMO_EMAIL_STORAGE_KEY = "qorgan_demo_email";
const DEFAULT_DEMO_EMAIL = "standard@qorgan.kz";
export const DEMO_ACCOUNT_CHANGED_EVENT = "qorgan:demo-account-changed";

export function selectDemoAccountForApi(email: string): void {
  if (typeof window === "undefined") return;

  const previousEmail = window.localStorage.getItem(DEMO_EMAIL_STORAGE_KEY);
  window.localStorage.setItem(DEMO_EMAIL_STORAGE_KEY, email);

  if (previousEmail !== email) {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(ACCESS_TOKEN_EMAIL_STORAGE_KEY);
    window.dispatchEvent(new Event(DEMO_ACCOUNT_CHANGED_EVENT));
  }
}

export async function getAccessToken(forceRefresh = false): Promise<string> {
  if (typeof window === "undefined") {
    throw new ApiError(401, { message: "Authentication is available only in the browser." });
  }

  if (forceRefresh) {
    window.localStorage.removeItem(ACCESS_TOKEN_STORAGE_KEY);
    window.localStorage.removeItem(ACCESS_TOKEN_EMAIL_STORAGE_KEY);
  }

  const email = window.localStorage.getItem(DEMO_EMAIL_STORAGE_KEY) ?? DEFAULT_DEMO_EMAIL;
  const savedToken = window.localStorage.getItem(ACCESS_TOKEN_STORAGE_KEY);
  const savedTokenEmail = window.localStorage.getItem(ACCESS_TOKEN_EMAIL_STORAGE_KEY);
  if (savedToken && savedTokenEmail === email) return savedToken;

  const response = await login({
    email,
    password: process.env.NEXT_PUBLIC_DEMO_PASSWORD ?? "password",
    device_name: "qorgan-web",
  });
  const token = response.data.token;
  window.localStorage.setItem(ACCESS_TOKEN_STORAGE_KEY, token);
  window.localStorage.setItem(ACCESS_TOKEN_EMAIL_STORAGE_KEY, email);

  return token;
}

type CreateLensScanResponse = {
  id: number;
  status: LensScan["status"];
};

type LensScanResourceResponse = {
  data: LensScan;
};

type LensScanCollectionResponse = {
  data: LensScan[];
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (typeof value === "string") {
    try {
      return asRecord(JSON.parse(value));
    } catch {
      return null;
    }
  }

  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : null;
}

function asString(value: unknown, fallback = ""): string {
  return typeof value === "string" ? value : fallback;
}

function asStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim().length > 0)
    : [];
}

function normalizeEotinishTemplate(value: unknown): EotinishTemplate | null {
  const data = asRecord(value);
  if (!data) return null;

  const bodyKz = asString(data.body_kz ?? data.bodyKz);
  const bodyRu = asString(data.body_ru ?? data.bodyRu);
  if (!bodyKz && !bodyRu) return null;

  return {
    article: asString(data.article),
    article_ru: asString(data.article_ru ?? data.articleRu) || undefined,
    authority: asString(data.authority),
    authority_ru: asString(data.authority_ru ?? data.authorityRu) || undefined,
    subject: asString(data.subject),
    subject_ru: asString(data.subject_ru ?? data.subjectRu) || undefined,
    portal_url: asString(data.portal_url ?? data.portalUrl, "https://eotinish.kz"),
    body_kz: bodyKz || bodyRu,
    body_ru: bodyRu || bodyKz,
  };
}

function normalizeOfficialResources(value: unknown): OfficialLegalResource[] {
  if (!Array.isArray(value)) return [];

  return value.flatMap((item) => {
    const data = asRecord(item);
    if (!data) return [];

    return [{
      name: asString(data.name),
      contact: asString(data.contact),
      type: asString(data.type),
      description: asString(data.description),
      url: asString(data.url) || null,
      is_emergency: Boolean(data.is_emergency ?? data.isEmergency),
    }];
  });
}

function normalizeLegalRecommendation(value: unknown): LegalRecommendation | null {
  const data = asRecord(value);
  if (!data) return null;

  const template = normalizeEotinishTemplate(
    data.eotinish_template ?? data.eOtinishTemplate ?? data.e_otinish_template
  );

  return {
    title: asString(data.title),
    situation_explanation: asString(data.situation_explanation ?? data.situationExplanation),
    document_explanation:
      asString(data.document_explanation ?? data.documentExplanation) || undefined,
    important_points: asStringArray(
      data.important_points ?? data.importantPoints ?? data.potentially_important_clauses
    ),
    recommended_steps: asStringArray(
      data.recommended_steps ?? data.recommendedSteps ?? data.general_next_steps
    ),
    official_resources: normalizeOfficialResources(
      data.official_resources ?? data.officialResources
    ),
    disclaimer: asString(data.disclaimer),
    eotinish_template: template,
  };
}

function normalizeLensScan(scan: LensScan): LensScan {
  const raw = scan as LensScan & Record<string, unknown>;

  return {
    ...scan,
    legal_recommendation: normalizeLegalRecommendation(
      raw.legal_recommendation ?? raw.legalRecommendation
    ),
    findings: Array.isArray(scan.findings) ? scan.findings : [],
    signals: Array.isArray(scan.signals) ? scan.signals : [],
  };
}

export function createLensScan(
  token: string,
  payload: {
    inputType: LensInputType;
    content?: string;
    file?: File | null;
  },
  signal?: AbortSignal
): Promise<CreateLensScanResponse> {
  const body = new FormData();
  body.set("input_type", payload.inputType);

  if (payload.content) body.set("content", payload.content);
  if (payload.file) body.set("file", payload.file);

  return api<CreateLensScanResponse>("/lens/scans", {
    method: "POST",
    token,
    body,
    signal,
  });
}

export async function getLensScan(
  token: string,
  scanId: number,
  signal?: AbortSignal
): Promise<LensScan> {
  const response = await api<LensScanResourceResponse>(`/lens/scans/${scanId}`, {
    token,
    signal,
  });

  return normalizeLensScan(response.data);
}

export async function listLensScans(token: string, signal?: AbortSignal): Promise<LensScan[]> {
  const response = await api<LensScanCollectionResponse>("/lens/scans?per_page=50", {
    token,
    signal,
  });

  return response.data.map(normalizeLensScan);
}
