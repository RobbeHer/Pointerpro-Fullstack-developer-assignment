<script setup>
import {useRouter} from "vue-router";
import {computed, onUnmounted} from "vue";
import {useCartStore} from "@/stores/cart";
import {usePurchaseStore} from "@/stores/purchase";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import ItemList from "@/components/cart/ItemList.vue";
import PurchaseForm from '@/components/cart/purchase/Form.vue';

const router = useRouter();
const cartStore = useCartStore();
const purchaseStore = usePurchaseStore();
const cartRepository = RepositoryFactory.get('cart');
const PurchaseRepository = RepositoryFactory.get('purchase');

const purchaseDetails = computed(() => purchaseStore.getPurchaseResource);
purchaseDetails.value.items = computed(() => cartStore.getItemIdsAndQuantities);
const formErrors = computed(() => purchaseStore.getFormErrors);

async function getProducts() {
    if (!cartStore.getItems.length) return;
    const data = await cartRepository.get(cartStore.getItemIdsAndQuantities);
    if (data.warnings || data.notFound) purchaseStore.setFormErrors(data);
}
getProducts();

async function makePurchase() {
    let data = await PurchaseRepository.post(purchaseDetails.value);
    if (data.errors || data.warnings || data.notFound) {
        purchaseStore.setFormErrors(data);
    } else {
        await purchaseStore.resetPurchaseResource();
        await purchaseStore.resetFormErrors();
        await cartStore.resetItems();
        await router.push({name: 'home'});
    }
}

onUnmounted(() => {
    purchaseStore.resetFormErrors();
});
</script>

<template>
    <h1>Cart</h1>

    <div v-for="productError in formErrors.notFound">
        {{ productError }}
    </div>
    <div v-for="productError in formErrors.warnings">
        {{ productError }}
    </div>

    <ItemList/>

    <template v-if="cartStore.getItems.length">
        <PurchaseForm :purchaseDetails="purchaseDetails" :formErrors="formErrors"/>

        <button @click="makePurchase()">Make purchase</button>
    </template>
</template>