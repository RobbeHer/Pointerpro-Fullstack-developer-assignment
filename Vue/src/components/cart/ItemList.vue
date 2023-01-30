<script setup>
import {useCartStore} from "@/stores/cart";
import {usePurchaseStore} from "@/stores/purchase";

const cartStore = useCartStore();
const purchaseStore = usePurchaseStore();

function removeProductFromCart(product) {
    cartStore.removeItem(product);
}

function addProductToCart(product) {
    cartStore.addItem(product);
}
</script>

<template>
    <div v-if="cartStore.getItems.length">
        <table>
            <tr>
                <th>Product name</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
            </tr>
            <tr v-for="item in cartStore.getItems">
                <td>
                    <template v-if="purchaseStore.formErrors.notFound[item.product.id]">
                        NOT FOUND - {{ item.product.name }}
                    </template>
                    <template v-else>
                        <RouterLink :to="{ name: 'product_details', params: { id: item.product.id } }">
                            {{ item.product.name }}
                        </RouterLink>
                    </template>
                </td>
                <td>€{{ item.product.price }}</td>
                <td>{{ item.quantity }}</td>
                <td>
                    <button @click="addProductToCart(product)">
                        Add to cart
                    </button>
                    <button @click="removeProductFromCart(item.product)">Remove from cart</button>
                </td>
            </tr>
        </table>

        <div>Total: €{{ cartStore.getTotalPrice }}</div>
    </div>
    <div v-else>
        Cart is empty
    </div>
</template>