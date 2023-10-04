import React, { useState, useEffect } from 'react';
import './userRequests.scss';
import Header from '../../components/header/Header';
import Sidebar from "../../components/sidebar/Sidebar";
import { collection, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { fireStore, auth } from '../../firebase/firebaseConfig';
import empty from '../../assets/empty.png';
import { useNavigate } from 'react-router-dom';
import bag from '../../assets/bag.png';
import heart from '../../assets/like.png';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/store/cart/cartSlice';

const UserRequests = () => {
    const [userRequests, setUserRequests] = useState([]);
    const user = auth.currentUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserRequests = async () => {
            if (user) {
                try {
                    const userRequestsCollection = collection(fireStore, 'users', user.uid, 'solicitudes');
                    const querySnapshot = await getDocs(userRequestsCollection);
                    const requestsData = querySnapshot.docs.map((doc) => doc.data());
                    setUserRequests(requestsData);
                } catch (error) {
                    console.error("Error al obtener solicitudes de Firestore:", error);
                }
            }
        };
        fetchUserRequests();
    }, [user]);

    const removeFromRequests = async (requestId) => {
        try {
            const userRequestsCollection = collection(fireStore, 'users', user.uid, 'solicitudes');
            const requestDocRef = doc(userRequestsCollection, requestId);
            await deleteDoc(requestDocRef);
            setUserRequests(userRequests.filter((request) => request.id !== requestId));
        } catch (error) {
            console.error("Error al eliminar la solicitud:", error);
        }
    };

    return (
        <>
            <Header showSearchBar={false} />
            <div className='requests flex flex-col'>
                <h1 className='title self-center'>SOLICITUDES</h1>
                <div className='requests__container flex'>
                    <Sidebar />
                    <div className='requests__card'>
                        {userRequests.length === 0 ? (
                            <div className='requests__info cart__infoEmpty flex flex-col items-center gap-4'>
                                <img className='cart__empty flex self-center' src={empty} alt="" />
                                <p className='font-bold text-center'>No tienes solicitudes...</p>
                                <p className=' flex text-center'>¿Quieres darle una segunda oportunidad a tus prendas?</p>
                                <p className=' flex text-center'> ¡Haz una solicitud!</p>
                                <button className='button__page cart__button' onClick={() => navigate('/requests')}>Solicitar</button>
                            </div>
                        ) : (
                            userRequests.map((request) => (
                                <div key={request.id}>
                                    <div className='requests__info'>
                                        <p className='requests__description'>{request.description}</p>
                                        <div className='requests__dates'>
                                        <p>Fecha de solicitud: {new Date(request.fecha).toLocaleDateString()}</p>
                                        <div className='product-details flex flex-col justify-between'>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[18px]'>$ {request.price}</p>
                                                    <p className='fontGreen'>{request.name}</p>
                                                    <p>Talla {request.size}</p>
                                                    {/* <img className='w-5 cursor-pointer object-contain' src={heart} alt="" onClick={() => removeFromFavorites(product.id)} /> */}
                                                </div>
                                                {/* <div className='flex gap-2 cursor-pointer' onClick={() => addToCartHandler(product)}>
                                                    <img className='w-5 object-contain' src={bag} alt="" />
                                                    <p className='font-semibold'>Añadir a la bolsa</p>
                                                </div> */}
                                            </div>
                                        </div>
                                        {/* Agrega la lógica para eliminar la solicitud */}
                                        {/* <button onClick={() => removeFromRequests(request.id)}>Eliminar</button> */}
                                    </div>
                                    <button className='button__page cart__button' onClick={() => navigate('/requests')}> Agregar Solicitud </button>

                                </div>
                                
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserRequests;
