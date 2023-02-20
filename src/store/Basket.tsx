import {types} from "mobx-state-tree";
import {IProduct} from "../models";
import {autorun} from "mobx";

export const Rating = types.model("Rating", {
    rate: types.number,
    count: types.number
})

export const Product = types.model("Product", {
    id: types.number,
    title: types.string,
    price: types.number,
    description: types.string,
    category: types.string,
    image: types.string,
    rating:Rating,
    count: types.number
})

const Basket = types
    .model({
        totalSum: types.optional(types.number, 0),
        count: types.optional(types.number, 0),
        products: types.optional(types.array(Product), []),
    })
    .views((self) => ({
        get computedTotalSum() {
            return Math.round((self.products.reduce((sum, product) => {
                const count = product.count;
                if (product.count && count < product.count) {
                    return (sum - product.price * count)
                } else return (sum + product.price * count)
            }, 0)) * 100) / 100;
        },
        get computedSumLimit(): number {
            return self.count !== 100 ? self.count : 99
        },
        get productaCount(): number {

            return self.products.reduce((count, product) => {
                if (product.count > 0) {
                    return (count + product.count)
                } else return count
            }, 0)
        }
    }))
    .actions(basket => ({

        setTotalSum(newTotalSum: number) {
            basket.totalSum = newTotalSum
        },

        setProductsCount(newCount: number) {
            basket.count = newCount
        },
        setCount(newCount: number, index: number) {
            basket.products[index].count = newCount
        },
        createProductList(product: IProduct) {
            product.count = product.count? product.count : 0
            store.products.push(product);
        },
        addProduct(product: IProduct) {
            const index = store.products.findIndex(p => p.id === product.id);

            if (index < 0) {
                product.count = 1;
                store.products.push(product);
            } else {
                store.setCount(product.count + 1, index)
            }
        },

        changeQuantity(count: number, product: IProduct) {
            const index = store.products.findIndex(p => p.id === product.id);
            store.setCount(count, index)
        },

        deleteProduct(product: IProduct) {
            const index = store.products.findIndex(p => p.id === product.id);
            store.products[index].count = 0;
        },

        clearBasket() {
            store.products.forEach(item => {
                item.count = 0
            })
            store.totalSum = 0;
        }
    }))

export const store = Basket.create({
    count: 0,
    totalSum: 0,
    products: []
});


autorun(() => {
    store.totalSum = store.computedTotalSum;
    store.count = store.productaCount;
})

