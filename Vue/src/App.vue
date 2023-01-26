<script setup>
import {RouterView} from 'vue-router'
import Navigation from "@/components/Navigation.vue";
import Error from "@/components/Error.vue";
</script>

<template>
    <Navigation/>
    <Error/>

    <RouterView/>
</template>
