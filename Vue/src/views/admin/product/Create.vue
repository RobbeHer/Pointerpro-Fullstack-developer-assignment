<script setup>
import {useRouter} from "vue-router";
import {computed, onUnmounted} from "vue";
import {useProductStore} from "@/stores/product";
import {useNotificationStore} from "@/stores/notification";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import Form from "@/components/admin/product/Form.vue";

const router = useRouter();
const productStore = useProductStore();
const notificationStore = useNotificationStore();
const ProductRepository = RepositoryFactory.getAdmin('products');

const product = computed(() => productStore.getProductResource);
const formErrors = computed(() => productStore.getFormErrors);

async function onSave() {
    const data = await ProductRepository.post(product.value);
    if (data.errors) productStore.setFormErrors(data.errors);
    else {
        await notificationStore.addNotification(data.message, 'success');
        await router.push({name: 'dashboard'});
    }
}

onUnmounted(() => {
    productStore.resetProductResource();
    productStore.resetFormErrors();
});
</script>

<template>
    <h1>Product create</h1>

    <Form :product="product" :formErrors="formErrors" @onSave="onSave"/>
</template>