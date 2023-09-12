import React from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../../assets/back.png'
import Options from '../../components/options/Options'
import cash from '../../assets/cash.png'
import location from '../../assets/location.png'
import happy from '../../assets/happy.png'
import ok from '../../assets/ok.png'
import blue from '../../assets/blue.jpg'

const Confirmation = () => {
    const navigate = useNavigate();
    return (
        <div className='mx-20 my-12 flex flex-col'>
            <div className='flex justify-between'>
                <img className='w-5 cursor-pointer object-contain' onClick={() => navigate(-1)} src={back} alt="" />
                <div className='flex gap-4'>
                    <img className='w-5 object-contain' src={happy} alt="" />
                    <h1 className='font-semibold'>PEDIDO REALIZADO CON EXITO</h1>
                    <img className='w-5 object-contain' src={ok} alt="" />
                </div>
                <Options />
            </div>

            <div className='flex mx-40 my-20 justify-between'>

                <div className='flex flex-col gap-8'>
                    <div className='flex flex-col gap-4'>
                        <h2 className='font-semibold'>Detalles de tu compra</h2>
                        <div className='flex gap-6'>
                            <img className='w-40 rounded-md' src={blue} alt="" />
                            <div className='flex flex-col gap-2'>
                                <p className='font-semibold text-[18px]'>$ 15.000</p>
                                <p className='font-semibold'>Blusa blanca de tela suave</p>
                                <p>Talla M</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
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
                </div>

                <div className='flex flex-col justify-between'>

                    <div className='flex flex-col gap-8'>
                        <div className='flex gap-4'>
                            <img className='w-4 object-contain' src={location} alt="" />
                            <div>
                                <p className='font-bold'>Dirección de entrega:</p>
                                <p>Cra 47 # 16-12 Medellín, Antioquia</p>
                            </div>
                        </div>
                        <div className='flex gap-4'>
                            <img className='w-4 object-contain' src={cash} alt="" />
                            <div>
                                <p className='font-bold'>Método de pago:</p>
                                <p>Transferencia</p>
                            </div>
                        </div>
                    </div>

                    <button className="button__page px-6 py-1.5 w-[100%]" onClick={() => navigate('/')}>Volver al inicio</button>

                </div>

            </div>

        </div>
    )
}

export default Confirmation