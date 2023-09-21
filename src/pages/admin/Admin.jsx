import React from 'react'
import './admin.scss'
import { useNavigate } from 'react-router-dom';
import back from "../../assets/back.png";
import next from "../../assets/next.png";
import bag from "../../assets/bag.png";
import out from "../../assets/logout.png";
import sale from "../../assets/sale.png";
import add from "../../assets/add.png";
import user from '../../assets/user.png'

const Admin = () => {
    const navigate = useNavigate();
    return (
        <div className="admin flex flex-col items-center text-[14px]">
            <div className="container__login">
                <div className="back">
                    <img className="backArrow " onClick={() => navigate(-1)} src={back} alt="" />
                    <div>
                        <h1 className='font-bold'>ADMINISTRADOR</h1>
                    </div>
                </div>

                <div className="flex flex-col gap-6  mb-16 px-10 py-14">
                <div className="flex justify-between cursor-pointer w-60"  onClick={() => navigate("/profile")}>
                        <div className="flex gap-2">
                            
                            <img className="w-4 object-contain" src={user} alt="" />
                            <p>Perfil</p>
                        </div>
                        <img className="w-3 object-contain" src={next} alt="" />
                    </div>

                    <hr />

                    <div className="flex justify-between cursor-pointer w-60">
                        <div className="flex gap-2">
                            <img className="w-4 object-contain" src={sale} alt="" />
                            <p>Ventas</p>
                        </div>
                        <img className="w-3 object-contain" src={next} alt="" />
                    </div>

                    <hr />

                    <div className="flex justify-between cursor-pointer">
                        <div className="flex gap-2">
                            <img className="w-4 object-contain" src={add} alt="" />
                            <p>Agregar nuevo producto</p>
                        </div>
                        <img className="w-3 object-contain " src={next} alt="" />
                    </div>

                    <hr />

                    <div className="flex justify-between cursor-pointer">
                        <div className="flex gap-2">
                            <img className="w-4 object-contain" src={bag} alt="" />
                            <p>Solicitudes</p>
                        </div>
                        <img className="w-3 object-contain" src={next} alt="" />
                    </div>

                    <hr />

                    <div
                        className="flex justify-between cursor-pointer"
                        onClick={() => navigate("/")}>
                        <div className="flex gap-2">
                            <img className="w-4 object-contain" src={out} alt="" />
                            <p>Cerrar sesión</p>
                        </div>
                        <img className="w-3 object-contain" src={next} alt="" />
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Admin