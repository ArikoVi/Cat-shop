import {observer} from "mobx-react-lite";
import totalLogo from "../icons/review-cat.png";
import productCounter from "../store/productCounter";
import React from "react";
import '../css/tooltip.scss';

export const TotalProduct = observer(function TotalProduct() {
    const count = productCounter.products.length > 0 ? productCounter.products.length : 0;

    const getNoun = (number: number, one: string = 'товар', two: string = 'товара', five: string = 'товаров') => {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) {
            return five;
        }
        n %= 10;
        if (n === 1) {
            return one;
        }
        if (n >= 2 && n <= 4) {
            return two;
        }
        return five;
    }

    return (
        <div className="tooltip flex items-end h-[180px]">
            <div><img className="w-[120px]" src={totalLogo} alt="Итого"/></div>
            {/*<div className="tooltip_bubble thought">К оформлению
                {count > 0 && <> {count} {getNoun(count)} на </>} {productCounter.totalSum}
            </div>*/}
            <div className="tooltip_bubble speech flex self-start">К оформлению
                {count > 0 && <> {count} {getNoun(count)} на </>} {productCounter.totalSum}
            </div>

        </div>
    );
})