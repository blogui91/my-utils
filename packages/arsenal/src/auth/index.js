import axios from 'axios';
class Auth {
    baseURL;
    loginURL = 'auth/login';
    logoutURL = 'auth/logout';
    registerURL = 'auth/register';
    tokenKey = 'token';
    // eslint-disable-next-line no-unused-vars
    onRegister;
    // eslint-disable-next-line no-unused-vars
    onLogin;
    // eslint-disable-next-line no-unused-vars
    onLogout;
    constructor(config) {
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
    register = async (formData) => {
        const response = await axios.post(this.registerURL, {
            ...formData,
        });
        if (this.onRegister) {
            this.onRegister(response);
        }
        return response.data;
    };
    async login({ email, password }) {
        const response = await axios.post(this.loginURL, {
            email,
            password,
        });
        localStorage.setItem(this.tokenKey, response.data.token);
        if (this.onLogin) {
            this.onLogin(response);
        }
        return response.data;
    }
    ;
    logout = async () => {
        try {
            const response = await axios.post(this.logoutURL);
            localStorage.removeItem(this.tokenKey);
            if (this.onLogout) {
                this.onLogout();
            }
            return response.data;
        }
        catch (error) {
            return error;
        }
    };
}
export const createAuth = (config) => new Auth(config);
