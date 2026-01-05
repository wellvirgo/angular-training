export interface ErrorDetail {
    object: string;
    field: string;
    error: string;
}

export interface PageInfo {
    page: number;
    size: number;
    totalElements: number;
    totalPages: number;
}

export interface ApiResponse<T> {
    code: string;
    message: string;
    data: T;
    error?: ErrorDetail[];
}