/* eslint-disable no-unused-vars */
import axios from 'axios';

import { Config, CurrentUser, LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from './types';

class Auth {
  private baseURL: string = '';
  private loginEndpoint: string = 'auth/login';
  private logoutEndpoint: string = 'auth/logout';
  private currentUserEndpoint: string = 'auth/me';
  private registerEndpoint: string = 'auth/register';
  private tokenKey = 'token';
  private http = axios.create();

  public onRegister?: (data: RegisterResponse) => void;
  public onLogin?: (data: LoginResponse) => void;
  public onLogout?: () => void;
  public onUnauthorized?: () => void;
  public onUserChange?: (user: CurrentUser|null) => void;
  public user: CurrentUser | null = null;

  constructor(config?: Config) {
    this.http = axios.create();
    
    if (config?.baseURL) {
      this.baseURL = config.baseURL;
      this.http.defaults.baseURL = this.baseURL;
    }
    
    if (config?.loginEndpoint) {
      this.loginEndpoint = config.loginEndpoint;
    }

    if (config?.logoutEndpoint) {
      this.logoutEndpoint = config.logoutEndpoint;
    }

    if (config?.registerEndpoint) {
      this.registerEndpoint = config.registerEndpoint;
    }

    if (config?.currentUserEndpoint) {
      this.currentUserEndpoint = config.currentUserEndpoint;
    }

    this.http.defaults.headers.common['Content-Type'] = 'application/json';
    this.http.defaults.headers.common['Accept'] = 'application/json';

    this.http.interceptors.request.use((config) => {
      const token = localStorage.getItem(this.tokenKey);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  setBaseURL = (baseURL: string) => {
    this.baseURL = baseURL;
    this.http.defaults.baseURL = baseURL;

    return this;
  }

  setLoginEndpoint = (loginEndpoint: string) => {
    this.loginEndpoint = loginEndpoint;

    return this;
  }

  setLogoutEndpoint = (logoutEndpoint: string) => {
    this.logoutEndpoint = logoutEndpoint;

    return this;
  }

  setRegisterEndpoint = (registerEndpoint: string) => {
    this.registerEndpoint = registerEndpoint;

    return this;
  }

  setCurrentUserEndpoint = (currentUserEndpoint: string) => {
    this.currentUserEndpoint = currentUserEndpoint;

    return this;
  }

  register = async (formData: RegisterFormData) => {
    const response = await this.http.post<RegisterFormData, RegisterResponse>(this.registerEndpoint, {
      ...formData,
    });

    if (this.onRegister) {
      this.onRegister(response);
    }

    return response.data;
  }

  async login({ email, password }: LoginFormData) {
    const response = await this.http.post<LoginFormData, LoginResponse>(this.loginEndpoint, {
      email,
      password,
    });

    localStorage.setItem(this.tokenKey, response.data.token);

    this.user = response.data.data;

    if (this.onLogin) {
      this.onLogin(response);
    }

    if (this.onUserChange) {
      this.onUserChange(response.data.data);
    }
    
    return response.data;
  };

  async logout() {
    try {
      const response = await this.http.post(this.logoutEndpoint);

      localStorage.removeItem(this.tokenKey);

      this.user = null;

      if (this.onUserChange) {
        this.onUserChange(null);
      }

      if (this.onLogout) {
        this.onLogout();
      }

      return response.data;
    } catch (error) {
      return error;
    }
  };

  isAuthenticated = () => {
    const token = localStorage.getItem(this.tokenKey);

    return !!token;
  }


  async getCurrentUser() {
    const token = localStorage.getItem(this.tokenKey);

    if (!token) {
      return null;
    }

    try {
      const response = await this.http.get<{ data: CurrentUser }>(this.currentUserEndpoint);

      if (this.onUserChange) {
        this.onUserChange(response.data.data);
      }

      return response.data.data;
    } catch (error) {
      this.user = null;
      if (this.onUnauthorized) {
        this.onUnauthorized();
      }

      return null;
    }
  }


}

export const createAuth = (config?: Config) => new Auth(config);