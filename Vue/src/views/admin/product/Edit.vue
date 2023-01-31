<script setup>
import {computed, onUnmounted} from "vue";
import {useRoute, useRouter} from "vue-router";
import {useProductStore} from "@/stores/product";
import {useNotificationStore} from "@/stores/notification";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import Form from "@/components/admin/product/Form.vue";

const route = useRoute();
const router = useRouter();
const productStore = useProductStore();
const notificationStore = useNotificationStore();
const ProductRepository = RepositoryFactory.getAdmin('products');

const product = computed(() => productStore.getProductResource);
const formErrors = computed(() => productStore.getFormErrors);

async function getProduct() {
    const {data} = await ProductRepository.getById(route.params.id);
    productStore.setProductResource(data);
}
getProduct();

async function onSave() {
    const data = await ProductRepository.patch(product.value);
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
    <h1>Product edit</h1>

    <Form :product="product" :formErrors="formErrors" @onSave="onSave"/>
</template>