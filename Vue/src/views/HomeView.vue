<script setup>
import {ref} from "vue";
import axios from "axios";

const form = ref({
    email: null,
    password: null
});

const user = ref();

async function onLogin() {
    console.log('cookie');
    await axios.get("/sanctum/csrf-cookie");

    console.log('post form');
    await axios.post("/login", {
        email: form.value.email,
        password: form.value.password
    });

    console.log('get user');
    let {data} = await axios.get("/api/user");
    user.value = data;
}
</script>

<template>
    {{ user }}

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
