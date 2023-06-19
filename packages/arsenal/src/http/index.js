import { AxiosExtended } from './axiosExtended';
class Http extends AxiosExtended {
    tokenKey = 'auth::token';
    constructor(config) {
        super(config);
        this.getUri = this.getUri.bind(this);
        this.request = this.request.bind(this);
        this.get = this.get.bind(this);
        this.options = this.options.bind(this);
        this.delete = this.delete.bind(this);
        this.head = this.head.bind(this);
        this.post = this.post.bind(this);
        this.put = this.put.bind(this);
        this.patch = this.patch.bind(this);
        this.interceptors.request.use((config) => {
            const token = this.getToken();
            if (token) {
                config.headers.Authorization = token;
            }
            return config;
        }, (error) => {
            // handling error
        });
    }
    getUri(config) {
        return this.getUri(config);
    }
    request(config) {
        return this.request(config);
    }
    get(url, config) {
        return this.get(url, config);
    }
    options(url, config) {
        return this.options(url, config);
    }
    delete(url, config) {
        return this.delete(url, config);
    }
    head(url, config) {
        return this.head(url, config);
    }
    post(url, data, config) {
        return this.post(url, data, config);
    }
    put(url, data, config) {
        return this.put(url, data, config);
    }
    patch(url, data, config) {
        return this.patch(url, data, config);
    }
    success(response) {
        return response.data;
    }
    error(error) {
        throw error;
    }
    /**
     * Gets Token.
     *
     * @returns {string} token.
     * @memberof Api
     */
    getToken = () => {
        const token = localStorage.getItem(this.tokenKey);
        return `Bearer ${token}`;
    };
    /**
     * Sets Token.
     *
     * @param {string} token - token.
     * @memberof Api
     */
    setToken = (token) => {
        localStorage.setItem(this.tokenKey, token);
    };
    clearToken = () => {
        localStorage.removeItem(this.tokenKey);
    };
    isAuthenticated = () => {
        const token = localStorage.getItem(this.tokenKey);
        return !!token;
    };
}
export default Http;
export const createHttp = (config) => new Http(config);
