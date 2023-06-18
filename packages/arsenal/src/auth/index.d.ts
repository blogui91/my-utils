import { Config, CurrentUser, LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from './types';
declare class Auth {
    private baseURL;
    private loginEndpoint;
    private logoutEndpoint;
    private currentUserEndpoint;
    private registerEndpoint;
    private tokenKey;
    private http;
    onRegister?: (data: RegisterResponse) => void;
    onLogin?: (data: LoginResponse) => void;
    onLogout?: () => void;
    onUnauthorized?: () => void;
    onUserChange?: (user: CurrentUser | null) => void;
    user: CurrentUser | null;
    constructor(config?: Config);
    setBaseURL: (baseURL: string) => this;
    setLoginEndpoint: (loginEndpoint: string) => this;
    setLogoutEndpoint: (logoutEndpoint: string) => this;
    setRegisterEndpoint: (registerEndpoint: string) => this;
    setCurrentUserEndpoint: (currentUserEndpoint: string) => this;
    register: (formData: RegisterFormData) => Promise<{
        [key: string]: string | object;
        token: string;
        data: CurrentUser;
    }>;
    login({ email, password }: LoginFormData): Promise<{
        [key: string]: string | object;
        token: string;
        data: CurrentUser;
    }>;
    logout(): Promise<any>;
    isAuthenticated: () => boolean;
    getCurrentUser(): Promise<CurrentUser | null>;
}
export declare const createAuth: (config?: Config) => Auth;
export {};
