import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { login, loginWithEmailAndPassword } from '../../redux/store/auth/authActions';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
import logo from '../../assets/logo.png'
import back from '../../assets/back.png'
import './login.scss'

const Login = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { register, handleSubmit } = useForm();
    const { error } = useSelector((store) => store.auth);

    const goBack = () => {
        navigate('/')
      }

    const signIn = (data) => {
        dispatch(loginWithEmailAndPassword(data));
    }

    if (error) {
        Swal.fire("Oops!", "Ha occurrido un error en el inicio de sesión", "error");
    }
    if (error === false) {
        Swal.fire("Excelente", "Haz iniciado sesión correctamente", "success").then(() => navigate("/profile"));
    }

    const loginWithGoogle = () => {
        dispatch(login());
    };

    return (
        <div className='login flex flex-col items-center text-[14px]'>
            <img className="w-4 absolute top-10 left-20 cursor-pointer" onClick={goBack} src={back} alt="" />
            <div className='container__login flex flex-col items-center my-[5%] w-[20%] gap-16 py-10 rounded-2xl bg-white'>
                <div className='flex flex-col items-center'>
                    <h1 className='text-[20px]'>OASIS</h1>
                    <img src={logo} alt="" />
                </div>
                <form className='w-[80%]' onSubmit={handleSubmit(signIn)}>
                    <div className='flex flex-col gap-6'>
                        <div className='flex flex-col'>
                            <label className='text-gray-400 login__label'>Correo</label>
                            <input className='border-b border-gray-300 mb-2 outline-none' {...register("email")} />
                        </div>
                        <div className='flex flex-col'>
                            <label className='text-gray-400 text-[14px]  login__label'>Contraseña</label>
                            <input className='border-b border-gray-300 mb-2 outline-none' {...register("password")} />
                        </div>
                    </div>

                </form>

                <div className='flex flex-col w-[100%] gap-3 items-center'>
                    <button className='button__login' type="submit">Acceder</button>
                    <button type='button' onClick={loginWithGoogle} className='button__login'>Continuar con google</button>
                    <button className='button__login' onClick={() => navigate('/register')}>Registrarse</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
