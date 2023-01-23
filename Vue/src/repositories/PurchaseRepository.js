import axios from "axios";

const resource = '/api/purchase';

export default {
    post(cartItemIdsAndQuantities) {
        return axios.post(`${resource}`, {username: 'robbe', items:cartItemIdsAndQuantities});
    },
}