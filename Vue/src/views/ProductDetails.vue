<script setup>
import {useRoute} from "vue-router";
import {computed, onUnmounted} from "vue";
import {useProductStore} from "@/stores/product";
import RepositoryFactory from "@/repositories/RepositoryFactory";

const route = useRoute();
const productStore = useProductStore();
const ProductRepository = RepositoryFactory.get('products');

const product = computed(() => productStore.getProductResource?.data);

async function getProduct() {
    const {data} = await ProductRepository.getById(route.params.id);
    productStore.setProductResource(data);
}
getProduct();

onUnmounted(() => productStore.resetProductResource());
</script>

<template>
    <h1>Product</h1>

    <div v-if="product">
        <h2>{{ product.name }}</h2>
        <div>€{{ product.price }} - {{ product.stock }} in stock</div>
        <p>{{ product.description }}</p>
    </div>
</template>