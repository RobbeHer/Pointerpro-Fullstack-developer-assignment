<script setup>
import {useCartStore} from "@/stores/cart";
import RepositoryFactory from "@/repositories/RepositoryFactory";

const cartStore = useCartStore();
const PurchaseRepository = RepositoryFactory.get('purchase');

function removeProductFromCart(product) {
    cartStore.removeItem(product);
}

async function makePurchase() {
    const cartItemIdsAndQuantities = cartStore.getItemIdsAndQuantities;
    let {data} = await PurchaseRepository.post(cartItemIdsAndQuantities);
    console.log(data);
}
</script>

<template>
    <h1>Cart</h1>

    <div v-for="item in cartStore.getItems">
        {{ item.quantity }} - {{ item.product.name }} - €{{ item.product.price }} p.st.
        -
        <RouterLink :to="{ name: 'product_details', params: { id: item.product.id } }">Details</RouterLink>
        <button @click="removeProductFromCart(item.product)">Remove from cart</button>
    </div>

    <div>Total: €{{ cartStore.getTotalPrice }}</div>

    <button @click="makePurchase()">Make purchase</button>
</template>