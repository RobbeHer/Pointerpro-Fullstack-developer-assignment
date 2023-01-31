<script setup>
import {RouterView} from 'vue-router'
import Navigation from "@/components/Navigation.vue";
import Notification from "@/components/Notification.vue";
</script>

<template>
    <Navigation/>
    <Notification/>

    <RouterView/>
</template>
