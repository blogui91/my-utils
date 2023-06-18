/* eslint-disable no-unused-vars */
import axios from 'axios';
class Auth {
    baseURL = '';
    loginEndpoint = 'auth/login';
    logoutEndpoint = 'auth/logout';
    currentUserEndpoint = 'auth/me';
    registerEndpoint = 'auth/register';
    tokenKey = 'token';
    http = axios.create();
    onRegister;
    onLogin;
    onLogout;
    onUnauthorized;
    onUserChange;
    user = null;
    constructor(config) {
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
    setBaseURL = (baseURL) => {
        this.baseURL = baseURL;
        this.http.defaults.baseURL = baseURL;
        return this;
    };
    setLoginEndpoint = (loginEndpoint) => {
        this.loginEndpoint = loginEndpoint;
        return this;
    };
    setLogoutEndpoint = (logoutEndpoint) => {
        this.logoutEndpoint = logoutEndpoint;
        return this;
    };
    setRegisterEndpoint = (registerEndpoint) => {
        this.registerEndpoint = registerEndpoint;
        return this;
    };
    setCurrentUserEndpoint = (currentUserEndpoint) => {
        this.currentUserEndpoint = currentUserEndpoint;
        return this;
    };
    register = async (formData) => {
        const response = await this.http.post(this.registerEndpoint, {
            ...formData,
        });
        if (this.onRegister) {
            this.onRegister(response);
        }
        return response.data;
    };
    async login({ email, password }) {
        const response = await this.http.post(this.loginEndpoint, {
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
    }
    ;
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
        }
        catch (error) {
            return error;
        }
    }
    ;
    isAuthenticated = () => {
        const token = localStorage.getItem(this.tokenKey);
        return !!token;
    };
    async getCurrentUser() {
        const token = localStorage.getItem(this.tokenKey);
        if (!token) {
            return null;
        }
        try {
            const response = await this.http.get(this.currentUserEndpoint);
            if (this.onUserChange) {
                this.onUserChange(response.data.data);
            }
            return response.data.data;
        }
        catch (error) {
            this.user = null;
            if (this.onUnauthorized) {
                this.onUnauthorized();
            }
            return null;
        }
    }
}
export const createAuth = (config) => new Auth(config);
