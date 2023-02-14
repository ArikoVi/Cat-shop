import {makeAutoObservable} from "mobx";
import {IProduct} from "../models";
import {types} from "mobx-state-tree";

const Rating = types.model("Rating", {
    rate: types.number,
    count: types.number
})

const Product = types.model("Product", {
    id: types.number,
    title: types.string,
    price: types.number,
    description: types.string,
    category: types.string,
    image: types.string,
    rating: types.array(Rating),
    count: types.number
})

const Basket = types
    .model({
        totalSum: types.optional(types.number, 0),
        count: types.optional(types.number, 0),
        products: types.optional(types.array(Product), []),
    })
    .actions(basket => ({
        setTotalSum(newTotalSum: number) {
            basket.totalSum = newTotalSum
        },

        setProductsCount(newCount: number) {
            basket.totalSum = newCount
        },
    }))

const store = Basket.create({
    count: 0,
    totalSum: 0,
    products: []
});

class ProductCounter {
    products: IProduct[] = [];
    count = 0;
    totalSum = 0;

    constructor() {
        makeAutoObservable(this)
    }

    addProduct(product: IProduct) {
        const index = this.products.findIndex(p => p.id === product.id);

        if (index < 0) {
            product.count = 1;
            this.products.push(product);
        } else if (product.count) {
            product.count = product.count + 1;
            this.products[index].count = product.count;
        }
        this.totalSum = Math.round((this.products.reduce((sum, product) => {
            const count = product.count ? product.count : 1;
            if (product.count && count < product.count) {
                return (sum - product.price * count)
            } else return (sum + product.price * count)
        }, 0)) * 100) / 100;

        store.setTotalSum(this.totalSum);
    }

    changeQuantity(count: number, product?: IProduct) {
        this.count = count;
        product && (product.count = count);
        this.totalSum = Math.round((this.products.reduce((sum, product) => {
            const count = product.count ? product.count : 1;
            if (product.count && count < product.count) {
                return (sum - product.price * count)
            } else return (sum + product.price * count)
        }, 0)) * 100) / 100;
        store.setTotalSum(this.totalSum);
    }

    deleteProduct(product: IProduct) {
        const index = this.products.findIndex(p => p.id === product.id);
        this.products.splice(index, 1);
        this.totalSum = Math.round((this.products.reduce((sum, product) => {
            const count = product.count ? product.count : 1;
            if (product.count && count < product.count) {
                return (sum - product.price * count)
            } else return (sum + product.price * count)
        }, 0)) * 100) / 100;
        store.setTotalSum(this.totalSum);
    }

    clearBasket() {
        this.products = [];
        this.totalSum = 0;
    }
}

export default new ProductCounter()