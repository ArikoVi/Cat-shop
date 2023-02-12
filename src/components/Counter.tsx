import React, {useState, useRef, useEffect} from 'react';
import '../css/counter.scss';
import {IProduct} from "../models";
import productCounter from "../store/productCounter";
import {observer} from "mobx-react-lite";
import deleteLogo from "../icons/trash-cat.png";

interface ProductProps {
    product: IProduct
}

export const Counter = observer(function Counter({product}: ProductProps) {

    const [count, setCount] = useState(product.count ? product.count : 1);
    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        product.count && setCount(product.count !== 100 ? product.count : 99);
    }, [product.count])

    const changeValue = ({count, newValue}: any) => {
        productCounter.changeQuantity(newValue !== 100 ? newValue : 99, product);
        setCount(newValue !== 100 ? newValue : 99);
    }

    const handleValueChange = (newValue: number, isField: boolean) => {
        console.log(count, count + 1);
        console.log(newValue, isField);

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
            console.log(count, newValue)
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
            <button className='' onClick={() => productCounter.deleteProduct(product)} title="-1">
                <img className="w-[32px]" src={deleteLogo} alt={'Удалить'}/>
            </button>
        </div>
    )
})