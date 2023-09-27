import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import PublicRouter from "./PrivateRouter";
import PrivateRouter from "./PublicRouter";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import {
  getUserActionFromCollection,
  getUserRoleActionFromCollection,
} from "../redux/store/auth/authActions";
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
import Footer from "../components/footer/Footer";
import NoFound from "../pages/noFound/NoFound";

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
          // if(!userLogged?.role){
          //   getRoleFromDatabase(uid).then((role) => {
          //     dispatch(getUserRoleActionFromCollection(uid, role));})
          // }
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
    Swal.fire("Oops!", "Ha occurrido un error " + error.login, "error");
  }
  if (error === false) {
    Swal.fire("Excelente", "Haz iniciado sesión correctamente", "success").then(
      () => {
        dispatch(setError(null));
        navigate("/profile");
      }
    );
  }

  return (
    <>
      <Routes>
        <Route path="/">
          {/* Rutas para todos los usuarios */}
          <Route index element={<Blog />} />
          <Route path="details/:id" element={<Details />} />
          <Route path="products" element={<Products />} />
          <Route path="404" element={<NoFound />} />
          {isLogged ? (
            <>
              {/* Rutas para los dos usuarios logeados */}
              <>
                <Route path="personal" element={<PersonalData />} />
                <Route path="profile" element={<Profile />} />
              </>
              {userLogged.role === "admin" ? (
                <>
                  {/* Rutas para los administradores logeados */}
                  <Route path="admin" element={<Admin />} />
                </>
              ) : (
                <>
                  {/* Rutas para los clientes logeados */}
                  <Route path="cart" element={<Cart />} />
                  <Route path="confirmation" element={<Confirmation />} />
                  <Route path="favorites" element={<Favorites />} />
                  <Route path="location" element={<Location />} />
                </>
              )}
            </>
          ) : (
            <>
              {/* Rutas los dos usuarios logeados no pueden ver */}
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </>
          )}
        </Route>
      </Routes>
      <Footer />
    </>
  );
};

export default Router;
