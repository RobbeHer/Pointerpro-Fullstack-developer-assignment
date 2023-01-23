import UserRepository from "@/repositories/UserRepository";
import ProductRepository from "@/repositories/ProductRepository";
import PurchaseRepository from "@/repositories/PurchaseRepository";
import AdminProductRepository from "@/repositories/admin/ProductRepository";

const repositories = {
    'user': UserRepository,
    'products': ProductRepository,
    'purchase': PurchaseRepository,
}

const adminRepositories = {
    'products': AdminProductRepository,
}

export default {
    get: name => repositories[name],
    getAdmin: name => adminRepositories[name],
}