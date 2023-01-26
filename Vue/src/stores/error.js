import { defineStore } from 'pinia'

export const useErrorStore = defineStore('error', {
    state: () => ({
        errors: [],
    }),
    getters: {
        getErrors: (state) => state.errors,
    },
    actions: {
        addError(error) {
            this.errors.push(error)
        },
        removeError(error) {
            const index = this.errors.findIndex(e => e.id === error.id);
            if (index !== -1) {
                this.errors.splice(index, 1);
            }
        },
    }
})
