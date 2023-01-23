import axios from "axios";

const resource = '/api/admin/products';

export default {
    get(url) {
        return axios.get(`${url ? url : resource}`);
    },
    getById(id) {
        return axios.get(`${resource}/${id}`);
    },
    post(product) {
        return axios.post(`${resource}`, product);
    },
    patch(product) {
        return axios.patch(`${resource}/${product.id}`, product);
    },
    delete(id) {
        return axios.delete(`${resource}/${id}`);
    }
}