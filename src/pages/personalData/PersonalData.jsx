import React, { useEffect, useState } from 'react'
import './personalData.scss'
import back from '../../assets/back.png'
import edit from '../../assets/edit.png'
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';


const PersonalData = () => {
    const navigate = useNavigate();
    const userLogged = useSelector((state) => state.auth.userLogged);

    if (!userLogged) {
        return (
            <div>
                <p>Espere un momento...</p>
            </div>
        );
    }
    return (
        <div className='personal relative flex flex-col items-center'>
            <div className='container__login'>
                <div className="back">
                    <img className="backArrow " onClick={() => navigate(-1)} src={back} alt="" />
                    <div>
                        <h1>DATOS PERSONALES</h1>
                    </div>
                </div>
                <div className='w-20 h-20 rounded-full overflow-hidden'>
                    <img
                        src={userLogged.photoURL}
                        alt='Foto de perfil'
                        className='w-full h-full object-cover'
                    />
                </div>
                <div className='flex flex-col gap-8 p-10'>


                    <div className='flex justify-between w-72'>
                        <div className='flex gap-2'>
                            <p>Nombre:</p>
                            <p>{userLogged.displayName}</p>
                        </div>
                        <img className='w-4 object-contain cursor-pointer' src={edit} alt='' />
                    </div>

                    <hr />
                    <div className='flex justify-between w-72'>
                        <div className='flex gap-2'>
                            <p>Correo:</p>
                            <p>{userLogged.email}</p>

                        </div>
                        <img className='w-4 object-contain cursor-pointer' src={edit} alt="" />
                    </div>
                    <hr />

                    <div className='flex justify-between w-72'>
                        <div className='flex gap-2'>
                            <p>Celular:</p>
                            <p>{userLogged.phoneNumber}</p>
                        </div>
                        <img className='w-4 object-contain cursor-pointer' src={edit} alt="" />
                    </div>
                    <hr />

                    <div className='flex justify-between w-72'>
                        <div className='flex gap-2'>
                            <p>Dirección:</p>
                            <p>{userLogged.address}</p>

                        </div>
                        <img className='w-4 object-contain cursor-pointer' src={edit} alt="" />
                    </div>
                    <hr />


                </div>

            </div>
        </div>
    )
}

export default PersonalData