export interface RequestOptions {
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: unknown;
    params?: Record<string, string> | undefined;
    headers?: Record<string, string> | undefined;
}

export interface ApiErrorResponse {
    error?: string;
    message?: string;
}

export interface HttpClient {
    get: <T = unknown>(endpoint: string, params?: Record<string, string>) => Promise<T>;
    post: <T = unknown>(endpoint: string, body: unknown) => Promise<T>;
    put: <T = unknown>(endpoint: string, body: unknown) => Promise<T>;
    patch: <T = unknown>(endpoint: string, body: unknown) => Promise<T>;
    delete: <T = unknown>(endpoint: string) => Promise<T>;
}
