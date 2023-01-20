<script setup>
import axios from "axios";
import {useProductStore} from "@/stores/product";

const productStore = useProductStore();

async function getProducts(url) {
    if (!url) return;

    let {data} = await axios.get(url);
    console.log(data)
    productStore.setProductCollection(data);
}

getProducts("/api/admin/products");
</script>

<template>
    <h1>Dashboard</h1>

    <div v-for="product in productStore.getProductCollection?.data">
        {{ product.name }}
    </div>

    <button
        v-for="link in productStore.getProductCollection?.meta.links"
        @click="getProducts(link.url)"
    >
        {{ link.label }}
    </button>
</template>