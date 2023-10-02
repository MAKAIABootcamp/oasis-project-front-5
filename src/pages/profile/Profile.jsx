import React from "react";
import { logout } from "../../redux/store/auth/authActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import back from "../../assets/back.png";
import user from "../../assets/user.png";
import next from "../../assets/next.png";
import bag from "../../assets/bag.png";
import out from "../../assets/logout.png";
import home from "../../assets/home.png";
import "./profile.scss";

const Profile = () => {
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
        <img className="backArrow back" onClick={() => {
          if (userLogged && userLogged.role === "admin") {
            navigate('/admin');
          } else {
            navigate('/products');
          }
        }} src={back} alt="" />
        <div>
          <h1 className="text-[18px] flex self-center">{userLogged.displayName}</h1>
        </div>
        <div className='w-20 h-20 rounded-full overflow-hidden'>
          <img
            src={userLogged.photoURL}
            alt='Foto de perfil'
            className='w-full h-full object-cover'
          />
        </div>
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
          <div className="flex justify-between cursor-pointer" onClick={() => navigate("/orders")}>
            <div className="flex gap-2">
              <img className="w-4 object-contain" src={bag} alt="" />
              <p>Mis compras</p>
            </div>
            <img className="icons" src={next} alt="" />
          </div>

          <hr />

          <div className="flex justify-between cursor-pointer" onClick={() => navigate("/products")}>
            <div className="flex gap-2">
              <img className="w-4 object-contain" src={home} alt="" />
              <p>Home</p>
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
