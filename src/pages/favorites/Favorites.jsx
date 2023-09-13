import React from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../../assets/back.png'
import Options from '../../components/options/Options'
import blue from '../../assets/blue.jpg'
import bag from '../../assets/bag.png'
import heart from '../../assets/like.png'

const Favorites = () => {
    const navigate = useNavigate();
    return (
        <div className='mx-20 my-12 flex flex-col'>
            <div className='flex justify-between'>
                <img className='w-5 cursor-pointer object-contain' onClick={() => navigate(-1)} src={back} alt="" />
                <h1 className='font-semibold'>FAVORITOS</h1>
                <Options />
            </div>

            <div className='flex flex-col gap-4 mx-40 my-20'>
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
    )
}

export default Favorites 