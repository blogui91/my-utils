import { Config, LoginFormData, LoginResponse, RegisterFormData, RegisterResponse } from './types';
declare class Auth {
    private baseURL;
    private loginURL;
    private logoutURL;
    private registerURL;
    private tokenKey;
    onRegister?: (data: RegisterResponse) => void;
    onLogin?: (data: LoginResponse) => void;
    onLogout?: () => void;
    constructor(config: Config);
    register: (formData: RegisterFormData) => Promise<{
        [key: string]: string | object;
        token: string;
        user: {
            [key: string]: string;
            name: string;
            email: string;
        };
    }>;
    login({ email, password }: LoginFormData): Promise<{
        [key: string]: string | object;
        token: string;
        user: {
            [key: string]: string;
            name: string;
            email: string;
        };
    }>;
    logout: () => Promise<any>;
}
export declare const createAuth: (config: Config) => Auth;
export {};
