import React from "react";
import logo from '../../assets/logo.jpeg'
import back from '../../assets/back.png'
import './register.scss'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import fileUpload from "../../service/fileUpload";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createAnUser } from "../../redux/store/auth/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const { error } = useSelector((store) => store.auth);

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
      //Swal.fire("Excelente!", "Haz creado tu cuenta!", "success");
    } catch (error) {
      //Swal.fire("Oops!", "Hubo un error en la creación de tu cuenta", "error");
    }
  };

  if (error) {
    Swal.fire("Oops!", "Hubo un error en la creación de tu cuenta", "error");
  }
  if (error === false) {
    Swal.fire("Excelente!", "Haz creado tu cuenta!", "success").then(() =>
      navigate("/profile")
    );
  }

  return (
    <div className="register flex flex-col items-center text-[14px] relative">
      <img
        className="w-4 absolute top-10 left-20 cursor-pointer"
        onClick={() => navigate(-1)}
        src={back}
        alt=""
      />
      <div className="container__login flex flex-col items-center my-[5%] w-[20%] gap-8 py-10 rounded-2xl bg-white">
        <div className="flex flex-col items-center gap-2">
          <h1 className="text-[20px]">CREAR CUENTA</h1>
          <img className="w-[26%]" src={logo} alt="" />
        </div>
        <form className="w-[80%]" onSubmit={handleSubmit(userRegister)}>
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
                Foto
              </label>
              <input
                type="file"
                className="border-b border-gray-300 mb-2 outline-none"
                {...register("photoURL")}
              />
            </div>
          </div>
          <div className="flex flex-col w-[100%] gap-3 items-center">
            <button type="submit" className="button__login">
              Crear cuenta
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
