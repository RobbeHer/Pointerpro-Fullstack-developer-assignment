import axios from "axios";

const resource = '/api/purchase';

export default {
    post(purchase) {
        return axios.post(`${resource}`, purchase).catch(error => error);
    },
}