import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import loc from '../../assets/location.png';
import add from '../../assets/add.png';
import cash from '../../assets/cash.png';
import creditCardIcon from '../../assets/credit.png';
import './location.scss';
import Sidebar from "../../components/sidebar/Sidebar";
import Paragraph from '../../components/paragraph/Paragraph';
import Header from '../../components/header/Header';
import { clearCartInFirestore } from '../../redux/store/cart/cart'
import { collection, addDoc, query, getDocs, where, doc, updateDoc } from 'firebase/firestore';
import { fireStore, auth } from "../../firebase/firebaseConfig.js";
import { useSelector } from "react-redux";
import Swal from 'sweetalert2';

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
    const [showCreditCardForm, setShowCreditCardForm] = useState(false);
    const [creditCardData, setCreditCardData] = useState({
        cardNumber: '',
        cardName: '',
        cardExpiration: '',
        cardCVC: '',
    });
    const [savedCreditCard, setSavedCreditCard] = useState(null);

    if (!userLogged) {
        return (
          <div>
            <p>Espere un momento...</p>
          </div>
        );
      }

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

    const productsAlreadySold = cartData.some(product => product.sold);

    if (productsAlreadySold) {
            Swal.fire({
            icon: 'error',
            title: 'Producto Vendido',
            text: 'Este producto se encuentra agotado',
        });
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

            for (const product of cartData) {
                const productId = product.id;

                const itemsCollectionRef = collection(fireStore, 'items');
                const itemQuery = query(itemsCollectionRef, where('id', '==', productId));
                const itemQuerySnapshot = await getDocs(itemQuery);

                if (!itemQuerySnapshot.empty) {
                    const itemDoc = itemQuerySnapshot.docs[0];
                    const itemDocRef = doc(fireStore, 'items', itemDoc.id);
                    await updateDoc(itemDocRef, {
                        sold: true,
                    });
                } else {
                    console.error('No se encontró ningún producto con el ID especificado en la colección "items".');
                }
            }

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

    const handleOpenCreditCardForm = () => {
        setShowCreditCardForm(true);
    };

    const handleCloseCreditCardForm = () => {
        setShowCreditCardForm(false);
    };

    const handleCreditCardInputChange = (e) => {
        const { name, value } = e.target;
        setCreditCardData({
            ...creditCardData,
            [name]: value,
        });
    };

    const handleSaveCreditCard = () => {
        const last4Digits = creditCardData.cardNumber.slice(-4);
        setShowCreditCardForm(false);
        setSavedCreditCard(last4Digits);
        setCreditCardData({
            cardNumber: '',
            cardName: '',
            cardExpiration: '',
            cardCVC: '',
        });
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
                            <img className='w-4 object-contain' src={loc} alt='' />
                            {userLogged.address}
                        </div>
                        {addresses.map((address, index) => (
                            <div
                                key={index}
                                onClick={() => handleAddress(address)}
                                className={`container__options py-2 px-5 rounded-md flex gap-2 cursor-pointer ${selectedAddress === address ? 'selectedAddress' : ''}`}
                            >
                                <img className='w-4 object-contain' src={loc} alt='' />
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
                                <img className='w-4 object-contain' src={add} alt='' />
                                Agregar otra dirección
                            </div>
                        )}
                    </div>

                    <div className='flex flex-col gap-8'>
                        <h2 className='font-semibold'>Elige un medio de pago</h2>
                        <div
                            className={`container__options py-2 px-5 rounded-md cursor-pointer flex gap-2 ${selectedPayment === 'Efectivo' ? 'selectedPayment' : ''}`}
                            onClick={() => handlePayment('Efectivo')}
                        >
                            <img className='w-4 object-contain' src={cash} alt='' />Efectivo
                        </div>
                        {savedCreditCard && (
                            <div
                                onClick={() => handlePayment(`Tarjeta de crédito - **** ${savedCreditCard}`)}
                                className={`container__options py-2 px-5 rounded-md cursor-pointer flex gap-2 ${selectedPayment === `Tarjeta de crédito - **** ${savedCreditCard}` ? 'selectedPayment' : ''
                                    }`}
                            >
                                <img className='w-4 object-contain' src={creditCardIcon} alt='' />
                                **** {savedCreditCard}
                            </div>
                        )}
                        <div
                            onClick={handleOpenCreditCardForm}
                            className={`container__options py-2 px-5 rounded-md cursor-pointer flex gap-2 ${selectedPayment === 'Tarjeta de crédito' ? 'selectedPayment' : ''
                                }`}
                        >
                            <img className='w-4 object-contain' src={creditCardIcon} alt='' />
                            Tarjeta de crédito
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

            {showCreditCardForm && (
                <div className='credit-card-form-overlay'>
                    <div className='credit-card-form'>
                        <button className="close-button" onClick={handleCloseCreditCardForm}>
                            X
                        </button>
                        <h2>Ingresa los datos de la tarjeta</h2>

                        <input
                            type='text'
                            name='cardNumber'
                            placeholder='Número de tarjeta'
                            value={creditCardData.cardNumber}
                            onChange={handleCreditCardInputChange}
                        />
                        <input
                            type='text'
                            name='cardName'
                            placeholder='Nombre en la tarjeta'
                            value={creditCardData.cardName}
                            onChange={handleCreditCardInputChange}
                        />
                        <input
                            type='text'
                            name='cardExpiration'
                            placeholder='Fecha de vencimiento (MM/YY)'
                            value={creditCardData.cardExpiration}
                            onChange={handleCreditCardInputChange}
                        />
                        <input
                            type='text'
                            name='cardCVC'
                            placeholder='CVC'
                            value={creditCardData.cardCVC}
                            onChange={handleCreditCardInputChange}
                        />
                        <button className='button__page p-2' onClick={handleSaveCreditCard}>Guardar</button>
                    </div>
                </div>
            )}
        </>
    );
}

export default Location;

