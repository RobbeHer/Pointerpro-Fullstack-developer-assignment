<script setup>
import {useErrorStore} from "@/stores/error";

const errorStore = useErrorStore();

function removeError(error) {
    errorStore.removeError(error);
}
</script>

<template>
    <div v-for="error in errorStore.getErrors">
        !!! {{ error.data.message }}
        <button @click="removeError(error)">X</button>
    </div>
</template>