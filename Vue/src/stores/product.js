import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', {
    state: () => ({
        productCollection: null
    }),
    getters: {
        getProductCollection: (state) => state.productCollection,
    },
    actions: {
        setProductCollection(productCollection) {
            this.productCollection = productCollection
        }
    }
})
