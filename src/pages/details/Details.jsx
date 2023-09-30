import React, { useEffect, useState } from 'react';
import './details.scss';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../redux/store/products/productsActions';
import Sidebar from '../../components/sidebar/Sidebar';
import { addToFavorites, removeFromFavorites } from '../../redux/store/favorites/favoriteSlice';
import { addToCart } from '../../redux/store/cart/cartSlice';
import heart from '../../assets/heart.png';
import like from '../../assets/like.png';
import Swal from 'sweetalert2';
import { collection, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { fireStore } from '../../firebase/firebaseConfig';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [selectedImage, setSelectedImage] = useState(null);
  const product = products.find((p) => p.id === parseInt(id));
  const userLogged = useSelector((state) => state.auth.userLogged);
  const userFavorites = useSelector((state) => state.favorites.userFavorites) || [];
  const isFavorite = userFavorites.some((item) => item.id === product.id);
  //const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    if (userLogged) {
      const userFavoritesCollection = collection(fireStore, 'users', userLogged.id, 'favorites');
      const productDocRef = doc(userFavoritesCollection, product.id.toString());
        getDoc(productDocRef)
        .then((docSnapshot) => {
          if (docSnapshot.exists()) {
            dispatch(addToFavorites(product));
          }
        })
        .catch((error) => {
          console.error('Error al cargar datos de favoritos desde Firestore:', error);
        });
    }
  }, [userLogged, product, dispatch]);
  
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchItems());
    }
  }, [dispatch, products]);

  useEffect(() => {
    if (id) {
      const existingProduct = products.find((p) => p.id === parseInt(id));
      if (!existingProduct) {
        dispatch(fetchItems());
      }
    }
  }, [dispatch, id, products]);

  const toggleFavoriteInFirestore = async () => {
    if (!userLogged) {
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión',
        text: 'Para agregar a favoritos debes registrarte o iniciar sesión',
      });
      return;
    }

   const userFavoritesCollection = collection(fireStore, 'users', userLogged.id, 'favorites');
   const productDocRef = doc(userFavoritesCollection, product.id.toString());

    try {
      if (isFavorite) {
        await deleteDoc(productDocRef);
        dispatch(removeFromFavorites(product));
      } else {
        await setDoc(productDocRef, {
          id: product.id,
          name: product.name,
        });
     setIsFavorite(true);
        dispatch(addToFavorites(product));
      }
    } catch (error) {
      console.error('Error al agregar/quitar de favoritos en Firestore:', error);
    }
  }

  const handleToggleFavorite = () => {
    toggleFavoriteInFirestore();
  }

  const handleAddToCart = () => {
    if (!userLogged) {
      Swal.fire({
        icon: 'info',
        title: 'Inicia sesión',
        text: 'Para agregar un producto al carrito, debes iniciar sesión.',
      });
      return;
    }
    dispatch(addToCart(product));
  };

  const handleThumbnailClick = (image) => {
    setSelectedImage(image);
  };

  if (!product) {
    return <p>Un momento...</p>;
  }

  return (
    <>
      <Header showSearchBar={false} />
      <div className="details">
        <Sidebar />
        <div className="details__container">
          <div className="paragraph" style={{ textAlign: 'justify' }}>
            <span className="details__name font-semibold">COMPOSICIÓN</span>
            <p>{product.text}</p>
          </div>
          <div className="details__photosContainer flex gap-6">
            <img className="w-80" src={selectedImage || product.gallery.poster} alt={product.name} />

            <div className="details__photos">
              <img
                className="w-[80%] cursor-pointer"
                src={product.gallery.frontPage}
                alt={product.name}
                onClick={() => handleThumbnailClick(product.gallery.frontPage)}
              />
              <img
                className="w-[80%]  cursor-pointer"
                src={product.gallery.imgTwo}
                alt={product.name}
                onClick={() => handleThumbnailClick(product.gallery.imgTwo)}
              />
              <img
                className="w-[80%]  cursor-pointer"
                src={product.gallery.imgOne}
                alt={product.name}
                onClick={() => handleThumbnailClick(product.gallery.imgOne)}
              />
            </div>
          </div>

          <div className="details__info flex flex-col justify-between">
            <div>
              <h2 className="details__name font-semibold">{product.name}</h2>
              <div className="flex justify-between">
                <p className="details__price">$ {product.price}</p>
                {userLogged ? (
                  <img
                    src={isFavorite ? like : heart}
                    alt=""
                    onClick={handleToggleFavorite}
                    className='heart-icon'
                  />
                ) : (
                  <img
                    src={heart}
                    alt=""
                    onClick={handleToggleFavorite}
                    className='heart-icon'
                  />
                )}
              </div>
            </div>
            <p className="font-semibold">{product.title}</p>

            <p>{product.description}</p>

            <div>
              <p>Talla</p>
              <p className="details__size rounded-md p-1 w-8">{product.size}</p>
            </div>

            <button className="button__page px-6 py-1.5 w-[100%]" onClick={handleAddToCart}>Añadir a la bolsa</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;
