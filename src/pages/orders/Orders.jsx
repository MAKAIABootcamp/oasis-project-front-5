import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { collection, query, getDocs, where } from 'firebase/firestore';
import { fireStore, auth } from "../../firebase/firebaseConfig";
import back from "../../assets/back.png";
import bag from "../../assets/bag.png";
import cash from "../../assets/cash.png";
import './orders.scss'
import { useNavigate } from "react-router-dom";

const Orders = () => {
    const navigate = useNavigate();
    const userLogged = useSelector((state) => state.auth.userLogged);
    const [userOrders, setUserOrders] = useState([]);

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
                <p>Espere un momento...</p>
            </div>
        );
    }
    return (
        <div className="profile relative flex flex-col items-center">
            <div className="container__login">
                <div className="back">
                    <img className="backArrow " onClick={() => navigate(-1)} src={back} alt="" />
                    <div>
                        <h1> MIS COMPRAS </h1>
                    </div>
                </div>
                <div className="order-list">
                {userOrders.map((order, index) => (
                        <div key={index} className='flex justify-between order-item'>
                            <div className='flex gap-5'>
                                <img className="w-20 object-contain" src={order.orderData.cartData[0].gallery.poster} alt="" />
                                <div className='flex flex-col'>
                                <span className='text-[14px] font-semibold'>{order.orderData.cartData[0].name}</span>
                            <span className='text-[14px] text-gray-400'> Total: {order.orderData.total}</span>
                            <span className='text-[14px] text-gray-400'>
                    {new Date(order.timestamp.toDate()).toLocaleString()} 
                </span>

                                </div>
                            </div>
                            <div className='flex gap-2 items-center'>
                                <span className='text-lime-400 text-[10px]'>Finalizado</span>
                                <img className='w-4 object-contain' src={cash} alt="" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Orders;
