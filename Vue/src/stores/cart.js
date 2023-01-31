import {defineStore} from 'pinia'

const defaultItems = []

export const useCartStore = defineStore('cart', {
    state: () => ({
        items: defaultItems,
    }),
    persist: {
        storage: sessionStorage,
    },
    getters: {
        getItems: (state) => state.items,
        getTotalPrice: (state) => {
            let totalPrice = 0;
            state.items.forEach((item => {
                totalPrice += item.product.price * item.quantity
            }))
            return totalPrice;
        },
        getItemIdsAndQuantities: (state) =>  state.items.map(item => ({ id: item.product.id, quantity: item.quantity })),
        getCountOfItemInCart: (state) => (product) => state.items.find(item => item.product.id === product.id)?.quantity,
    },
    actions: {
        addItem(product, quantity = 1) {
            const index = this.items.findIndex(i => i.product.id === product.id);
            if (index !== -1) {
                let item = this.items.at(index);
                item.quantity += quantity;
            } else {
                this.items.push({ product, quantity });
            }
        },
        removeItem(product, quantity = 1) {
            const index = this.items.findIndex(i => i.product.id === product.id);
            if (index !== -1) {
                let item = this.items.at(index);
                item.quantity -= quantity;
                if (item.quantity === 0) this.items.splice(index, 1);
            }
        },
        resetItems() {
            this.items = defaultItems
        },
    }
})
