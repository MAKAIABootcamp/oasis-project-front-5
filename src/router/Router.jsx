import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PublicRouter from "./PrivateRouter";
import PrivateRouter from "./PublicRouter";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { getUserActionFromCollection } from "../redux/store/auth/authActions";
import Home from "../pages/home/Home";
import Products from "../pages/products/Products";
import Location from "../pages/location/Location";
import Details from "../pages/details/Details";
import Profile from "../pages/profile/Profile";
import PersonalData from "../pages/personalData/PersonalData";
import Cart from "../pages/cart/Cart";
import Payment from "../pages/payment/Payment";
import Confirmation from "../pages/confirmation/Confirmation";
import Favorites from "../pages/favorites/Favorites";
import Blog from "../pages/blog/Blog";
import { setError } from "../redux/store/auth/authReducer";
import Swal from "sweetalert2";
import Admin from "../pages/admin/Admin";


const Router = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, userLogged, error } = useSelector((store) => store.auth);
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        if (!userLogged?.id) {
          dispatch(getUserActionFromCollection(uid));
        }
      } else {
        console.log("No hay sesión activa");
      }
    });
  }, [dispatch, userLogged]);
  console.log("en este momento el usuario está: ", isLogged);
  console.log(
    "en este momento este usuario es el que esta logeado: ",
    userLogged
  );

  if (error) {
    Swal.fire(
      "Oops!",
      "Ha occurrido un error " + error.login,
      "error"
    );
  }
  if (error === false) {
    Swal.fire(
      "Excelente",
      "Haz iniciado sesión correctamente",
      "success"
    ).then(() => {
      dispatch(setError(null));
      navigate("/profile");
    });
  }


  return (
    <Routes>
      <Route path="/">
        <Route index element={<Home />} />
        <Route path="products" element={<Products />} />

        <Route path="details/:id" element={<Details />} />
        <Route path="cart" element={<Cart />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="blog" element={<Blog />} />
        <Route path="admin" element={<Admin />} />
        <Route path="location" element={<Location />} />

        {isLogged ? (
          <Route>
            <Route path="profile" element={<Profile />} />
            <Route path="personal" element={<PersonalData />} />
          </Route>
        ) : (
          <Route>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </Route>
        )}
        <Route element={<PublicRouter isAuthenticate={isLogged} />}>
          <Route index element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="products" element={<Products />} />
          <Route path="details" element={<Details />} />
          <Route path="profile" element={<Profile />} />
          <Route path="login" element={<Login />} />
          <Route path="cart" element={<Cart />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="blog" element={<Blog />} />
          <Route path="admin" element={<Admin />} />
          <Route path="location" element={<Location />} />
          <Route path="profile" element={<Profile />} />
          <Route path="personal" element={<PersonalData />} />
        </Route>
        <Route element={<PrivateRouter isAuthenticate={isLogged} />}>
          <Route path="profile" element={<Profile />} />
          <Route path="personal" element={<PersonalData />} />
          <Route path="cart" element={<Cart />} />
          <Route path="location" element={<Location />} />
          <Route path="payment" element={<Payment />} />
          <Route path="confirmation" element={<Confirmation />} />
          <Route path="favorites" element={<Favorites />} />
          <Route path="blog" element={<Blog />} />
          <Route path="admin" element={<Admin />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default Router;
