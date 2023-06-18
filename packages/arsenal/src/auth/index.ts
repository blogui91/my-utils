import axios from 'axios';

import { Config, LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from './types';

class Auth {
  private baseURL: string;
  private loginURL: string = 'auth/login';
  private logoutURL: string = 'auth/logout';
  private registerURL: string = 'auth/register';
  private tokenKey = 'token';

  // eslint-disable-next-line no-unused-vars
  public onRegister?: (data: RegisterResponse) => void;
  // eslint-disable-next-line no-unused-vars
  public onLogin?: (data: LoginResponse) => void;
  // eslint-disable-next-line no-unused-vars
  public onLogout?: () => void;

  constructor(config: Config) {
    this.baseURL = config.baseURL;
    this.loginURL = config.loginURL;
    this.logoutURL = config.logoutURL;

    axios.defaults.baseURL = this.baseURL;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.headers.common['Accept'] = 'application/json';
    axios.interceptors.request.use((config) => {
      const token = localStorage.getItem(this.tokenKey);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    });
  }

  register = async (formData: RegisterFormData) => {
    const response = await axios.post<RegisterFormData, RegisterResponse>(this.registerURL, {
      ...formData,
    });

    if (this.onRegister) {
      this.onRegister(response);
    }

    return response.data;
  }


  async login({ email, password }: LoginFormData) {
    const response = await axios.post<LoginFormData, LoginResponse>(this.loginURL, {
      email,
      password,
    });

    localStorage.setItem(this.tokenKey, response.data.token);

    if (this.onLogin) {
      this.onLogin(response);
    }
    
    return response.data;
  };

  logout = async () => {
    try {
      const response = await axios.post(this.logoutURL);

      localStorage.removeItem(this.tokenKey);

      if (this.onLogout) {
        this.onLogout();
      }

      return response.data;
    } catch (error) {
      return error;
    }
  };
}

export const createAuth = (config: Config) => new Auth(config);