import React, { useState, useEffect } from 'react';
import bag from '../../assets/bag.png';
import heart from '../../assets/like.png';
import empty from '../../assets/empty.png';
import './favorites.scss';
import Header from '../../components/header/Header';
import Sidebar from "../../components/sidebar/Sidebar";
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { fireStore, auth } from '../../firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/store/cart/cartSlice';

const Favorites = () => {
    const [favoriteProducts, setFavoriteProducts] = useState([]);
    const user = auth.currentUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isRemovedFromFavorites, setIsRemovedFromFavorites] = useState(false);
    const [isAddedToCart, setIsAddedToCart] = useState(false);

    const addToCartHandler = (product) => {
        dispatch(addToCart(product));
        setIsAddedToCart(true);
        setTimeout(() => {
            setIsAddedToCart(false);
        }, 1000);
    };
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

    const removeFromFavorites = async (productId) => {
        try {
            const userFavoritesCollection = collection(fireStore, 'users', user.uid, 'favorites');
            const docRef = doc(userFavoritesCollection, productId.toString());
            await deleteDoc(docRef);

            setFavoriteProducts((prevFavorites) => prevFavorites.filter((product) => product.id !== productId));
            setIsRemovedFromFavorites(true);
            setTimeout(() => {
                setIsRemovedFromFavorites('');
            }, 1000);
        } catch (error) {
            console.error("Error al eliminar de favoritos en Firestore:", error);
        }
    };


    return (
        <>
            <Header showSearchBar={false} />
            <div className={`favorites flex flex-col ${isRemovedFromFavorites ? 'opaque' : ''}`}>
                <h1 className='title self-center'>FAVORITOS</h1>
                <div className='favorites__container flex'>
                    <Sidebar />
                    <div className={`favorites__card `}>
                        {favoriteProducts.length === 0 ? (
                            <div className='favorites__info cart__infoEmpty flex flex-col items-center gap-4'>
                                <img className='cart__empty flex self-center' src={empty} alt="" />
                                <p className='font-bold text-center'>No tienes productos agregados </p>
                                <p className='flex text-center'>¡Aprovecha! Tenemos miles de productos y oportunidades únicas.</p>
                                <button className='button__page cart__button' onClick={() => navigate('/products')}>Ver productos</button>
                            </div>
                        ) : (
                            favoriteProducts.map((product) => (
                                <div key={product.id}>
                                    <div className='favorites__info'>
                                        <p className='favorites__description'>{product.description}</p>
                                        <div className='favorites__dates'>
                                            <Link to={`/details/${product.id}`}>
                                                <img className='w-[150px] h-[200px] rounded-md' src={product.gallery.poster} alt={product.name} />
                                            </Link>
                                            <div className='product-details flex flex-col justify-between'>
                                                <div className='flex flex-col gap-2'>
                                                    <p className='text-[18px]'>$ {product.price}</p>
                                                    <p className='fontGreen'>{product.name}</p>
                                                    <p>Talla {product.size}</p>
                                                    <img className='w-5 cursor-pointer object-contain' src={heart} alt="" onClick={() => removeFromFavorites(product.id)} />
                                                </div>
                                                <div className='flex gap-2 cursor-pointer' onClick={() => addToCartHandler(product)}>
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
            {isRemovedFromFavorites && (
                <div className="favorite-added-message">
                    Se eliminó de favorios
                </div>
            )}
            {isAddedToCart && (
                <div className="favorite-added-message">
                    Se ha agregado al carrito
                </div>
            )}
        </>
    );
};

export default Favorites;


