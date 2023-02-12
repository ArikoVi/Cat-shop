import {observer} from "mobx-react-lite";
import React from "react";
import {IProduct} from "../models";
import {Counter} from "./Counter";
import '../css/product.scss';

interface ProductProps {
    product: IProduct
}

export const OrderPanelItem = observer(function OrderPanelItem({product}: ProductProps) {
    return (
        <div className="flex w-full border rounded justify-items-center p-4 product_item">
            <div className="flex flex-auto items-center w-[30%] mr-[16px]">
                <img className="max-w-full " src={product.image} alt={product.title}/>
            </div>
            <div className="flex-auto w-[70%] flex flex-col items-start h-full justify-between">
                <p>{product.title}</p>
                <div className="w-full mt-[16px]">
                    <p className="font-bold">{product.price}</p>
                    <Counter product={product} key={product.id}/>
                </div>
            </div>
        </div>
    )
})