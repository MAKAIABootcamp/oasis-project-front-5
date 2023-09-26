import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../../redux/store/cart/cartSlice';
import del from '../../assets/delete.png';
import './cart.scss';
import Header from '../../components/header/Header';
import Sidebar from '../../components/sidebar/Sidebar';
import { fireStore, auth } from '../../firebase/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate, Link } from 'react-router-dom';

const Cart = () => {
    const [cartProducts, setCartProducts] = useState([]);
    const user = auth.currentUser;
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartProducts = async () => {
            if (user) {
                try {
                    const userCartCollection = collection(fireStore, 'users', user.uid, 'cart');
                    const querySnapshot = await getDocs(userCartCollection);
                    const cartData = querySnapshot.docs.map((doc) => doc.data());
                    setCartProducts(cartData);
                } catch (error) {
                    console.error("Error al obtener cart de Firestore:", error);
                }
            }
        };

        fetchCartProducts();
    }, [user]);

    const envio = 5000;
    const total = cartProducts.reduce((acc, item) => acc + parseFloat(item.price), 0) + envio;

    const handleRemoveFromCart = (productId) => {
        dispatch(removeFromCart({ id: productId }));
    };

    const handleAddToCart = () => {
        const locationState = {
            cartData: cartProducts,
            total,
        };
        navigate('/location', { state: locationState });
    };
    return (
        <>
            <Header />
            <div className="cart flex flex-col">
                <h1 className="title self-center">CARRITO</h1>
                <div className="cart__container">
                    <Sidebar />
                    <div className='cart__card'>
                        {cartProducts.length === 0 ? (
                            <p>Tu carrito está vacío</p>
                        ) : (
                            <div className='cart__item'>
                                {cartProducts.map((item) => (
                                    <div key={item.id} className="cart__info">
                                        <Link to={`/details/${item.id}`} className="product-image-link">
                                            <img className="w-[150px] h-[200px]" src={item.gallery.poster} alt={item.name} />
                                        </Link>
                                        <div className="flex flex-col gap-14">
                                            <div className="flex flex-col gap-4">
                                                <p className="font-semibold">$ {item.price}</p>
                                                <p className="font-semibold">{item.name}</p>
                                                <p>Talla {item.size}</p>
                                                <button
                                                    onClick={() => handleRemoveFromCart(item.id)}
                                                    className="w-5 object-contain cursor-pointer"
                                                >
                                                    <img src={del} alt="Remove" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col gap-4 ">
                            <div className='flex gap-2 justify-between'>
                                <p>Valor de envío</p>
                                <p>$ 5000</p>
                            </div>
                            <div className='flex justify-between'>
                                <div className="flex gap-2">
                                    <p className="font-semibold">Total</p>
                                    <p>(+ envío)</p>
                                </div>
                                <p className="font-semibold">$ {total}</p>
                            </div>
                        </div>
                        <button
                            className="button__page px-6 py-1.5 w-[100%]"
                            onClick={handleAddToCart}
                        >
                            Continuar con la compra
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Cart;
