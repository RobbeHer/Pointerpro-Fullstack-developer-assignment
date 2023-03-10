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

        <RouterLink :to="{ name: 'dashboard_products_create' }">Create new product +</RouterLink>

        <div v-if="!productStore.getProductCollection?.data.length" class="mt-4">
            No products found
        </div>
        <template v-else>
            <table class="mt-4">
                <tr>
                    <th>id</th>
                    <th>Product name</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                <tbody>
                <tr v-for="product in productStore.getProductCollection?.data">
                    <td>{{ product.id }}</td>
                    <td>
                        <RouterLink :to="{ name: 'dashboard_products_edit', params: { id: product.id } }">
                            {{ product.name }}
                        </RouterLink>
                    </td>
                    <td>{{ product.stock }}</td>
                    <td class="alnright">€{{ product.price }}</td>
                    <td>
                        <RouterLink :to="{ name: 'dashboard_products_edit', params: { id: product.id } }">Edit</RouterLink>
                        <button @click="onDeleteProduct(product.id)">Delete</button>
                    </td>
                </tr>
                </tbody>
            </table>

            <button
                v-for="link in productStore.getProductCollection?.meta.links"
                @click="getProducts(link.url)"
                class="mt-4"
                v-html="link.label"
            />
        </template>
    </section>

    <section>
        <h3>Purchases</h3>

        <template v-if="!purchaseStore.getPurchaseCollection?.data.length">
            No purchases found
        </template>
        <template v-else>
            <table>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>date</th>
                </tr>
                <template v-for="(purchase, rowIndex) in purchaseStore.getPurchaseCollection?.data">
                    <tr :class="{'even-group': rowIndex%2}">
                        <td>{{ purchase.id }}</td>
                        <td>{{ purchase.name }}</td>
                        <td>{{ new Date(purchase.created_at).toLocaleString() }}</td>
                    </tr>
                    <tr :class="{'even-group': rowIndex%2}">
                        <td colspan="3">
                            <details class="purchase-details">
                                <summary>details</summary>
                                <div class="content">
                                    <div class="bold">Client info</div>
                                    <div>Email: {{ purchase.email }}</div>
                                    <div>Address: {{ purchase.address }}</div>
                                    <div class="bold mt-4">Items</div>
                                    <table>
                                        <tr>
                                            <th>Product name</th>
                                            <th>Quantity</th>
                                            <th>Price (when sold)</th>
                                        </tr>
                                        <tr v-for="product in purchase.products">
                                            <td>
                                                <RouterLink
                                                    :to="{ name: 'dashboard_products_edit', params: { id: product.id } }">
                                                    {{ product.name }}
                                                </RouterLink>
                                            </td>
                                            <td class="alnright">{{ product.pivot.quantity }}</td>
                                            <td class="alnright">€{{ product.price }}</td>
                                        </tr>
                                    </table>
                                </div>
                            </details>
                        </td>
                    </tr>
                </template>
            </table>

            <button
                v-for="link in purchaseStore.getPurchaseCollection?.meta.links"
                @click="getPurchases(link.url)"
                class="mt-4"
                v-html="link.label"
            />
        </template>
    </section>
</template>