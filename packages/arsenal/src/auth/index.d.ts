import Http from '../http';
import { Config, CurrentUser, LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from './types';
export default class Auth extends Http {
    private loginEndpoint;
    private logoutEndpoint;
    private currentUserEndpoint;
    private registerEndpoint;
    onRegister?: (data: RegisterResponse) => void;
    onLogin?: (data: LoginResponse) => void;
    onLogout?: () => void;
    onUnauthorized?: () => void;
    onUserChange?: (user: CurrentUser | null) => void;
    user: CurrentUser | null;
    constructor(config: Config);
    getCurrentUser: () => Promise<CurrentUser | null>;
    setLoginEndpoint: (loginEndpoint: string) => this;
    setLogoutEndpoint: (logoutEndpoint: string) => this;
    setRegisterEndpoint: (registerEndpoint: string) => this;
    setCurrentUserEndpoint: (currentUserEndpoint: string) => this;
    register: (formData: RegisterFormData) => Promise<{
        [key: string]: string | object;
        token: string;
        data: CurrentUser;
    }>;
    login: ({ email, password }: LoginFormData) => Promise<{
        [key: string]: string | object;
        token: string;
        data: CurrentUser;
    }>;
    logout: () => Promise<unknown>;
}
export declare const createAuth: (config: Config) => Auth;
