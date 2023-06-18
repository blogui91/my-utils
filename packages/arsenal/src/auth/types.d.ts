export interface Config {
    baseURL: string;
    loginURL: string;
    tokenName?: string;
    logoutURL: string;
    registerURL?: string;
}
export interface RegisterFormData {
    email: string;
    password: string;
    [key: string]: string;
}
export interface RegisterResponse extends LoginResponse {
}
export interface LoginFormData {
    email: string;
    password: string;
}
export interface LoginResponse {
    data: {
        token: string;
        user: {
            name: string;
            email: string;
            [key: string]: string;
        };
        [key: string]: string | object;
    };
}
