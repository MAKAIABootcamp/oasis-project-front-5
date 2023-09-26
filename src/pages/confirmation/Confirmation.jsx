import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import cash from '../../assets/cash.png';
import location from '../../assets/location.png';
import happy from '../../assets/happy.png';
import ok from '../../assets/ok.png';
import './confirmation.scss';
import Header from '../../components/header/Header';
import Paragraph from '../../components/paragraph/Paragraph';

const Confirmation = () => {
    const navigate = useNavigate();
    const locationData = useLocation().state || {};
    const { cartData, total, selectedAddress, selectedPayment } = locationData;

    console.log(cartData)

    return (
        <>
            <Header />
            <div className='confirmation flex flex-col items-center'>
                <div className='flex gap-4 '>
                    <img className='w-5 object-contain' src={happy} alt="" />
                    <h1 className='title'>PEDIDO REALIZADO CON ÉXITO</h1>
                    <img className='w-5 object-contain' src={ok} alt="" />
                </div>
                <div className='confirmation__container'>
                    <Paragraph />
                    <div className='flex flex-col gap-8'>
                        <div className='flex flex-col gap-4'>
                            <h2 className='font-semibold'>Detalles de tu compra</h2>
                            {cartData.map((item) => (
                                <div key={item.id} className='flex gap-6'>
                                    <img className='w-20 rounded-md' src={item.gallery.poster} alt="" />
                                    <div className='flex flex-col gap-2'>
                                        <p className='font-semibold text-[18px]'>$ {item.price}</p>
                                        <p className='font-semibold'>{item.name}</p>
                                        <p>Talla {item.size}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className='flex flex-col gap-2'>
                            <div className='flex justify-between'>
                                <p>Envío</p>
                                <p>$ {5000}</p>
                            </div>
                            <hr />
                            <div className='flex justify-between font-semibold'>
                                <p>Total</p>
                                <p>$ {total}</p>
                            </div>
                        </div>
                    </div>
                    <div className='confirmation__info flex flex-col justify-between'>
                        <div className='flex flex-col gap-8'>
                            <div className='flex gap-4'>
                                <img className='w-4 object-contain' src={location} alt="" />
                                <div>
                                    <p className='font-bold'>Dirección de entrega:</p>
                                    <p>{selectedAddress}</p>
                                </div>
                            </div>
                            <div className='flex gap-4'>
                                <img className='w-4 object-contain' src={cash} alt="" />
                                <div>
                                    <p className='font-bold'>Método de pago:</p>
                                    <p>{selectedPayment}</p>
                                </div>
                            </div>
                        </div>
                        <button className="button__page px-6 py-1.5 w-[100%]" onClick={() => navigate('/')}>Volver al inicio</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Confirmation;
