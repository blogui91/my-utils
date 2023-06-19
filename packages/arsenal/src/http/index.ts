/* eslint-disable no-unused-vars */
import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

import { AxiosExtended } from './axiosExtended';

class Http extends AxiosExtended {
  private tokenKey = 'auth::token';

  public constructor(config: AxiosRequestConfig) {
    super(config);

    this.getUri = this.getUri.bind(this);
    this.request = this.request.bind(this);
    this.get = this.get.bind(this);
    this.options = this.options.bind(this);
    this.delete = this.delete.bind(this);
    this.head = this.head.bind(this);
    this.post = this.post.bind(this);
    this.put = this.put.bind(this);
    this.patch = this.patch.bind(this);

    this.interceptors.request.use(
      (config: any) => {
        const token = this.getToken();

        if (token) {
          config.headers.Authorization = token;
        }

        return config;
      },
      (error: unknown) => {
        // handling error
      },
    );

  }

  public getUri(config?: AxiosRequestConfig): string {
    return this.getUri(config);
  }

  public request<T = any, R = AxiosResponse<T>, D = any>(config: AxiosRequestConfig<D>): Promise<R> {
    return this.request(config);
  }
  
  public get<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.get(url, config);
  }

  public options<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.options(url, config);
  }
  
  public delete<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.delete(url, config);
  }

  public head<T = any, R = AxiosResponse<T>, D = any>(url: string, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.head(url, config);
  }

  public post<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.post(url, data, config);
  }
 
  public put<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.put(url, data, config);
  }
 
  public patch<T = any, R = AxiosResponse<T>, D = any>(url: string, data?: D, config?: AxiosRequestConfig<D>): Promise<R> {
    return this.patch(url, data, config);
  }

  public success<T>(response: AxiosResponse<T>): T {
    return response.data;
  }
 
  public error<T>(error: AxiosError<T>): void {
    throw error;
  }

  /**
   * Gets Token.
   *
   * @returns {string} token.
   * @memberof Api
   */
  getToken = (): string => {
    const token = localStorage.getItem(this.tokenKey);

    return `Bearer ${token}`;
  }
  /**
   * Sets Token.
   *
   * @param {string} token - token.
   * @memberof Api
   */
  setToken = (token: string): void => {
    localStorage.setItem(this.tokenKey, token);
  }

  clearToken = (): void => {
    localStorage.removeItem(this.tokenKey);
  }

  isAuthenticated = () => {
    const token = localStorage.getItem(this.tokenKey);

    return !!token;
  };
}

export default Http;

export const createHttp = (config: AxiosRequestConfig) => new Http(config);
