import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { AxiosExtended } from './axiosExtended';
declare class Http extends AxiosExtended {
    private tokenKey;
    constructor(config: AxiosRequestConfig);
    getUri(config?: AxiosRequestConfig): string;
    request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R>;
    get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R>;
    post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R>;
    success<T>(response: AxiosResponse<T>): T;
    error<T>(error: AxiosError<T>): void;
    /**
     * Gets Token.
     *
     * @returns {string} token.
     * @memberof Api
     */
    getToken: () => string;
    /**
     * Sets Token.
     *
     * @param {string} token - token.
     * @memberof Api
     */
    setToken: (token: string) => void;
    clearToken: () => void;
    isAuthenticated: () => boolean;
}
export default Http;
export declare const createHttp: (config: AxiosRequestConfig) => Http;
