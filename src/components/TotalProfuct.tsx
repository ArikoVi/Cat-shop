import {observer} from "mobx-react-lite";
import totalLogo from "../icons/review-cat.png";
import React from "react";
import '../css/tooltip.scss';
import {store} from "../store/Basket";

export const TotalProduct = observer(function TotalProduct() {
    const count = store.products.length > 0 ? store.products.length : 0;

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
            <div className="tooltip_bubble speech flex self-start">К оформлению
                {store.count > 0 && <> {store.count} {getNoun(store.count)} на </>} {store.totalSum}
            </div>

        </div>
    );
})