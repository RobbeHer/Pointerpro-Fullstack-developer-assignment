<script setup>
    defineProps({
        product: Object,
        formErrors: Object,
    })
</script>

<template>
    <form v-if="product" @submit.prevent="$emit('onSave')">
        <div>
            <label for="name">Name</label>
            <div v-if="formErrors.name">{{ formErrors.name.toString() }}</div>
            <input id="name" v-model="product.name" type="text">
        </div>
        <div>
            <label for="description">Description</label>
            <div v-if="formErrors.description">{{ formErrors.description.toString() }}</div>
            <textarea id="description" v-model="product.description"></textarea>
        </div>
        <div>
            <label for="price">Price</label>
            <div v-if="formErrors.price">{{ formErrors.price.toString() }}</div>
            <input id="price" v-model="product.price" type="number" min="0" step=".01">
        </div>
        <div>
            <label for="stock">Stock</label>
            <div v-if="formErrors.stock">{{ formErrors.stock.toString() }}</div>
            <input id="stock" v-model="product.stock" type="number" min="0">
        </div>
        <div>
            <button>Save</button>
        </div>
    </form>
</template>