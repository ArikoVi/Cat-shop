import {autorun, computed, makeAutoObservable, observable} from "mobx";
import {IProduct} from "../models";


class ProductCounter {
    @observable products: IProduct[] = [];
    @observable count = 0;
    totalSum = 0;

    @computed get computedTotalSum(): number {
        return Math.round((this.products.reduce((sum, product) => {
            const count = product.count ? product.count : 1;
            if (product.count && count < product.count) {
                return (sum - product.price * count)
            } else return (sum + product.price * count)
        }, 0)) * 100) / 100;
    }

    @computed get computedSumLimit(): number {
        return this.count !== 100 ? this.count : 99
    }

    constructor() {
        makeAutoObservable(this)
        autorun(() => {
            this.totalSum = this.computedTotalSum;
            this.count = this.computedSumLimit;
        });
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
    }

    changeQuantity(count: number, product?: IProduct) {
        this.count = count;
        product && (product.count = count);
    }

    deleteProduct(product: IProduct) {
        const index = this.products.findIndex(p => p.id === product.id);
        this.products.splice(index, 1);
    }

    clearBasket() {
        this.products = [];
        this.totalSum = 0;
    }
}

export default new ProductCounter()