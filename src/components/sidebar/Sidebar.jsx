import React from 'react'
import home from '../../assets/home.png'
import comunity from '../../assets/comunity.png'
import user from '../../assets/user.png'
import './sidebar.scss'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const sidebar = () => {
    const navigate = useNavigate();
    const { isLogged } = useSelector((state) => state.auth); 
    const handlePerfilClick = () => {
        if (isLogged) {
  
            navigate('/profile');
        } else {
           
            navigate('/login');
        }
    };
    return (
        <div>
            <div className="sidebar flex flex-col gap-6">
                <h2 className="products__categories text-[20px] font-semibold">Oasis</h2>
                <ul className="products__ul  gap-5">
                    <li className="flex gap-2 selected" onClick={() => navigate('/products')}>
                        <img className="w-5 object-contain" src={home} alt="" />
                        <p className="products__li">Home</p>
                    </li>
                    <li className="flex gap-2" onClick={() => navigate('/')}>
                        <img className="w-6 object-contain"  src={comunity} alt="" />
                        <p className="products__li"> Blog</p>
                    </li>
                    <li className="flex gap-2" onClick={handlePerfilClick}>
                        <img className="w-5 object-contain" src={user} alt="" />
                        <p className="products__li"> Perfil</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default sidebar