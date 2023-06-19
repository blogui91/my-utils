/* eslint-disable no-unused-vars */
import { AxiosRequestConfig } from 'axios';

import Http from '../http';
import {
  Config,
  CurrentUser,
  LoginFormData,
  LoginResponse,
  RegisterFormData,
  RegisterResponse,
} from './types';

export default class Auth extends Http {
  private loginEndpoint: string = 'auth/login';
  private logoutEndpoint: string = 'auth/logout';
  private currentUserEndpoint: string = 'auth/me';
  private registerEndpoint: string = 'auth/register';

  public onRegister?: (data: RegisterResponse) => void;
  public onLogin?: (data: LoginResponse) => void;
  public onLogout?: () => void;
  public onUnauthorized?: () => void;
  public onUserChange?: (user: CurrentUser | null) => void;
  public user: CurrentUser | null = null;

  constructor(config: Config) {
    const options: AxiosRequestConfig = {
        ...config,
    };

    super(options);

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
  }

  getCurrentUser = async () => {
    const token = this.getToken();

    if (!token) {
      return null;
    }

    try {
      const response = await this.get<{ data: CurrentUser }>(
        this.currentUserEndpoint,
      );

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

  setLoginEndpoint = (loginEndpoint: string) => {
    this.loginEndpoint = loginEndpoint;

    return this;
  };

  setLogoutEndpoint = (logoutEndpoint: string) => {
    this.logoutEndpoint = logoutEndpoint;

    return this;
  };

  setRegisterEndpoint = (registerEndpoint: string) => {
    this.registerEndpoint = registerEndpoint;

    return this;
  };

  setCurrentUserEndpoint = (currentUserEndpoint: string) => {
    this.currentUserEndpoint = currentUserEndpoint;

    return this;
  };

  register = async (formData: RegisterFormData) => {
    const response = await this.post<RegisterFormData, RegisterResponse>(
      this.registerEndpoint,
      {
        ...formData,
      },
    );

    if (this.onRegister) {
      this.onRegister(response);
    }

    return response.data;
  };

  login = async ({ email, password }: LoginFormData) => {
    const response = await this.post<LoginFormData, LoginResponse>(
      this.loginEndpoint,
      {
        email,
        password,
      },
    );

    this.setToken(response.data.token);

    this.user = response.data.data;

    if (this.onLogin) {
      this.onLogin(response);
    }

    if (this.onUserChange) {
      this.onUserChange(response.data.data);
    }

    return response.data;
  }

  logout = async () => {
    try {
      await this.post(this.logoutEndpoint);

      this.clearToken();

      this.user = null;

      if (this.onUserChange) {
        this.onUserChange(null);
      }

      if (this.onLogout) {
        this.onLogout();
      }

      return true;
    } catch (error) {
      return error;
    }
  }
}

export const createAuth = (config: Config) => new Auth(config); 
