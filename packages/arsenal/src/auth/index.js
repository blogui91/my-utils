import Http from '../http';
export default class Auth extends Http {
    loginEndpoint = 'auth/login';
    logoutEndpoint = 'auth/logout';
    currentUserEndpoint = 'auth/me';
    registerEndpoint = 'auth/register';
    onRegister;
    onLogin;
    onLogout;
    onUnauthorized;
    onUserChange;
    user = null;
    constructor(config) {
        const options = {
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
            const response = await this.get(this.currentUserEndpoint);
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
        const response = await this.post(this.registerEndpoint, {
            ...formData,
        });
        if (this.onRegister) {
            this.onRegister(response);
        }
        return response.data;
    };
    login = async ({ email, password }) => {
        const response = await this.post(this.loginEndpoint, {
            email,
            password,
        });
        this.setToken(response.data.token);
        this.user = response.data.data;
        if (this.onLogin) {
            this.onLogin(response);
        }
        if (this.onUserChange) {
            this.onUserChange(response.data.data);
        }
        return response.data;
    };
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
        }
        catch (error) {
            return error;
        }
    };
}
export const createAuth = (config) => new Auth(config);
