/* eslint-disable no-unused-vars */

export interface Config {
    baseURL?: string;
    loginEndpoint?: string;
    tokenNEndpoint?: string
    logoutEndpoint?: string;
    registerEndpoint?: string;
    currentUserEndpoint?: string;
}

export interface RegisterFormData {
    email: string;
    password: string;
    [key: string]: string;
}

export interface RegisterResponse extends LoginResponse {}

export interface LoginFormData {
    email: string;
    password: string;
}

export interface CurrentUser {
    name: string;
    email: string;
    [key: string]: string;
}

export interface LoginResponse {
    data: {
        token: string;
        data: CurrentUser;
        [key: string]: string | object;
    }
}
