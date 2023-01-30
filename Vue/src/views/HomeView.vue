<script setup>
import {useCartStore} from "@/stores/cart";
import {useProductStore} from "@/stores/product";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import CartItemList from "@/components/cart/ItemList.vue";
import {onUnmounted} from "vue";

const cartStore = useCartStore();
const productStore = useProductStore();
const ProductRepository = RepositoryFactory.get('products');

async function getProducts(url = null) {
    const data = await ProductRepository.get(url);
    productStore.setProductCollection(data);
}
getProducts();

function addProductToCart(product) {
    cartStore.addItem(product);
}

onUnmounted(() => productStore.resetProductCollection());
</script>

<template>
    <h1>Homepage</h1>

    <section>
        <h2>Product list</h2>

        <table>
            <tr>
                <th>Product name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Action</th>
            </tr>
            <tr v-for="product in productStore.getProductCollection?.data">
                <td>
                    <RouterLink :to="{ name: 'product_details', params: { id: product.id } }">
                        {{ product.name }}
                    </RouterLink>
                </td>
                <td>€{{ product.price }}</td>
                <td>{{ product.stock}}</td>
                <td>
                    <button @click="addProductToCart(product)">
                        Add to cart
                    </button>
                </td>
            </tr>
        </table>
    </section>

    <button
        v-for="link in productStore.getProductCollection?.meta.links"
        @click="getProducts(link.url)"
    >
        {{ link.label }}
    </button>

    <section>
        <h2>Cart overview</h2>

        <CartItemList/>
        <RouterLink :to="{ name: 'cart' }">View cart</RouterLink>
    </section>
</template>