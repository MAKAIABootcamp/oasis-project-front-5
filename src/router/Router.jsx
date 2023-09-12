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
import Details from "../pages/details/Details";
import Profile from "../pages/profile/Profile";

const Router = () => {
  const dispatch = useDispatch();
  const { isLogged, userLogged } = useSelector((store) => store.auth);
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
  console.log("en este momento el usuario está: ",isLogged);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          <Route element={<PublicRouter isAuthenticate={isLogged} />}>
            {/* <Route index element={<Welcome (?) />} /> */}
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="products" element={<Products />} />
            <Route path="details" element={<Details />} />
            {/* <Route path="login" element={<Login />} /> */}
          </Route>
          <Route element={<PrivateRouter isAuthenticate={isLogged} />}>
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
