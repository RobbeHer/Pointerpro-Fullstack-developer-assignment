import axios from "axios"
import {useNotificationStore} from "@/stores/notification";

axios.defaults.withCredentials = true
axios.defaults.baseURL = "http://localhost:8000"

axios.interceptors.response.use(
    function (response) {
        console.log("axios intercept response:");
        console.log(response.data);
        return response.data;
    },
    function (error) {
        console.log("axios intercept error:");
        console.log(error.response.status);
        console.log(error.response.data);

        const notificationStore = useNotificationStore();
        notificationStore.addNotification(error.response.data.message);

        return Promise.reject(error.response.data);
    })