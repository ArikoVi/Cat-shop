import React, { useRef } from 'react';
import '../css/counter.scss';
import {observer} from "mobx-react-lite";
import deleteLogo from "../icons/trash-cat.png";
import {store} from "../store/Basket";
import {IProduct} from "../models";

interface ProductProps {
    product: IProduct
}

export const Counter = observer(function Counter({product}: ProductProps) {

    const inputRef = useRef<HTMLInputElement>(null);

    const changeValue = ({newValue}: any) => {
        store.changeQuantity(newValue !== 100 ? newValue : 99, product);
    }

    const handleValueChange = (newValue: number, isField: boolean) => {

        if (newValue < 0) {
            newValue = 0;
        }

        if (!isField && inputRef.current) {

            inputRef.current.style.transform = newValue > product.count ? 'translateY(-100%)' : 'translateY(100%)';
            inputRef.current.style.opacity = '0';

            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.style.transitionDuration = '0s';
                    inputRef.current.style.transform = newValue > product.count ? 'translateY(100%)' : 'translateY(-100%)';
                    inputRef.current.style.opacity = '0';
                    changeValue({ newValue});

                    setTimeout(() => {
                        if (inputRef.current) {
                            inputRef.current.style.transitionDuration = '0.3s';
                            inputRef.current.style.transform = 'translateY(0)';
                            inputRef.current.style.opacity = '1';
                        }
                    }, 20);
                }
            }, 250);
        } else {
            changeValue({newValue});
        }
    }


    return (
        <div className='counter flex justify-between w-full'>
            <div className='flex items-center'>
                <button className='button' onClick={() => handleValueChange(product.count - 1, false)} title="-1">-</button>
                <div className='input-wrapper'>
                    <input ref={inputRef} className='input' maxLength={2}
                           onChange={() => handleValueChange(inputRef.current ? Number(inputRef.current.value) : 0, true)}
                           type='text'
                           value={product.count}></input>
                </div>
                <button className='button' onClick={() => handleValueChange(product.count + 1, false)} title="+1">+</button>
            </div>
            <button className='' onClick={() => store.deleteProduct(product)} title="-1">
                <img className="w-[32px]" src={deleteLogo} alt={'Удалить'}/>
            </button>
        </div>
    )
})