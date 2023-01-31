import { defineStore } from 'pinia'

export const useNotificationStore = defineStore('notification', {
    state: () => ({
        notifications: [],
    }),
    getters: {
        getNotifications: (state) => state.notifications,
    },
    actions: {
        addNotification(message, type) {
            this.notifications.push({message, type})
        },
        removeNotification(notification) {
            const index = this.notifications.findIndex(n => n === notification);
            if (index !== -1) {
                this.notifications.splice(index, 1);
            }
        },
    }
})
