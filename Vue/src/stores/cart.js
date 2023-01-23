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
        // POGING 2
        getItems: (state) => state.items,

        // POGING 1 Bad presentation after refresh
        /*getItems: (state) => {
            const distinctItems = [...new Set(state.items)];

            return distinctItems.map((product) => {
                let quantity = 0;

                state.items.forEach((item) => {
                    if (item === product) quantity++;
                });

                return {product, quantity};
            })
        },*/

        getTotalPrice: (state) => {
            let totalPrice = 0;
            state.items.forEach((item => {
                totalPrice += item.product.price * item.quantity
            }))
            return totalPrice;
        },
    },
    actions: {
        // POGING 2
        addItem(product, quantity = 1) {
            const index = this.items.findIndex(i => i.product.id === product.id);
            if (index !== -1) {
                let item = this.items.at(index);
                item.quantity += quantity;
            } else {
                this.items.push({ product, quantity });
            }
        },

        // POGING 1
        /*addItem(product) {
            this.items.push(product);
        },*/

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
