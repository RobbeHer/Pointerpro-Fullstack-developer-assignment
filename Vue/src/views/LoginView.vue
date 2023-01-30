<script setup>
import {ref} from "vue";
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user";
import RepositoryFactory from "@/repositories/RepositoryFactory";

const router = useRouter();
const userStore = useUserStore();
const UserRepository = RepositoryFactory.get('user');

const form = ref({
    email: null,
    password: null
});

async function onLogin() {
    await UserRepository.login(form.value);
    const data = await UserRepository.get();
    userStore.setUser(data);

    await router.push({name: 'dashboard'});
}
</script>

<template>
    <h1>Login</h1>

    <form @submit.prevent="onLogin">
        <div>
            <div><label for="email">Email</label></div>
            <input v-model="form.email" type="email">
        </div>
        <div>
            <div><label for="password">Password</label></div>
            <input v-model="form.password" type="password">
        </div>
        <div>
            <button>Login</button>
        </div>
    </form>
</template>
