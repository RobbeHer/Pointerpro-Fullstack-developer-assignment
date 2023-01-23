<script setup>
import {useProductStore} from "@/stores/product";
import RepositoryFactory from "@/repositories/RepositoryFactory";

const productStore = useProductStore();
const ProductRepository = RepositoryFactory.getAdmin('products');

async function getProducts(url = null) {
    const {data} = await ProductRepository.get(url);
    console.log(data);
    productStore.setProductCollection(data);
}
getProducts();

async function onDeleteProduct(id) {
    const {data} = await ProductRepository.delete(id);
    console.log(data);
}
</script>

<template>
    <h1>Dashboard</h1>

    <RouterLink :to="{ name: 'dashboard_products_create' }">Create</RouterLink>

    <div v-for="product in productStore.getProductCollection?.data">
        {{ product.name }}
        <RouterLink :to="{ name: 'dashboard_products_edit', params: { id: product.id } }">Edit</RouterLink>
        <button @click="onDeleteProduct(product.id)">Delete</button>
    </div>

    <button
        v-for="link in productStore.getProductCollection?.meta.links"
        @click="getProducts(link.url)"
    >
        {{ link.label }}
    </button>
</template>