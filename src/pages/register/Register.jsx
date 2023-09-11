import React from "react";
// import logo from '../../assets/logo.png'
// import './register.scss'

const Register = () => {
  return (
    <div className="register flex flex-col items-center text-[14px]">
      <button type="button" onClick={() => navigate(-1)}>Atras</button>
      <div className="container__login flex flex-col items-center my-[5%] w-[20%] gap-8 py-10 rounded-2xl bg-white">
        <div className="flex flex-col items-center">
          <h1 className="text-[20px]">CREAR CUENTA</h1>
          {/* <img src={logo} alt="" /> */}
        </div>
        <form className="w-[80%]">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col">
              <label className="text-gray-400 text-[14px]  login__label">
                Nombre
              </label>
              <input className="border-b border-gray-300 mb-2 outline-none" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 login__label">Correo</label>
              <input className="border-b border-gray-300 mb-2 outline-none " />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-[14px]  login__label">
                Contraseña
              </label>
              <input className="border-b border-gray-300 mb-2 outline-none" />
            </div>
            <div className="flex flex-col">
              <label className="text-gray-400 text-[14px]  login__label">
                Dirección
              </label>
              <input className="border-b border-gray-300 mb-2 outline-none" />
            </div>
          </div>
        </form>
        <div className="flex flex-col w-[100%] gap-3 items-center">
          <button className="button__login">Crear cuenta</button>
        </div>
      </div>
    </div>
  );
};

export default Register;
