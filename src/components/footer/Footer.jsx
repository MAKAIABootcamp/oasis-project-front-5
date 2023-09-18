import React from 'react'
import './footer.scss'
import homeWhite from "../../assets/homeWhite.png";
import userWhite from "../../assets/userWhite.png";
import comun from "../../assets/comun.png";
import history from "../../assets/history.jpg";
import { useNavigate } from 'react-router-dom';


const Footer = () => {

    const navigate =useNavigate();

  return (
    <div className='footer'>
        <img className='w-5 object-contain' onClick={() => navigate('/')} src={homeWhite} alt="" />
        <img className='w-6 object-contain' onClick={() => navigate('/login')} src={userWhite} alt="" />
        <img className='w-4 object-contain' src={history} alt="" />
        <img className='w-5 object-contain' onClick={() => navigate('/blog')} src={comun} alt="" />
    </div>
  )
}

export default Footer