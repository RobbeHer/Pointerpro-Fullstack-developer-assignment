<script setup>
import {useProductStore} from "@/stores/product";
import {usePurchaseStore} from "@/stores/purchase";
import RepositoryFactory from "@/repositories/RepositoryFactory";
import {onUnmounted} from "vue";

const productStore = useProductStore();
const purchaseStore = usePurchaseStore();
const ProductRepository = RepositoryFactory.getAdmin('products');
const PurchaseRepository = RepositoryFactory.getAdmin('purchase');

async function getProducts(url = null) {
    const data = await ProductRepository.get(url);
    productStore.setProductCollection(data);
}
getProducts();

function onDeleteProduct(id) {
    ProductRepository.delete(id);
}

async function getPurchases(url = null) {
    const data = await PurchaseRepository.get(url);
    purchaseStore.setPurchaseCollection(data);
}
getPurchases();

onUnmounted(() => productStore.resetProductCollection());
</script>

<template>
    <h1>Dashboard</h1>

    <section>
        <h2>Products</h2>

        <RouterLink :to="{ name: 'dashboard_products_create' }">Create new product</RouterLink>

        <table>
            <tr>
                <th>id</th>
                <th>Product name</th>
                <th>Stock</th>
                <th>Price</th>
                <th>Actions</th>
            </tr>
            <tr v-for="product in productStore.getProductCollection?.data">
                <td>{{ product.id }}</td>
                <td>
                    <RouterLink :to="{ name: 'dashboard_products_edit', params: { id: product.id } }">
                        {{ product.name }}
                    </RouterLink>
                </td>
                <td>{{ product.stock}}</td>
                <td>€{{ product.price }}</td>
                <td>
                    <RouterLink :to="{ name: 'dashboard_products_edit', params: { id: product.id } }">Edit</RouterLink>
                    <button @click="onDeleteProduct(product.id)">Delete</button>
                </td>
            </tr>
        </table>

        <button
            v-for="link in productStore.getProductCollection?.meta.links"
            @click="getProducts(link.url)"
        >
            {{ link.label }}
        </button>
    </section>

    <section>
        <h3>Purchases</h3>

        <table>
            <tr>
                <th>id</th>
                <th>name</th>
                <th>date</th>
            </tr>
            <template v-for="purchase in purchaseStore.getPurchaseCollection?.data">
                <tr>
                    <td>{{ purchase.id }}</td>
                    <td>{{ purchase.name }}</td>
                    <td>{{ purchase.created_at }}</td>
                </tr>
                <tr>
                    <td colspan="3">
                        <details>
                            <summary>details</summary>
                            <div>Client info</div>
                            <div>Email: {{ purchase.email }}</div>
                            <div>Address: {{ purchase.address }}</div>
                            <div>Items</div>
                            <table>
                                <tr>
                                    <th>Product name</th>
                                    <th>Quantity</th>
                                    <th>Price (when sold)</th>
                                </tr>
                                <tr v-for="product in purchase.products">
                                    <td>
                                        <RouterLink :to="{ name: 'dashboard_products_edit', params: { id: product.id } }">
                                            {{ product.name }}
                                        </RouterLink>
                                    </td>
                                    <td>{{ product.pivot.quantity}}</td>
                                    <td>€{{ product.price }}</td>
                                </tr>
                            </table>
                        </details>
                    </td>
                </tr>
            </template>
        </table>

        <button
            v-for="link in purchaseStore.getPurchaseCollection?.meta.links"
            @click="getPurchases(link.url)"
        >
            {{ link.label }}
        </button>
    </section>
</template>