import React from "react";
import { logout } from "../../redux/store/auth/authActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import back from "../../assets/back.png";
import user from "../../assets/user.png";
import next from "../../assets/next.png";
import cash from "../../assets/cash.png";
import bag from "../../assets/bag.png";
import out from "../../assets/logout.png";
import sale from "../../assets/sale.png";
import "./profile.scss";

const Profile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="profile relative flex flex-col items-center">
      <img className="backArrow login__back" onClick={() => navigate('/')} src={back} alt="" />
      <div className="container__login">
        <h1 className="profile__name">CAMILA SÁNCHEZ</h1>
        <div className="flex flex-col gap-6 p-10">
          <hr />
          <div
            className="flex justify-between cursor-pointer w-60"
            onClick={() => navigate("/personal")}
          >
            <div className="flex gap-2">
              <img className="w-4 object-contain" src={user} alt="" />
              <p>Datos personales</p>
            </div>
            <img className="icons" src={next} alt="" />
          </div>

          <hr />

          <div className="flex justify-between cursor-pointer">
            <div className="flex gap-2">
              <img className="w-4 object-contain" src={cash} alt="" />
              <p>Métodos de pago</p>
            </div>
            <img className="icons" src={next} alt="" />
          </div>

          <hr />

          <div className="flex justify-between cursor-pointer">
            <div className="flex gap-2">
              <img className="w-4 object-contain" src={bag} alt="" />
              <p>Mis compras</p>
            </div>
            <img className="icons" src={next} alt="" />
          </div>

          <hr />

          <div className="flex justify-between cursor-pointer">
            <div className="flex gap-2">
              <img className="w-4 object-contain" src={sale} alt="" />
              <p>Mis ventas</p>
            </div>
            <img className="icons" src={next} alt="" />
          </div>

          <hr />

          <div
            className="flex justify-between cursor-pointer"
            onClick={() => {
              dispatch(logout());
              navigate("/");
            }}
          >
            <div className="flex gap-2">
              <img className="w-4 object-contain" src={out} alt="" />
              <p>Cerrar sesión</p>
            </div>
            <img className="icons" src={next} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
