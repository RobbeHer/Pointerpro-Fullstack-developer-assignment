<script setup>
    defineProps({
        purchaseDetails: Object,
        formErrors: Object,
    })
</script>

<template>
    <form>
        <div>
            <div><label for="name">Name</label></div>
            <div v-if="formErrors.errors.name">{{ formErrors.errors.name.toString() }}</div>
            <input id="name" v-model="purchaseDetails.name" type="text">
        </div>
        <div>
            <div><label for="email">Email</label></div>
            <div v-if="formErrors.errors.email">{{ formErrors.errors.email.toString() }}</div>
            <input id="email" v-model="purchaseDetails.email" type="text">
        </div>
        <div>
            <div><label for="address">Address</label></div>
            <div v-if="formErrors.errors.address">{{ formErrors.errors.address.toString() }}</div>
            <input id="address" v-model="purchaseDetails.address" type="text">
        </div>
    </form>
</template>