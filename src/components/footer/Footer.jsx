import React, { useState } from 'react';
import './footer.scss';
import homeWhite from "../../assets/homeWhite.png";
import userWhite from "../../assets/userWhite.png";
import comun from "../../assets/comun.png";
import add from "../../assets/addwhite.png";
import history from "../../assets/history.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Footer = () => {
  const navigate = useNavigate();
  const isLogged = useSelector(state => state.auth.isLogged);
  const userRole = useSelector(state => state.auth.userLogged?.role);

  const [isLoggedOrders, setIsLoggedOrders] = useState(false);

  const handleUserClick = () => {
    if (isLogged) {
      if (userRole === 'admin') {
        navigate('/adminProfile');
      } else {
        navigate('/profile');
      }
    } else {
      navigate('/login');
    }
  };

  const handleOrderClick = () => {
    if (isLogged) {
      if (userRole === 'admin') {
        navigate('/adminSales');
      } else {
        navigate('/orders');
      }
    } else {
      setIsLoggedOrders(true);
      setTimeout(() => {
        setIsLoggedOrders('');
      }, 2000);
    }
  };

  const handleHomeClick = () => {
    if (userRole === 'admin') {
      navigate('/admin');
    } else {
      navigate('/products');
    }
  };

  const handleBlogClick = () => {
    if (userRole === 'admin') {
      navigate('/adminProducts');
    } else {
      navigate('/');
    }
  };

  return (
    <div className='footer'>
      <div className='footer__container'>
        <img className='w-5 object-contain' onClick={handleHomeClick} src={homeWhite} alt="" />
        <img className='w-6 object-contain' onClick={handleUserClick} src={userWhite} alt="" />
        <img className='w-4 object-contain' onClick={handleOrderClick} src={history} alt="" />
        {userRole === 'admin' ? (
          <img className='w-4 object-contain' onClick={handleBlogClick} src={add} alt="" />
        ) : (
          <img className='w-4 object-contain' onClick={handleBlogClick} src={comun} alt="" />
        )}
      </div>
      {isLoggedOrders && (
        <div className="favorite-added-message">
          Para ver sus compras debe iniciar sesión
        </div>
      )}
    </div>
  )
}

export default Footer;