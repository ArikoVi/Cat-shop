import {makeAutoObservable} from "mobx";
import {IProduct} from "../models";

class ProductCounter {
    products: IProduct[] = [];
    count = 0;
    totalSum = 0;

    constructor() {
        makeAutoObservable(this)
    }

    addProduct(product:IProduct) {
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
    }

    changeQuantity(count: number, product?:IProduct) {
        this.count = count;
        product && (product.count = count);
        this.totalSum = Math.round((this.products.reduce((sum, product) => {
            const count = product.count ? product.count : 1;
            if (product.count && count < product.count) {
                return (sum - product.price * count)
            } else return (sum + product.price * count)
        }, 0)) * 100) / 100;
    }

    deleteProduct(product:IProduct) {
        const index = this.products.findIndex(p => p.id === product.id);
        this.products.splice(index,1);
        this.totalSum = Math.round((this.products.reduce((sum, product) => {
            const count = product.count ? product.count : 1;
            if (product.count && count < product.count) {
                return (sum - product.price * count)
            } else return (sum + product.price * count)
        }, 0)) * 100) / 100;
    }

    clearBasket() {
        this.products = [];
        this.totalSum = 0;
    }
}

export default new ProductCounter()