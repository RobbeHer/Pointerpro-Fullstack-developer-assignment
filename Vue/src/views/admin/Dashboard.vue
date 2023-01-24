<script setup>
import {useProductStore} from "@/stores/product";
import {usePurchaseStore} from "@/stores/purchase";
import RepositoryFactory from "@/repositories/RepositoryFactory";

const productStore = useProductStore();
const purchaseStore = usePurchaseStore();
const ProductRepository = RepositoryFactory.getAdmin('products');
const PurchaseRepository = RepositoryFactory.getAdmin('purchase');

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

async function getPurchases(url = null) {
    const {data} = await PurchaseRepository.get(url);
    console.log(data);
    purchaseStore.setPurchaseCollection(data);
}
getPurchases();
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

    <h1>Purchases</h1>

    <div v-for="purchase in purchaseStore.getPurchaseCollection?.data">
        {{ purchase.username }}
        <div v-for="product in purchase.products">
            {{ product.pivot.quantity }} x {{ product.name }}
        </div>
    </div>

    <button
        v-for="link in purchaseStore.getPurchaseCollection?.meta.links"
        @click="getPurchases(link.url)"
    >
        {{ link.label }}
    </button>
</template>