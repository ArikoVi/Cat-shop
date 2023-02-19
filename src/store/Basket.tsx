import {types} from "mobx-state-tree";
import {IProduct} from "../models";
import {autorun, toJS} from "mobx";

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
                const count = product.count ? product.count : 1;
                if (product.count && count < product.count) {
                    return (sum - product.price * count)
                } else return (sum + product.price * count)
            }, 0)) * 100) / 100;
        },
        get computedSumLimit(): number {
            return self.count !== 100 ? self.count : 99
        }
    }))
    .actions(basket => ({

        setTotalSum(newTotalSum: number) {
            basket.totalSum = newTotalSum
        },

        setProductsCount(newCount: number) {
            basket.count = newCount
        },
        addProduct(product: any) {
            const index = store.products.findIndex(p => p.id === product.id);

            if (index < 0) {
                product.count = 1;
                store.products.push(product);
            } else if (product.count) {
                product.count = product.count + 1;
                store.products[index].count = product.count;
            }
        },

        changeQuantity(count: number, product?: IProduct) {
            store.count = count;
            product && (product.count = count);
        },

        deleteProduct(product: IProduct) {
            const index = store.products.findIndex(p => p.id === product.id);
            store.products.splice(index, 1);
        },

        clearBasket() {
            // @ts-ignore
            store.products = [];
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
    store.count = store.computedSumLimit;
})

