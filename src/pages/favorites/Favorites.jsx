import React, { useState, useEffect } from 'react';
import bag from '../../assets/bag.png';
import heart from '../../assets/like.png';
import './favorites.scss';
import Header from '../../components/header/Header';
import Sidebar from "../../components/sidebar/Sidebar";
import { collection, getDocs } from 'firebase/firestore';
import { fireStore, auth } from '../../firebase/firebaseConfig';

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
        <div className='favorites__container flex gap-4'>
          <Sidebar />
          <div className='flex gap-6'>
            {favoriteProducts.map((product) => (
              <div key={product.id} className='product-card'>
                <img className='w-40 rounded-md' src={product.gallery.frontPage} alt={product.name} />
                <div className='product-details flex flex-col justify-between'>
                  <div className='flex flex-col gap-2'>
                    <p className='font-semibold text-[18px]'>$ {product.price}</p>
                    <p className='font-semibold'>{product.name}</p>
                    <p>Talla {product.size}</p>
                    <img className='w-5 cursor-pointer object-contain' src={heart} alt="" />
                  </div>

                  <div className='flex gap-2 cursor-pointer items-center'>
                    <img className='w-5 object-contain' src={bag} alt="" />
                    <p className='font-semibold'>Añadir a la bolsa</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Favorites;


