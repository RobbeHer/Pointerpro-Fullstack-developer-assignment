import axios from "axios";

const resource = '/api/admin/purchase';

export default {
    get(url) {
        return axios.get(`${url ? url : resource}`);
    },
    getById(id) {
        return axios.get(`${resource}/${id}`);
    },
}