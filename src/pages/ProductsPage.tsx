import React from 'react'
import {useProducts} from '../hooks/products'
import {Loader} from '../components/Loader'
import {ErrorMessage} from '../components/ErrorMessage'
import {Product} from '../components/Product'
import {OrderPanelItem} from "../components/OrderPanel";
import productCounter from "../store/productCounter";
import {observer} from "mobx-react-lite";
import {TotalProduct} from "../components/TotalProfuct";

export const ProductsPage = observer(function ProductsPage() {
    const {loading, error, products} = useProducts()

    return (
        <div className="container mx-auto max-w-[1440px] p-[24px]">
            {loading && <Loader/>}
            {error && <ErrorMessage error={error}/>}
            {productCounter.products.length > 0 && <div className="order-panel grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-[42px]">
                {productCounter.products.map(item => <OrderPanelItem product={item} key={item.id}/>)}
            </div>}

            {productCounter.products.length > 0 && <TotalProduct/>}
            <div className="products grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[42px]">
                {products.map(product => <Product product={product} key={product.id}/>)}
            </div>
        </div>
    )
})