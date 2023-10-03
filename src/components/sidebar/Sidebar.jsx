import React from 'react'
import home from '../../assets/home.png'
import comunity from '../../assets/comunity.png'
import user from '../../assets/user.png'
import './sidebar.scss'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import sales from '../../assets/sales.png';
import add from '../../assets/addProducts.png';
import admin from '../../assets/adminProfile.png'
import out from "../../assets/logout.png";
import exit from "../../assets/exit.png";
import stock from '../../assets/stock.png'
import { logout } from '../../redux/store/auth/authActions'
import { setSelectedProfileView } from '../../redux/store/admin/adminActions';

const sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { isLogged, userLogged } = useSelector((state) => state.auth);

    const handlePerfilClick = (view) => {
        if (isLogged) {

            navigate('/profile');
        } else {

            navigate('/login');
        }
    };

    const handleMenuItemClick = (view) => {
        dispatch(setSelectedProfileView(view)); 
    };

    return (
        <div>
            <div className="sidebar flex flex-col gap-6">
                <h2 className="products__categories text-[20px] font-semibold">Oasis</h2>
                <ul className="products__ul gap-5">
                    {!isLogged && (
                        <>
                            <li className="flex gap-2 selected" onClick={() => navigate('/products')}>
                                <img className="w-5 object-contain" src={home} alt="" />
                                <p className="products__li">Home</p>
                            </li>
                            <li className="flex gap-2" onClick={() => navigate('/')}>
                                <img className="w-6 object-contain" src={comunity} alt="" />
                                <p className="products__li"> Blog</p>
                            </li>
                            <li className="flex gap-2" onClick={handlePerfilClick}>
                                <img className="w-5 object-contain" src={user} alt="" />
                                <p className="products__li"> Perfil</p>
                            </li>
                        </>
                    )}

                    {isLogged && userLogged && userLogged.role === 'admin' && (
                        <>
                            <li className="flex gap-2" onClick={() => navigate('/adminProfile')}>
                                <img className="w-6 object-contain" src={admin} alt="" />
                                <p className="products__li"> Perfil</p>
                            </li>
                            <li className="flex gap-2"  onClick={() => navigate('/admin')}>
                                <img className="w-6 object-contain" src={stock} alt="" />
                                <p className="products__li"> Productos</p>
                            </li>
                            <li className="flex gap-2" onClick={() => navigate('/adminSales')}>
                                <img className="w-6 object-contain" src={sales} alt="" />
                                <p className="products__li"> Ventas</p>
                            </li>
                            <li className="flex gap-2"  onClick={() => navigate('/adminProducts')}>
                                <img className="w-6 object-contain" src={add} alt="" />
                                <p className="products__li"> Agregar</p>
                            </li>
                            <li className="flex gap-2" onClick={() => {
                                dispatch(logout());
                                navigate("/");
                            }}>
                                <img className="w-6 object-contain" src={exit} alt="" />
                                <p className="products__li">Cerrar sesión</p>
                            </li>
                        </>
                    )}

                    {isLogged && userLogged && userLogged.role === 'client' && (
                        <>
                            <li className="flex gap-2 selected" onClick={() => navigate('/products')}>
                                <img className="w-5 object-contain" src={home} alt="" />
                                <p className="products__li">Home</p>
                            </li>
                            <li className="flex gap-2" onClick={() => navigate('/')}>
                                <img className="w-6 object-contain" src={comunity} alt="" />
                                <p className="products__li"> Blog</p>
                            </li>
                            <li className="flex gap-2" onClick={handlePerfilClick}>
                                <img className="w-5 object-contain" src={user} alt="" />
                                <p className="products__li"> Perfil</p>
                            </li>
                            <li className="flex gap-2" onClick={() => {
                                dispatch(logout());
                                navigate("/");
                            }}>
                                <img className="w-5 object-contain" src={out} alt="" />
                                <p className="products__li">Cerrar sesión</p>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default sidebar;