import axios from "axios";

export default {
    get() {
        return axios.get("/api/user");
    },
    async login(credentials) {
        await axios.get("/sanctum/csrf-cookie");
        await axios.post("/login", credentials);
    },
    logout() {
        return axios.post("/logout");
    },
}