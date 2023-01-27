<script setup>
    defineProps({
        purchaseDetails: Object,
        formErrors: Object,
    })
</script>

<template>
    <form>
        <div>
            <label for="name">Name</label>
            <div v-if="formErrors.name">{{ formErrors.name.toString() }}</div>
            <input id="name" v-model="purchaseDetails.name" type="text">
        </div>
        <div>
            <label for="email">Email</label>
            <div v-if="formErrors.email">{{ formErrors.email.toString() }}</div>
            <input id="email" v-model="purchaseDetails.email" type="text">
        </div>
        <div>
            <label for="address">Address</label>
            <div v-if="formErrors.address">{{ formErrors.address.toString() }}</div>
            <input id="address" v-model="purchaseDetails.address" type="text">
        </div>
    </form>
</template>