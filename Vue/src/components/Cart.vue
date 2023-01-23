<script setup>
import {useCartStore} from "@/stores/cart";

const cartStore = useCartStore();

function removeProductFromCart(product) {
    cartStore.removeItem(product);
}
</script>

<template>
    <h1>Cart</h1>

    <!-- POGING 2 -->
    <div v-for="item in cartStore.getItems">
        {{ item.quantity }} - {{ item.product.name }} - €{{ item.product.price }} p.st.
        -
        <RouterLink :to="{ name: 'product_details', params: { id: item.product.id } }">Details</RouterLink>
        <button @click="removeProductFromCart(item.product)">Remove from cart</button>
    </div>

    <!-- POGING 1
    <div v-for="item in cartStore.getItems">
        {{ item.quantity }} - {{ item.product.name }} - €{{ item.product.price }}
        -
        <RouterLink :to="{ name: 'product_details', params: { id: item.product.id } }">Details</RouterLink>
    </div>-->

    Total: €{{ cartStore.getTotalPrice }}
</template>