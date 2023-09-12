import React from 'react'
import back from '../../assets/back.png'
import home from '../../assets/home.png'
import user from '../../assets/user.png'
import del from '../../assets/delete.png'
import blue from '../../assets/blue.jpg'
import comunity from '../../assets/comunity.png'
import { useNavigate } from 'react-router';

const Cart = () => {
    const navigate = useNavigate();
    return (
        <div className='cart mx-20 my-12 flex flex-col'>
            <div className='flex justify-between'>
                <img className='w-5 cursor-pointer object-contain' onClick={() => navigate(-1)} src={back} alt="" />
                <h1 className='text-[20px] font-semibold'>CARRITO</h1>
                <div className='flex gap-4'>
                    <img className='w-4 object-contain cursor-pointer' onClick={() => navigate('/')} src={home} alt="" />
                    <img className='w-4 object-contain cursor-pointer' onClick={() => navigate('/login')} src={user} alt="" />
                    <img className='w-6 object-contain cursor-pointer' src={comunity} alt="" />
                </div>
            </div>

            <div className='mx-60 my-20 flex justify-between'>

                <div className='flex gap-8'>
                    <img className='w-40' src={blue} alt="" />
                    <div className='flex flex-col gap-14'>
                        <div className='flex flex-col gap-4'>
                            <div className='flex justify-between'>
                                <p className='font-semibold'>$ 15.000</p>
                                <img className='w-5 object-contain' src={del} alt="" />
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

                    <button className="button__page px-6 py-1.5 w-[100%]">Continuar con la compra</button>
                </div>
            </div>

        </div>
    )
}

export default Cart