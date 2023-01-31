<script setup>
    defineProps({
        product: Object,
        formErrors: Object,
    })
</script>

<template>
    <form v-if="product" @submit.prevent="$emit('onSave')">
        <div>
            <div><label for="name">Name</label></div>
            <div v-if="formErrors.name" class="form-error">{{ formErrors.name.toString() }}</div>
            <input id="name" v-model="product.name" type="text">
        </div>
        <div class="mt-4">
            <div><label for="description">Description</label></div>
            <div v-if="formErrors.description" class="form-error">{{ formErrors.description.toString() }}</div>
            <textarea id="description" v-model="product.description"></textarea>
        </div>
        <div class="mt-4">
            <div><label for="price">Price</label></div>
            <div v-if="formErrors.price" class="form-error">{{ formErrors.price.toString() }}</div>
            <input id="price" v-model="product.price" type="number" min="0" step=".01">
        </div>
        <div class="mt-4">
            <div><label for="stock">Stock</label></div>
            <div v-if="formErrors.stock" class="form-error">{{ formErrors.stock.toString() }}</div>
            <input id="stock" v-model="product.stock" type="number" min="0">
        </div>
        <div class="mt-4">
            <button>Save</button>
        </div>
    </form>
</template>