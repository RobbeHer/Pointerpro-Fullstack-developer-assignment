import axios from "axios";

const resource = '/api/cart';

export default {
    get(itemIdsAndQuantities) {
        return axios.get(`${resource}`, {
            params: {
                items: itemIdsAndQuantities
            }
        }).catch(error => error);
    }
}