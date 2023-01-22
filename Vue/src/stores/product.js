import { defineStore } from 'pinia'

const defaultProductResource = {
    id: null,
    name: null,
    description: null,
    price: 0,
    stock: 0,
}

export const useProductStore = defineStore('product', {
    state: () => ({
        productCollection: null,
        productResource: defaultProductResource,
    }),
    getters: {
        getProductCollection: (state) => state.productCollection,
        getProductResource: (state) => state.productResource,
    },
    actions: {
        setProductCollection(productCollection) {
            this.productCollection = productCollection
        },
        setProductResource(productResource) {
            this.productResource = productResource
        },
        resetProductResource() {
            this.productResource = defaultProductResource
        },
    }
})
