import UserRepository from "@/repositories/UserRepository";
import AdminProductRepository from "@/repositories/admin/ProductRepository";

const repositories = {
    'user': UserRepository,
}

const adminRepositories = {
    'products': AdminProductRepository,
}

export default {
    get: name => repositories[name],
    getAdmin: name => adminRepositories[name],
}