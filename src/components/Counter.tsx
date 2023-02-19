import React, { useRef } from 'react';
import '../css/counter.scss';
import {observer} from "mobx-react-lite";
import deleteLogo from "../icons/trash-cat.png";
import {store} from "../store/Basket";

interface ProductProps {
    product: any
}

export const Counter = observer(function Counter({product}: ProductProps) {

    const count = product.count ? product.count : 1;

    const inputRef = useRef<HTMLInputElement>(null);

    const changeValue = ({count, newValue}: any) => {
        store.changeQuantity(newValue !== 100 ? newValue : 99, product);
    }

    const handleValueChange = (newValue: number, isField: boolean) => {

        if (newValue < 1) {
            newValue = 1;
        }

        if (!isField && inputRef.current) {

            inputRef.current.style.transform = newValue > count ? 'translateY(-100%)' : 'translateY(100%)';
            inputRef.current.style.opacity = '0';

            setTimeout(() => {
                if (inputRef.current) {
                    inputRef.current.style.transitionDuration = '0s';
                    inputRef.current.style.transform = newValue > count ? 'translateY(100%)' : 'translateY(-100%)';
                    inputRef.current.style.opacity = '0';
                    changeValue({count, newValue});

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
            changeValue({count, newValue});
        }
    }


    return (
        <div className='counter flex justify-between w-full'>
            <div className='flex items-center'>
                <button className='button' onClick={() => handleValueChange(count - 1, false)} title="-1">-</button>
                <div className='input-wrapper'>
                    <input ref={inputRef} className='input' maxLength={2}
                           onChange={() => handleValueChange(inputRef.current ? Number(inputRef.current.value) : 0, true)}
                           type='text'
                           value={count}></input>
                </div>
                <button className='button' onClick={() => handleValueChange(count + 1, false)} title="+1">+</button>
            </div>
            <button className='' onClick={() => store.deleteProduct(product)} title="-1">
                <img className="w-[32px]" src={deleteLogo} alt={'Удалить'}/>
            </button>
        </div>
    )
})