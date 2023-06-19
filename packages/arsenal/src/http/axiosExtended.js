import axios from 'axios';
export class AxiosExtended {
    interceptors;
    constructor(config) {
        return axios.create(config);
    }
}
