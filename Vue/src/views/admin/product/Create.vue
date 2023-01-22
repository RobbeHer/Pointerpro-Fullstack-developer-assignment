<script setup>
import axios from "axios";
import {useProductStore} from "@/stores/product";
import {useRouter} from "vue-router";
import {computed, onUnmounted} from "vue";

const productStore = useProductStore();
const router = useRouter();

const form = computed(() => productStore.getProductResource);

async function onSave() {
    await axios.get("/sanctum/csrf-cookie");
    axios.post("/api/admin/products", form.value).then((response) => {
        console.log(response);

        router.push({ name: 'dashboard' });
    });
}

onUnmounted(() => productStore.resetProductResource());
</script>

<template>
    <h1>Product create</h1>

    <form v-if="form" @submit.prevent="onSave">
        <div>
            <label for="name">Name</label>
            <input id="name" v-model="form.name" type="text">
        </div>
        <div>
            <label for="description">Description</label>
            <textarea id="description" v-model="form.description"></textarea>
        </div>
        <div>
            <label for="price">Price</label>
            <input id="price" v-model="form.price" type="number" min="0">
        </div>
        <div>
            <label for="password">Stock</label>
            <input id="stock" v-model="form.stock" type="number" min="0">
        </div>
        <div>
            <button>Save</button>
        </div>
    </form>
</template>