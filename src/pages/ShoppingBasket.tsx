import React, {useContext} from 'react'
import productCounter from "../store/productCounter";
import {OrderPanelItem} from "../components/OrderPanel";
import {TotalProduct} from "../components/TotalProfuct";
import {observer} from "mobx-react-lite";
import {Modal} from "../components/Modal";
import {ModalContext} from "../context/ModalContext";
import SuccessfulPurchase from "../components/SuccessfulPurchase";
import '../css/btn.scss';
import emptyLogo from "../icons/empty.png";

export const ShoppingBasket = observer(function ShoppingBasket() {
    const {modal, open, close} = useContext(ModalContext)
    console.log(productCounter.products.length)

    return (
        <div className="mx-auto max-w-[1440px] p-[24px]">
            <div className="order-panel grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mb-[42px]">
                {productCounter.products.map(item => <OrderPanelItem product={item} key={item.id}/>)}
            </div>
            <div className="flex justify-center flex-col md:flex-row md:items-end items-center">
                {productCounter.products.length > 0 && <><TotalProduct/>
                    <div className="flex items-end md:mt-0 mt-[24px]">
                        <button className="btn" onClick={open}>Заказать
                        </button>

                        <button className="btn" onClick={() => productCounter.clearBasket()}>Очистить корзину</button>
                    </div>
                    {modal && <Modal title="Thank you for your order!" onClose={close}>
                        <SuccessfulPurchase/>
                    </Modal>}
                </>}
            </div>
            {productCounter.products.length === 0 &&
                <div className="flex flex-col items-center">
                    <img className="w-[120px] mb-[24px]" src={emptyLogo} alt="Пусто"/>
                Корзина пуста
                </div>}
        </div>
    )
})