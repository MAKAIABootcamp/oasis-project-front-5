import React from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../../assets/back.png'
import location from '../../assets/location.png'
import add from '../../assets/add.png'
import Options from '../../components/options/Options'
import transfer from '../../assets/transfer.png'
import cash from '../../assets/cash.png'

const Location = () => {
    const navigate = useNavigate();
    return (
        <div className='mx-20 my-12 flex flex-col'>
            <div className='flex justify-between'>
                <img className='w-5 cursor-pointer object-contain' onClick={() => navigate(-1)} src={back} alt="" />
                <h1 className='font-semibold'>CONFIRMAR PEDIDO</h1>
                <Options />
            </div>

            <div className='flex justify-between mx-20 my-[120px]'>

                <div className='flex flex-col gap-8'>
                    <h2 className='font-semibold'>Elige la dirección de entrega</h2>
                    <div className='container__login py-2 px-5 rounded-md flex gap-2 cursor-pointer'>
                        <img className='w-4 object-contain' src={location} alt="" />
                        Cra 47 # 16-12
                        Medellín, Antioquia
                    </div>
                    <div className='container__login py-2 px-5 rounded-md flex gap-2 cursor-pointer'>
                        <img className='w-4 object-contain' src={add} alt="" />
                        Agregar otra dirección
                    </div>
                </div>

                <div className='flex flex-col gap-8'>
                    <h2 className='font-semibold'>Elige un medio de pago</h2>
                    {/* <div className='container__login py-2 px-5 rounded-md cursor-pointer flex gap-2'>
                        <img className='w-4' src={credit} alt="" />Tarjeta de crédito</div>
                    <div className='container__login py-2 px-5 rounded-md cursor-pointer flex gap-2'>
                        <img className='w-4' src={credit} alt="" />Tarjeta débito</div> */}
                    <div className='container__login py-2 px-5 rounded-md cursor-pointer flex gap-2'>
                        <img className='w-4 object-contain' src={transfer} alt="" />Transferencia</div>
                    <div className='container__login py-2 px-5 rounded-md cursor-pointer flex gap-2'>
                        <img className='w-4 object-contain' src={cash} alt="" />Efectivo</div>
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
                    <button className="button__page px-6 py-1.5 w-[100%]" onClick={() => navigate('/confirmation')}>Confirmar pedido</button>
                </div>

            </div>
        </div>
    )
}

export default Location