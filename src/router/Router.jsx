import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

const Router = () => {
  // const dispatch = useDispatch();
  // const { isLogged, userLogged } = useSelector((store) => store.auth);
  // useEffect(() => {
  //   onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log(user);
  //       if (!userLogged?.id) {
  //         dispatch(getUserActionFromCollection(uid));
  //       }
  //     } else {
  //       console.log("No hay sesión activa");
  //     }
  //   });
  // }, [dispatch, userLogged]);
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/">
          <Route element={<PublicRouter />}> */}
            {/* <Route index element={<Welcome (?) />} /> */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="details" element={<Details />} />
            <Route path="profile" element={<Profile />} />
            <Route path="personal" element={<PersonalData />} />
            <Route path="cart" element={<Cart />} />
            <Route path="location" element={<Location />} />
            <Route path="payment" element={<Payment />} />
            <Route path="confirmation" element={<Confirmation />} />
            {/* <Route path="login" element={<Login />} /> */}
          {/* </Route>
          {/* <Route element={<PrivateRouter isAuthenticate={isLogged} />}>
            <Route path="profile" element={<Profile />} />
        //   </Route> */}
        // {/* </Route> */} 
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
