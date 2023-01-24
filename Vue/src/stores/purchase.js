import { defineStore } from 'pinia'

const defaultPurchaseResource = {
    id: null,
    username: null,
    products: [],
    createdAt: null,
}

export const usePurchaseStore = defineStore('purchase', {
    state: () => ({
        purchaseCollection: null,
        purchaseResource: defaultPurchaseResource,
    }),
    getters: {
        getPurchaseCollection: (state) => state.purchaseCollection,
        getPurchaseResource: (state) => state.purchaseResource,
    },
    actions: {
        setPurchaseCollection(purchaseCollection) {
            this.purchaseCollection = purchaseCollection
        },
        setPurchaseResource(purchaseResource) {
            this.purchaseResource = purchaseResource
        },
        resetPurchaseResource() {
            this.purchaseResource = defaultPurchaseResource
        },
    }
})
