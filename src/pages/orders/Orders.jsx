import React from "react";
import { logout } from "../../redux/store/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import back from "../../assets/back.png";
import user from "../../assets/user.png";
import next from "../../assets/next.png";
import cash from "../../assets/cash.png";
import bag from "../../assets/bag.png";
import out from "../../assets/logout.png";
import sale from "../../assets/sale.png";
import './orders.scss'

const Orders = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userLogged = useSelector((state) => state.auth.userLogged);

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
                {/* <div className='w-20 h-20 rounded-full overflow-hidden'>
          <img
            src={userLogged.photoURL}
            alt='Foto de perfil'
            className='w-full h-full object-cover'
          />
        </div> */}
                <div className='flex justify-between order-item'>
                    <div className='flex gap-5'>
                        <img className="w-40 object-contain" src={bag} alt="" />
                        <div className='flex flex-col'>
                            <span className='text-[14px] font-semibold'>{userLogged.displayName}</span>
                            <span className='text-[14px] text-gray-400'>{userLogged.displayName}</span>
                        </div>
                    </div>
                    <div className='flex gap-2 items-center'>
                        <span className='text-lime-400 text-[10px]'>Finalizado</span>
                        <img className=' w-4 object-contain' src={cash} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Orders;

