import React from 'react'
import blue from '../../assets/blue.jpg'
import bag from '../../assets/bag.png'
import heart from '../../assets/like.png'
import './favorites.scss'
import Header from '../../components/header/Header'
import Sidebar from "../../components/sidebar/Sidebar";
import Paragraph from '../../components/paragraph/Paragraph'

const Favorites = () => {
    return (
        <>
            <Header />
            <div className='favorites flex flex-col'>
                <h1 className='font-semibold self-center'>FAVORITOS</h1>
                <div className='favorites__container flex gap-4'>
                    <Sidebar />
                    <Paragraph/>
                    <div className='flex gap-6'>
                        <img className='w-40 rounded-md' src={blue} alt="" />
                        <div className='flex flex-col justify-between'>
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold text-[18px]'>$ 15.000</p>
                                <p className='font-semibold'>Blusa blanca de tela suave</p>
                                <p>Talla M</p>
                                <img className='w-5 cursor-pointer object-contain' src={heart} alt="" />
                            </div>

                            <div className='flex gap-2 cursor-pointer items-center'>
                                <img className='w-5 object-contain' src={bag} alt="" />
                                <p className='font-semibold'>Añadir a la bolsa</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default Favorites 