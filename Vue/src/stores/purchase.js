import { defineStore } from 'pinia'

const defaultPurchaseResource = {
    id: null,
    name: null,
    email: null,
    address: null,
    items: [],
    createdAt: null,
}
const defaultFormErrors = {
    errors: [],
    warnings: [],
    notFound: [],
}

export const usePurchaseStore = defineStore('purchase', {
    state: () => ({
        purchaseCollection: null,
        purchaseResource: defaultPurchaseResource,
        formErrors: defaultFormErrors,
    }),
    getters: {
        getPurchaseCollection: (state) => state.purchaseCollection,
        getPurchaseResource: (state) => state.purchaseResource,
        getFormErrors: (state) => state.formErrors,
    },
    actions: {
        setPurchaseCollection(purchaseCollection) {
            this.purchaseCollection = purchaseCollection
        },
        setPurchaseResource(purchaseResource) {
            this.purchaseResource = purchaseResource
        },
        setFormErrors(errors) {
            this.formErrors = {...defaultFormErrors, ...errors}
        },
        resetPurchaseResource() {
            this.purchaseResource = defaultPurchaseResource
        },
        resetFormErrors() {
            this.formErrors = defaultFormErrors
        }
    }
})
