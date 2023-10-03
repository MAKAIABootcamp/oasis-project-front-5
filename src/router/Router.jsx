import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import { auth } from "../firebase/firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { onAuthStateChanged } from "firebase/auth";
import { getUserActionFromCollection } from "../redux/store/auth/authActions";
import Products from "../pages/products/Products";
import Location from "../pages/location/Location";
import Details from "../pages/details/Details";
import Profile from "../pages/profile/Profile";
import PersonalData from "../pages/personalData/PersonalData";
import Cart from "../pages/cart/Cart";
import Confirmation from "../pages/confirmation/Confirmation";
import Favorites from "../pages/favorites/Favorites";
import Blog from "../pages/blog/Blog";
import { setError } from "../redux/store/auth/authReducer";
import Swal from "sweetalert2";
import Footer from "../components/footer/Footer";
import Orders from "../pages/orders/Orders";
import AdminPanel from "../pages/adminPanel/AdminPanel";
import DetailsAdmin from "../pages/detailsAdmin/DetailsAdmin";
import AdminProfile from "../pages/adminProfile/AdminProfile";
import Sales from "../pages/sales/Sales";
import AddProducts from "../pages/addProducts/AddProducts";
import Requests from "../pages/requests/Requests";

const Router = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, userLogged, error } = useSelector((store) => store.auth);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        console.log(user);
        if (!userLogged?.id) {
          dispatch(getUserActionFromCollection(uid));
        }
        setIsAdmin(userLogged?.role === "admin");
      } else {
        console.log("No hay sesión activa");
        setIsAdmin(false);
      }
    });
  }, [dispatch, userLogged]);

  console.log("en este momento el usuario está: ", isLogged);
  console.log("en este momento este usuario es el que esta logeado: ", userLogged);

  if (error) {
    Swal.fire(
      "Oops!",
      "Ha ocurrido un error " + error.login,
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
      
      if (userLogged?.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/profile");
      }
    });
  }
  

 
  return (
    <>
      <Routes>
        <Route path="/" element={<Blog />} />
        <Route path="details/:id" element={<Details />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="products" element={<Products />} />
        <Route path="cart" element={<Cart />} />
        <Route path="confirmation" element={<Confirmation />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="location" element={<Location />} />
        
        {isAdmin && (
          <Route path="admin" element={<AdminPanel />} />
        )}
        
        {isLogged ? (
          <>
            <Route path="profile" element={<Profile />} />
            <Route path="personal" element={<PersonalData />} />
            <Route path="orders" element={<Orders />} />

            {isAdmin ? (
              <>
          <Route path="admin-details/:id" element={<DetailsAdmin />} />
          <Route path="adminProfile" element={<AdminProfile />} />
          <Route path="adminSales" element={<Sales />} />
          <Route path="adminProducts" element={<AddProducts />} />
          <Route path="adminRequests" element={<Requests />} />




</>
              
            ) : null}
          </>
        ) : (
          <>
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
          </>
        )}
        
        </Routes>
        <Footer />

    </>
  );
};

export default Router;
