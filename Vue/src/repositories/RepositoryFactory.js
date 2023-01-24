import UserRepository from "@/repositories/UserRepository";
import ProductRepository from "@/repositories/ProductRepository";
import PurchaseRepository from "@/repositories/PurchaseRepository";
import AdminProductRepository from "@/repositories/admin/ProductRepository";
import AdminPurchaseRepository from "@/repositories/admin/PurchaseRepository";

const repositories = {
    'user': UserRepository,
    'products': ProductRepository,
    'purchase': PurchaseRepository,
}

const adminRepositories = {
    'products': AdminProductRepository,
    'purchase': AdminPurchaseRepository,
}

export default {
    get: name => repositories[name],
    getAdmin: name => adminRepositories[name],
}