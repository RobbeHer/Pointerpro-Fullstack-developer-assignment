<script setup>
import axios from "axios";
import {useProductStore} from "@/stores/product";
import {useRouter} from "vue-router";

const productStore = useProductStore();
const router = useRouter();

function getProducts(url) {
    if (!url) return;

    axios.get(url).then((response) => {
        console.log(response.data);
        productStore.setProductCollection(response.data);
    });
}
getProducts("/api/admin/products");

function onEditProduct(id) {
    router.push({ name: 'dashboard_products_edit', params: { id } });
}

async function onDeleteProduct(id) {
    await axios.get("/sanctum/csrf-cookie");
    axios.delete("/api/admin/products/" + id).then((response) => {
        console.log(response);
    });
}
</script>

<template>
    <h1>Dashboard</h1>

    <RouterLink :to="{ name: 'dashboard_products_create' }">Create</RouterLink>

    <div v-for="product in productStore.getProductCollection?.data">
        {{ product.name }}
        <button @click="onEditProduct(product.id)">Edit</button>
        <button @click="onDeleteProduct(product.id)">Delete</button>
    </div>

    <button
        v-for="link in productStore.getProductCollection?.meta.links"
        @click="getProducts(link.url)"
    >
        {{ link.label }}
    </button>
</template>