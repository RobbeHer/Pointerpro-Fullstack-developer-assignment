import { defineStore } from 'pinia'

const defaultProductCollection = null
const defaultProductResource = {
    id: null,
    name: null,
    description: null,
    price: 0,
    stock: 0,
}

export const useProductStore = defineStore('product', {
    state: () => ({
        productCollection: defaultProductCollection,
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
        resetProductCollection() {
            this.productCollection = defaultProductCollection
        },
        resetProductResource() {
            this.productResource = defaultProductResource
        },
    }
})
