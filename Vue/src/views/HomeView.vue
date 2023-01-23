<script setup>
import {useCartStore} from "@/stores/cart";
import {useProductStore} from "@/stores/product";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import Cart from "@/components/Cart.vue";

const cartStore = useCartStore();
const productStore = useProductStore();
const ProductRepository = RepositoryFactory.get('products');

async function getProducts(url = null) {
    const {data} = await ProductRepository.get(url);
    console.log(data);
    productStore.setProductCollection(data);
}
getProducts();

function addProductToCart(product) {
    cartStore.addItem(product);
}
</script>

<template>
    <h1>Homepage</h1>

    <div v-for="product in productStore.getProductCollection?.data">
        {{ product.name }} - €{{ product.price }}
        -
        <RouterLink :to="{ name: 'product_details', params: { id: product.id } }">Details</RouterLink>
        <button @click="addProductToCart(product)">
            Add to cart
        </button>
    </div>

    <button
        v-for="link in productStore.getProductCollection?.meta.links"
        @click="getProducts(link.url)"
    >
        {{ link.label }}
    </button>

    <Cart/>
</template>