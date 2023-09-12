import React from 'react'
import './admin.scss'
import { useNavigate } from 'react-router-dom';
import back from "../../assets/back.png";
import { logout } from "../../redux/store/auth/authActions";
import next from "../../assets/next.png";
import bag from "../../assets/bag.png";
import out from "../../assets/logout.png";
import sale from "../../assets/sale.png";
import add from "../../assets/add.png";

const Admin = () => {
    const navigate = useNavigate();
    return (
        <div className="admin flex flex-col items-center text-[14px]">
            <img className="w-4 absolute top-10 left-20 cursor-pointer" onClick={() => navigate(-1)} src={back} alt="" />
            <div className="container__login flex flex-col items-center my-[5%] w-[20%] gap-20 py-10 rounded-2xl bg-white">

                <h1 className='font-bold'>ADMINISTRADOR</h1>

                <div className="flex flex-col gap-6 w-60 mb-16">

                    <div className="flex justify-between cursor-pointer">
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