<script setup>
import {useRouter} from 'vue-router';
import {useUserStore} from "@/stores/user";
import RepositoryFactory from "@/repositories/RepositoryFactory";

const router = useRouter();
const userStore = useUserStore();
const UserRepository = RepositoryFactory.get('user');

async function onLogout() {
    await UserRepository.logout();
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