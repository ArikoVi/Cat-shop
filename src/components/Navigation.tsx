import React from 'react'
import {Link} from 'react-router-dom'
import basketLogo from '../icons/cat.png';
import {observer} from "mobx-react-lite";
import {store} from "../store/Basket";


export const Navigation = observer(function Navigation() {
    return (
        <nav className="h-[50px] pl-[24px] pr-[24px] bg-gray-500 text-white">
            <div className="h-full mx-auto max-w-[1440px] flex justify-between items-center">
                <span className="font-bold">ArikoVi</span>

                <span className="flex items-center">
        <Link to="/" className="mr-8">Каталог</Link>
        <Link to="/about" className="flex items-center">
            <img className="w-[32px] mr-[8px]" src={basketLogo} alt={'Корзина'}/>
            {store.products.length}
        </Link>
      </span></div>
        </nav>
    )
})