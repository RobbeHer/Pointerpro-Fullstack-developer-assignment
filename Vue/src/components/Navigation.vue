<script setup>
import {RouterLink} from 'vue-router'
import {useUserStore} from "@/stores/user";
import axios from "axios";
import router from "@/router";

const userStore = useUserStore();

async function onLogout() {
    await axios.get("/sanctum/csrf-cookie");
    await axios.post("/logout");

    userStore.$reset();
    router.go();
}
</script>

<template>
    <nav>
        <RouterLink to="/">Home</RouterLink>

        <span v-if="userStore.getUser">
            <RouterLink to="/dashboard">Dashboard</RouterLink>
            {{ userStore.getUser.name }}
            <button @click="onLogout">Logout</button>
        </span>
        <RouterLink v-else to="/login">Login</RouterLink>
    </nav>
</template>