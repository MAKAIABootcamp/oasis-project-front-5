import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, getDocs } from 'firebase/firestore';
import { fireStore, auth } from "../../firebase/firebaseConfig";
import empty from '../../assets/empty.png';
import Header from '../../components/header/Header';
import Sidebar from "../../components/sidebar/Sidebar";
import { useNavigate} from 'react-router-dom';
import './orders.scss'
import Loading from "../../components/loading/Loading";

const Orders = () => {

    const userLogged = useSelector((state) => state.auth.userLogged);
    const [userOrders, setUserOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (!userLogged) {
            return;
        }

        const fetchUserOrders = async () => {
            const userId = auth.currentUser.uid;
            const ordersQuery = query(collection(fireStore, 'users', userId, 'compras'));

            try {
                const querySnapshot = await getDocs(ordersQuery);
                const ordersData = querySnapshot.docs.map((doc) => doc.data());
                setUserOrders(ordersData);
            } catch (error) {
                console.error("Error al obtener los pedidos del usuario:", error);
            }
        };

        fetchUserOrders();
    }, [userLogged]);

    if (!userLogged) {
        return (
            <div>
                <Loading/>
            </div>
        );
    }

    console.log(userOrders)

    return (
        <>
            <Header showSearchBar={false} />
            <div className="favorites flex flex-col ">
                <h1 className="font-semibold self-center"> MIS COMPRAS </h1>
                <div className="favorites__container  flex">
                    <Sidebar />
                    {userOrders.length === 0 ? (
                        <div className='favorites__info w-[100%] cart__infoEmpty flex flex-col items-center gap-4'>
                            <img className='cart__empty flex self-center' src={empty} alt="" />
                            <p className='font-bold text-center'>Aún no has realizado compras  </p>
                            <p className='flex text-center'>¡Aprovecha! Tenemos miles de productos y oportunidades únicas.</p>
                            <button className='button__page cart__button' onClick={() => navigate('/products')}>Ver productos</button>
                        </div>
                    ) : (
                        <div className="favorites__card">
                            {userOrders.map((order, index) => (
                                <div key={index} className='favorites__info flex-wrap'>
                                    {order.orderData.cartData.map((item, itemIndex) => (
                                        <div key={itemIndex} className='flex gap-4'>
                                            <img className='orders__image rounded-md' src={item.poster} alt="" />
                                            <div className='flex flex-col gap-4'>
                                                <span className=' font-semibold'>{item.name}</span>
                                                <div>
                                                    <span className=' font-semibold'>Talla: </span>
                                                    <span>{item.size}</span>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    <div className="orders__info flex flex-col gap-4">
                                        <div>
                                            <span className="font-bold">Fecha: </span>
                                            <span className=' text-gray-400'>
                                                {new Date(order.timestamp.toDate()).toLocaleString()}
                                            </span>
                                        </div>
                                        <div>
                                            <span className="font-bold">Dirección: </span>
                                            <span className=' text-gray-400'>{order.orderData.selectedAddress}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold"> Método de pago: </span>
                                            <span className=' text-gray-400'>{order.orderData.selectedPayment}</span>
                                        </div>
                                        <div>
                                            <span className="font-bold"> Total: </span>
                                            <span className=' text-gray-400'>{order.orderData.total}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default Orders;
