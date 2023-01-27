<script setup>
import {useCartStore} from "@/stores/cart";
import {usePurchaseStore} from "@/stores/purchase";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import PurchaseForm from '@/components/purchase/Form.vue';
import {computed} from "vue";

const cartStore = useCartStore();
const purchaseStore = usePurchaseStore();
const PurchaseRepository = RepositoryFactory.get('purchase');

const purchaseDetails = computed(() => purchaseStore.getPurchaseResource);
purchaseDetails.value.items = computed(() => cartStore.getItemIdsAndQuantities);
const formErrors = computed(() => purchaseStore.getFormErrors);

function removeProductFromCart(product) {
    cartStore.removeItem(product);
}

async function makePurchase() {
    let data = await PurchaseRepository.post(purchaseDetails.value);
    if (data.errors) purchaseStore.setFormErrors(data.errors);
}
</script>

<template>
    <h1>Cart</h1>

    <div v-for="productError in formErrors.products">
        {{ productError }}
    </div>

    <template v-if="cartStore.getItems.length">
        <div v-for="item in cartStore.getItems">
            {{ item.quantity }} - {{ item.product.name }} - €{{ item.product.price }} p.st.
            -
            <RouterLink :to="{ name: 'product_details', params: { id: item.product.id } }">Details</RouterLink>
            <button @click="removeProductFromCart(item.product)">Remove from cart</button>
        </div>

        <div>Total: €{{ cartStore.getTotalPrice }}</div>

        <PurchaseForm :purchaseDetails="purchaseDetails" :formErrors="formErrors"/>

        <button @click="makePurchase()">Make purchase</button>
    </template>
    <template v-else>
        Cart is empty
    </template>
</template>