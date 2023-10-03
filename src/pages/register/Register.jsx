import React, {useState} from "react";
import logo from '../../assets/logo.jpeg'
import back from '../../assets/back.png'
import './register.scss'
import { useNavigate } from "react-router-dom";
import fileUpload from "../../service/fileUpload";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createAnUser } from "../../redux/store/auth/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { error } = useSelector((store) => store.auth);
  const [successMessage, setSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);


  const userRegister = async (data) => {
    try {
      const imageFile = data.photoURL[0];
      const avatar = await fileUpload(imageFile);
      const newUser = {
        ...data,
        photoURL: avatar,
      };
      console.log(newUser);
      dispatch(createAnUser(newUser));
      setSuccessMessage(true);
    } catch (error) {
      setErrorMessage(true);
    }
  };

  return (
    <div className="register flex flex-col items-center text-[14px] relative">
      <div className="container__login register__form">
        <div className="flex flex-col items-center">
          <div className="back">
            <img className="backArrow " onClick={() => navigate(-1)} src={back} alt="" />
            <div>
              <h1 className="text-[20px]">CREAR CUENTA</h1>
            </div>
          </div>
          <img className="w-[26%]" src={logo} alt="" />
        </div>
        <form className="w-[80%] register__form" onSubmit={handleSubmit(userRegister)}>
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="text-gray-400 text-[14px]  login__label">
                Nombre
              </label>
              <input
                type="text"
                className="border-b border-gray-300 mb-2 outline-none"
                {...register("displayName")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 login__label">Correo</label>
              <input
                type="text"
                className="border-b border-gray-300 mb-2 outline-none "
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-[14px]  login__label">
                Contraseña
              </label>
              <input
                type="password"
                className="border-b border-gray-300 mb-2 outline-none"
                {...register("password")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-[14px]  login__label">
                Dirección
              </label>
              <input
                type="text"
                className="border-b border-gray-300 mb-2 outline-none"
                {...register("address")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-[14px]  login__label">
                Celular
              </label>
              <input
                type="text"
                className="border-b border-gray-300 mb-2 outline-none"
                {...register("phoneNumber")}
              />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-[14px]  login__label">
                Foto
              </label>
              <input
                type="file"
                className="border-b border-gray-300 mb-2 outline-none"
                {...register("photoURL")}
              />
            </div>
          </div>
          <div className="flex flex-col w-[100%] mt-8 items-center">
            <button type="submit" className="button__login register__button">
              Crear cuenta
            </button>
          </div>
        </form>
        {successMessage && (
          <div className="login-message">
            <p>Bienvenido</p>
          </div>
        )}

        {errorMessage && (
          <div className="login-message">
            <p>Hubo en error al crear la cuenta</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
