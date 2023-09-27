import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import loc from '../../assets/location.png';
import add from '../../assets/add.png';
import transfer from '../../assets/transfer.png';
import cash from '../../assets/cash.png';
import './location.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Paragraph from '../../components/paragraph/Paragraph';
import Header from '../../components/header/Header';
import {clearCartInFirestore} from '../../redux/store/cart/cart'
import { collection, addDoc } from 'firebase/firestore';
import { fireStore } from "../../firebase/firebaseConfig.js";

const Location = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const { cartData, total } = location.state || {};

    const handleAddress = (address) => {
        setSelectedAddress(address);
    };

    const handlePayment = (method) => {
        setSelectedPayment(method);
    };

    const isButtonDisabled = !(selectedAddress && selectedPayment);

    const handleConfirmOrder = async () => {
        const orderData = {
            cartData,
            total,
            selectedAddress,
            selectedPayment,
        };
        await clearCartInFirestore();
        try {
            const salesCollection = collection(fireStore, 'ventas');
            await addDoc(salesCollection, orderData);
    
            navigate('/confirmation', { state: orderData });
        } catch (error) {
            console.error("Error al guardar los datos de la venta en Firestore:", error);
        }
    };

    return (
        <>
            <Header />
            <div className='location flex flex-col'>
                <h1 className='title self-center'>CONFIRMAR PEDIDO</h1>
                <div className='location__container'>
                    <Sidebar />
                    <Paragraph />
                    <div className='flex flex-col gap-8'>
                        <h2 className='font-semibold'>Elige la dirección de entrega</h2>
                        <div
                            onClick={() => handleAddress('Cra 47 # 16-12 Medellín, Antioquia')}
                            className={`container__options py-2 px-5 rounded-md flex gap-2 cursor-pointer ${selectedAddress === 'Cra 47 # 16-12 Medellín, Antioquia' ? 'selectedAddress' : ''}`}
                        >
                            <img className='w-4 object-contain' src={loc} alt="" />
                            Cra 47 # 16-12
                            Medellín, Antioquia
                        </div>
                        <div
                            onClick={() => handleAddress('Otra dirección')}
                            className={`container__options py-2 px-5 rounded-md flex gap-2 cursor-pointer ${selectedAddress === 'Otra dirección' ? 'selectedAddress' : ''}`}
                        >
                            <img className='w-4 object-contain' src={add} alt="" />
                            Agregar otra dirección
                        </div>
                    </div>

                    <div className='flex flex-col gap-8'>
                        <h2 className='font-semibold'>Elige un medio de pago</h2>
                        <div
                            className={`container__options py-2 px-5 rounded-md cursor-pointer flex gap-2 ${selectedPayment === 'Transferencia' ? 'selectedPayment' : ''}`}
                            onClick={() => handlePayment('Transferencia')}
                        >
                            <img className='w-4 object-contain' src={transfer} alt="" />Transferencia
                        </div>
                        <div
                            className={`container__options py-2 px-5 rounded-md cursor-pointer flex gap-2 ${selectedPayment === 'Efectivo' ? 'selectedPayment' : ''}`}
                            onClick={() => handlePayment('Efectivo')}
                        >
                            <img className='w-4 object-contain' src={cash} alt="" />Efectivo
                        </div>
                    </div>

                    <div className='flex flex-col gap-20'>
                        <div className='flex flex-col gap-2'>
                            <p>El tiempo de entrega es de 4 a 5 días hábiles</p>
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

                        <button
                            className={`button__page px-6 py-1.5 w-[100%] ${isButtonDisabled ? 'disabled' : ''}`}
                            onClick={handleConfirmOrder}
                            disabled={isButtonDisabled}
                        >
                            Confirmar pedido
                        </button>
                    </div>

                </div>
            </div>
        </>
    )
}

export default Location;
