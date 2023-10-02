import React from 'react'
import './footer.scss'
import homeWhite from "../../assets/homeWhite.png";
import userWhite from "../../assets/userWhite.png";
import comun from "../../assets/comun.png";
import history from "../../assets/history.jpg";
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Swal from 'sweetalert2';


const Footer = () => {

  const navigate = useNavigate();
  const isLogged = useSelector (state => state.auth.isLogged)

  const handleUserClick = () => {
    if (isLogged) {
      navigate('/profile');
    }  else {
    navigate('/login')
  }
}; 


const handleOrderClick = () => {
  if (isLogged) {
    navigate('/orders');
  }  else {
    if (!isLogged) {
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión',
        text: 'Para ver tu historial de compras, debes iniciar sesión.',
      });
      return;
    }
}
}; 

  return (
    <div className='footer'>
      <div className='footer__container'>
        <img className='w-5 object-contain' onClick={() => navigate('/products')} src={homeWhite} alt="" />
        <img className='w-6 object-contain'  onClick={handleUserClick} src={userWhite} alt="" />
        <img className='w-4 object-contain' onClick={handleOrderClick} src={history} alt="" />
        <img className='w-5 object-contain' onClick={() => navigate('/')} src={comun} alt="" />
      </div>
    </div>
  )
}

export default Footer;