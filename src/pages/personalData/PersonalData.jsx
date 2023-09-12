import React from 'react'
import './personalData.scss'
import back from '../../assets/back.png'
import edit from '../../assets/edit.png'
import { useNavigate } from 'react-router';


const PersonalData = () => {
    const navigate = useNavigate();
    return (
        <div className='personal relative flex flex-col items-center'>
            <img className='w-5 absolute left-16 top-16 cursor-pointer' onClick={() => navigate(-1)} src={back} alt="" />
            <div className='container__login m-20 flex flex-col items-center w-[20%] gap-10 py-10 rounded-2xl bg-white'>

                <h1>DATOS PERSONALES</h1>

                <div className='flex flex-col gap-8'>

                <div className='flex justify-between w-60'>
                    <div className='flex gap-2'>
                        <p>Nombre:</p>
                        <p> Camila Sánchez</p>
                    </div>
                    <img className='w-4 object-contain' src={edit} alt="" />
                </div>

                <div className='flex justify-between w-60'>
                    <div className='flex gap-2'>
                        <p>Documento:</p>
                        <p> 985414788</p>
                    </div>
                    <img className='w-4 object-contain' src={edit} alt="" />
                </div>

                <div className='flex justify-between w-60'>
                    <div className='flex gap-2'>
                        <p>Correo:</p>
                        <p>camila@gmail.com</p>
                    </div>
                    <img className='w-4 object-contain' src={edit} alt="" />
                </div>

                <div className='flex justify-between w-60'>
                    <div className='flex gap-2'>
                        <p>Celular:</p>
                        <p>3002525478</p>
                    </div>
                    <img className='w-4 object-contain' src={edit} alt="" />
                </div>

                <div className='flex justify-between w-60'>
                    <div className='flex gap-2'>
                        <p>Dirección:</p>
                        <p> Cra 58 # 21-25 Medellín, Antioquia</p>
                    </div>
                    <img className='w-4 object-contain' src={edit} alt="" />
                </div>


                </div>

            </div>
        </div>
    )
}

export default PersonalData