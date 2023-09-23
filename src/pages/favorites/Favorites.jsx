import React, { useState, useEffect } from 'react';
import bag from '../../assets/bag.png';
import heart from '../../assets/like.png';
import './favorites.scss';
import Header from '../../components/header/Header';
import Sidebar from "../../components/sidebar/Sidebar";
import { collection, getDocs } from 'firebase/firestore';
import { fireStore, auth } from '../../firebase/firebaseConfig';
import { Link } from 'react-router-dom';

const Favorites = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const user = auth.currentUser;

    useEffect(() => {
        const fetchFavoriteProducts = async () => {
            if (user) {
                try {
                    const userFavoritesCollection = collection(fireStore, 'users', user.uid, 'favorites');
                    const querySnapshot = await getDocs(userFavoritesCollection);
                    const favoritesData = querySnapshot.docs.map((doc) => doc.data());
                    setFavoriteProducts(favoritesData);
                } catch (error) {
                    console.error("Error al obtener favoritos de Firestore:", error);
                }
            }
        };

        fetchFavoriteProducts();
    }, [user]);

    useEffect(() => {
        localStorage.setItem('favoriteProducts', JSON.stringify(favoriteProducts));
    }, [favoriteProducts]);

    return (
        <>
            <Header />
            <div className='favorites flex flex-col'>
                <h1 className='font-semibold self-center'>FAVORITOS</h1>
                <div className='favorites__container flex'>
                    <Sidebar />
                    <div className='favorites__card'>
                        {favoriteProducts.length === 0 ? (
                            <p>No tienes ningún producto agregado</p>
                        ) : (
                            favoriteProducts.map((product) => (
                                <div key={product.id}>
                                    <div className='favorites__info'>
                                        <p className='favorites__description'>{product.text}</p>
                                        <div className='favorites__dates'>
                                            <Link to={`/details/${product.id}`} className="product-image-link">
                                                <img className='w-[250px] rounded-md' src={product.gallery.frontPage} alt={product.name} />
                                            </Link>
                                            <div className='product-details flex flex-col justify-between'>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='font-semibold text-[18px]'>$ {product.price}</p>
                                                    <p className='font-semibold'>{product.name}</p>
                                                    <p>Talla {product.size}</p>
                                                    <img className='w-5 cursor-pointer object-contain' src={heart} alt="" />
                                                    <p>{product.description}</p>
                                                </div>
                                                <div className='flex gap-2 cursor-pointer items-center'>
                                                    <img className='w-5 object-contain' src={bag} alt="" />
                                                    <p className='font-semibold'>Añadir a la bolsa</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Favorites;


