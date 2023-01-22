<script setup>
import {ref} from "vue";
import axios from "axios";
import {useUserStore} from "@/stores/user";
import {useRouter} from "vue-router";

const userStore = useUserStore();
const router = useRouter();

const form = ref({
    email: null,
    password: null
});

async function onLogin() {
    await axios.get("/sanctum/csrf-cookie");
    await axios.post("/login", {
        email: form.value.email,
        password: form.value.password
    });

    axios.get("/api/user").then((response) => {
        userStore.setUser(response.data);

        router.push({ name: 'dashboard' });
    });
}
</script>

<template>
    <form @submit.prevent="onLogin">
        <div>
            <label for="email">Email</label>
            <input v-model="form.email" type="email">
        </div>
        <div>
            <label for="password">Password</label>
            <input v-model="form.password" type="password">
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
</template>
