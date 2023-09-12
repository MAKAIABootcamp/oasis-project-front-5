import React from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../../assets/back.png'
import location from '../../assets/location.png'
import add from '../../assets/add.png'

import Options from '../../components/options/Options'

const Location = () => {
    const navigate = useNavigate();
    return (
        <div className='mx-20 my-12 flex flex-col'>
            <div className='flex justify-between'>
                <img className='w-5 cursor-pointer object-contain' onClick={() => navigate(-1)} src={back} alt="" />
                <h1 className='font-semibold'>Elige la dirección de entrega</h1>
                <Options />
            </div>

            <div className='flex justify-between my-[100px] mx-60'>
                <div className='flex flex-col gap-8'>
                    <div className='container__login p-5 rounded-md flex gap-2 cursor-pointer'>
                        <img className='w-4 object-contain' src={location} alt="" />
                        Cra 47 # 16-12
                        Medellín, Antioquia
                    </div>
                    <div className='container__login p-5 rounded-md flex gap-2 cursor-pointer'>
                        <img className='w-4 object-contain' src={add} alt="" />
                        Agregar otra dirección
                    </div>
                </div>
                <div className='flex flex-col gap-20'>
                    <div className='flex flex-col gap-2'>
                        <p>El tiempo de entrega es de 4 a 5 días hábiles</p>
                        <div className='flex justify-between'>
                            <p>Envío</p>
                            <p>$ 5.000</p>
                        </div>
                        <hr />
                        <div className='flex justify-between font-semibold'>
                            <p>Total</p>
                            <p>20.000</p>
                        </div>
                    </div>
                    <button className="button__page px-6 py-1.5 w-[100%]" onClick={() => navigate('/payment')}>Continuar con el pago</button>
                </div>
            </div>
        </div>
    )
}

export default Location