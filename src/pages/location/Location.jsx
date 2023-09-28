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
import { clearCartInFirestore } from '../../redux/store/cart/cart'
import { collection, addDoc } from 'firebase/firestore';
import { fireStore, auth } from "../../firebase/firebaseConfig.js";
import { useDispatch, useSelector } from "react-redux";

const Location = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const { cartData, total } = location.state || {};
    const userLogged = useSelector((state) => state.auth.userLogged);
    const [showAddAddressForm, setShowAddAddressForm] = useState(false);
    const [newAddress, setNewAddress] = useState('');
    const [addresses, setAddresses] = useState([]);

    const handleAddress = (address) => {
        setSelectedAddress(address);
    };

    const handlePayment = (method) => {
        setSelectedPayment(method);
    };

    const isButtonDisabled = !(selectedAddress && selectedPayment);

    const handleConfirmOrder = async () => {
        const user = auth.currentUser;

        if (!user) {
            console.error("Usuario no autenticado.");
            return;
        }

        const orderData = {
            cartData,
            total,
            selectedAddress,
            selectedPayment,
            nombre: user.displayName || '',
            correo: user.email || '',
            celular: user.phoneNumber || '',
        };

        await clearCartInFirestore();

        try {
            const salesCollection = collection(fireStore, 'ventas');
            await addDoc(salesCollection, orderData);
            const userId = auth.currentUser.uid;
            const userPurchasesCollection = collection(fireStore, 'users', userId, 'compras');
            await addDoc(userPurchasesCollection, {
                orderData: orderData,
                timestamp: new Date(),
            });
            navigate('/confirmation', { state: orderData });
        } catch (error) {
            console.error("Error al guardar los datos de la venta en Firestore:", error);
        }
    };

    const handleAddNewAddress = () => {
        setAddresses([...addresses, newAddress]);
        setSelectedAddress(newAddress);
        setShowAddAddressForm(false);
        setNewAddress('');
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
                            onClick={() => handleAddress(userLogged.address)}
                            className={`container__options py-2 px-5 rounded-md flex gap-2 cursor-pointer ${selectedAddress === userLogged.address ? 'selectedAddress' : ''}`}
                        >
                            <img className='w-4 object-contain' src={loc} alt="" />
                            {userLogged.address}
                        </div>
                        {addresses.map((address, index) => (
                            <div
                                key={index}
                                onClick={() => handleAddress(address)}
                                className={`container__options py-2 px-5 rounded-md flex gap-2 cursor-pointer ${selectedAddress === address ? 'selectedAddress' : ''}`}
                            >
                                <img className='w-4 object-contain' src={loc} alt="" />
                                {address}
                            </div>
                        ))}
                        {showAddAddressForm ? (
                            <div>
                                <input
                                    type="text"
                                    placeholder="Nueva dirección"
                                    value={newAddress}
                                    onChange={(e) => setNewAddress(e.target.value)}
                                />
                                <button onClick={handleAddNewAddress}>Guardar</button>
                            </div>
                        ) : (
                            <div
                                onClick={() => setShowAddAddressForm(true)}
                                className="container__options py-2 px-5 rounded-md flex gap-2 cursor-pointer"
                            >
                                <img className='w-4 object-contain' src={add} alt="" />
                                Agregar otra dirección
                            </div>
                        )}
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
    );
}

export default Location;
