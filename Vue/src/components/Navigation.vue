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
        <span class="nav-group">
            <RouterLink :to="{ name: 'home' }">Home</RouterLink>
            <RouterLink :to="{ name: 'cart' }">Cart</RouterLink>
        </span>


        <span v-if="userStore.getUser" class="nav-group">
            <RouterLink :to="{ name: 'dashboard' }">Dashboard</RouterLink>
            {{ userStore.getUser.name }}
            <button @click="onLogout">Logout</button>
        </span>
        <RouterLink v-else :to="{ name: 'login' }">Login</RouterLink>
    </nav>
</template>

<style>
nav{
    display: flex;
    justify-content: space-between;
    padding: 1rem 0;
}
.nav-group {
    display: flex;
    gap: 1rem;
}
</style>