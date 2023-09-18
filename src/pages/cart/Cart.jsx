import React from 'react'
import del from '../../assets/delete.png'
import blue from '../../assets/blue.jpg'
import { useNavigate } from 'react-router';
import './cart.scss'
import Header from '../../components/header/Header';
import Sidebar from "../../components/sidebar/Sidebar";
import Paragraph from '../../components/paragraph/Paragraph';

const Cart = () => {
    const navigate = useNavigate();
    return (
        <>
            <Header />
            <div className='cart flex flex-col'>
                <h1 className='title self-center'>CARRITO</h1>
                <div className='cart__container'>
                    <Sidebar/>
                    <Paragraph/>
                    <div className='flex gap-8'>
                        <img className='w-40' src={blue} alt="" />
                        <div className='flex flex-col gap-14'>
                            <div className='flex flex-col gap-4'>
                                <div className='flex justify-between'>
                                    <p className='font-semibold'>$ 15.000</p>
                                    <img className='w-5 object-contain cursor-pointer' src={del} alt="" />
                                </div>
                                <p className='font-semibold'>Blusa blanca de tela suave</p>
                                <p>Talla M</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-8'>

                        <div className='flex justify-between'>
                            <div className='flex gap-2'>
                                <p className='font-semibold'>Total</p>
                                <p>(+ envío)</p>
                            </div>
                            <p className='font-semibold'>$ 15.000</p>
                        </div>
                        <button className="button__page px-6 py-1.5 w-[100%]" onClick={() => navigate('/location')}>Continuar con la compra</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Cart