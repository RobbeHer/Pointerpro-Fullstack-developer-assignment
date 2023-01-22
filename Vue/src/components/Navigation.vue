<script setup>
import {RouterLink, useRouter} from 'vue-router'
import {useUserStore} from "@/stores/user";
import axios from "axios";

const userStore = useUserStore();
const router = useRouter();

async function onLogout() {
    await axios.get("/sanctum/csrf-cookie");
    await axios.post("/logout");

    userStore.$reset();
    router.go();
}
</script>

<template>
    <nav>
        <RouterLink :to="{ name: 'home' }">Home</RouterLink>


        <span v-if="userStore.getUser">
            <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
            {{ userStore.getUser.name }}
            <button @click="onLogout">Logout</button>
        </span>
        <RouterLink v-else :to="{ name: 'login' }">Login</RouterLink>
    </nav>
</template>