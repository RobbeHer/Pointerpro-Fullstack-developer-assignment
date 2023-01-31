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
                <th>Quantity</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            <tbody>
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
                    <td>{{ item.quantity }}</td>
                    <td class="alnright">€{{ item.product.price }}</td>
                    <td>
                        <button @click="addProductToCart(item.product)">
                            Add to cart
                        </button>
                        <button @click="removeProductFromCart(item.product)">Remove from cart</button>
                    </td>
                </tr>
            </tbody>
        </table>
        <div class="mt-4">Total: <span class="bold">€{{ cartStore.getTotalPrice }}</span></div>
    </div>
    <div v-else>
        Cart is empty
    </div>
</template>