import React, {MouseEventHandler, useState} from 'react'
import {observer} from "mobx-react-lite";
import '../css/product.scss';
import {store} from "../store/Basket";
import {IProduct} from "../models";

interface ProductProps {
    product: IProduct
}

export const Product = observer(function Product({product}: ProductProps) {
    const [details, setDetails] = useState(false);

    const handleClick: MouseEventHandler = (event) => {
        event.stopPropagation();
        setDetails(prev => !prev);
    }

    const addProductHandler = (product: IProduct) => {
        store.addProduct(product);
    }

    return (
        <div
            className="flex flex-col border rounded justify-items-center p-4 product"
            onClick={() => addProductHandler(product)}
        >
            <div className="flex flex-auto h-[60%] justify-center h-[320px]">
                <img className="max-w-full max-h-[320px]" src={product.image} alt={product.title}/>
            </div>
            <div className="flex flex-auto h-[40%] flex-col justify-between pt-[16px] pb-[16px]">
                <p>{product.title}</p>
                <div>
                    <p className="font-bold mb-[8px] mt-[8px]">{product.price}</p>
                    <button
                        className="product_button relative"
                        onClick={handleClick}
                    >
                        {details ? 'Hide Details' : 'Show Details'}
                    </button>
                </div>

                {details && <div onClick={e => e.stopPropagation()} className="product_item absolute bottom-[112px] p-[8px]">
                    <p>{product.description}</p>
                    <p>Rate: <span style={{fontWeight: 'bold'}}>{product?.rating?.rate}</span></p>
                </div>}
            </div>

        </div>
    )
})