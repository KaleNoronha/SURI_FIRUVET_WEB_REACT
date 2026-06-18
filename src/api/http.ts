import type { RequestOptions, ApiErrorResponse, HttpClient } from "@appTypes/https.types.js";

const API_URL = import.meta.env.VITE_URL_BASE ?? "https://suri-firuvet-ios-damii-api.onrender.com";

/**
 * Cliente HTTP basado en fetch nativo.
 * Centraliza URL base, serialización JSON y manejo de errores.
 */
async function httpClient<T = unknown>(
    endpoint: string,
    options: RequestOptions = {}
): Promise<T> {
    const { method = "GET", body, params, headers = {} } = options;

    const url = new URL(`${API_URL}${endpoint}`);
    if (params) {
        Object.entries(params).forEach(([key, value]) => {
            url.searchParams.append(key, value);
        });
    }

    const config: RequestInit = {
        method,
        headers: {
            "Content-Type": "application/json",
            ...headers,
        },
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    const response = await fetch(url.toString(), config);

    let data: unknown;
    const contentType = response.headers.get("content-type");
    if (contentType?.includes("application/json")) {
        data = await response.json();
    } else {
        data = await response.text();
    }

    if (!response.ok) {
        const errorBody = data as ApiErrorResponse;
        const errorMessage =
            errorBody?.error ??
            errorBody?.message ??
            `Error ${response.status}: ${response.statusText}`;
        throw new Error(errorMessage);
    }

    return data as T;
}

export const api: HttpClient = {
    get: <T = unknown>(endpoint: string, params?: Record<string, string>) =>
        httpClient<T>(endpoint, { method: "GET", params }),

    post: <T = unknown>(endpoint: string, body: unknown) =>
        httpClient<T>(endpoint, { method: "POST", body }),

    put: <T = unknown>(endpoint: string, body: unknown) =>
        httpClient<T>(endpoint, { method: "PUT", body }),

    patch: <T = unknown>(endpoint: string, body: unknown) =>
        httpClient<T>(endpoint, { method: "PATCH", body }),

    delete: <T = unknown>(endpoint: string) =>
        httpClient<T>(endpoint, { method: "DELETE" }),
};

export { API_URL, httpClient };
