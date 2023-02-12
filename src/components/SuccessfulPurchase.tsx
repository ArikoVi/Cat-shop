import {Link} from "react-router-dom";
import React, {useContext} from "react";
import {ModalContext} from "../context/ModalContext";
import '../css/btn.scss';
import successLogo from "../icons/success.png";

export default function SuccessfulPurchase() {
    const {close} = useContext(ModalContext)

    return (
        <div className="flex flex-col justify-center items-center">
            <img className="w-[120px] m-[24px]" src={successLogo} alt="Итого"/>
            <Link to="/">
                <button onClick={close} className="btn">
                    OK
                </button>
            </Link>
        </div>
    )
}