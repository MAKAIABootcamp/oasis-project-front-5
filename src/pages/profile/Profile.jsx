import React from 'react'
import { logout } from "../../redux/store/auth/authActions";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
// import back from '../../assets/back.png'

const Profile = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
  return (
    <div className='relative m-10 flex flex-col items-center'>
        <button type="button" onClick={() => navigate(-1)}>Atras</button>
        <button onClick={() => dispatch(logout()).then(() => navigate("/"))}>Cerrar sesión</button>
        {/* <img className='w-5 absolute left-5 top' src={back} alt="" /> */}
        <h1>CAMILA SÁNCHEZ</h1>
    </div>
  )
}

export default Profile