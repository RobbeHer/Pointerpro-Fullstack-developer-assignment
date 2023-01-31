<script setup>
import {useNotificationStore} from "@/stores/notification";

const notificationStore = useNotificationStore();

function removeNotification(notification) {
    notificationStore.removeNotification(notification);
}
</script>

<template>
    <div v-for="notification in notificationStore.getNotifications" class="notification" :class="[notification.type === 'success' ? 'success-notification' : 'error-notification']">
        {{ notification.message }}
        <button @click="removeNotification(notification)">X</button>
    </div>
</template>