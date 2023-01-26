import { defineStore } from 'pinia'

const defaultProductCollection = null
const defaultProductResource = {
    id: null,
    name: null,
    description: null,
    price: 0.00,
    stock: 0,
}
const defaultFormErrors = {}

export const useProductStore = defineStore('product', {
    state: () => ({
        productCollection: defaultProductCollection,
        productResource: defaultProductResource,
        formErrors: defaultFormErrors,
    }),
    getters: {
        getProductCollection: (state) => state.productCollection,
        getProductResource: (state) => state.productResource,
        getFormErrors: (state) => state.formErrors,
    },
    actions: {
        setProductCollection(productCollection) {
            this.productCollection = productCollection
        },
        setProductResource(productResource) {
            this.productResource = productResource
        },
        setFormErrors(errors) {
            this.formErrors = errors
        },
        resetProductCollection() {
            this.productCollection = defaultProductCollection
        },
        resetProductResource() {
            this.productResource = defaultProductResource
        },
        resetFormErrors() {
            this.formErrors = defaultFormErrors
        }
    }
})
