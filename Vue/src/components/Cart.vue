<script setup>
import {useCartStore} from "@/stores/cart";
import {usePurchaseStore} from "@/stores/purchase";

const cartStore = useCartStore();
const purchaseStore = usePurchaseStore();
function removeProductFromCart(product) {
    cartStore.removeItem(product);
}
</script>

<template>
    <template v-if="cartStore.getItems.length">
        <div v-for="item in cartStore.getItems">
            {{ item.quantity }} - {{ item.product.name }} - €{{ item.product.price }} p.st.
            -
            <template v-if="purchaseStore.formErrors.notFound[item.product.id]">
                Not found
            </template>
            <template v-else>
                <RouterLink :to="{ name: 'product_details', params: { id: item.product.id } }">Details</RouterLink>
            </template>
            <button @click="removeProductFromCart(item.product)">Remove from cart</button>
        </div>

        <div>Total: €{{ cartStore.getTotalPrice }}</div>
    </template>
    <template v-else>
        Cart is empty
    </template>
</template>