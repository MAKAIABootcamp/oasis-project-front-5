import React, { useEffect, useState } from 'react';
import './details.scss';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../redux/store/products/productsActions';
import Sidebar from '../../components/sidebar/Sidebar';
import { addToFavorites, removeFromFavorites } from '../../redux/store/favorites/favoriteSlice';

const Details = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [selectedImage, setSelectedImage] = useState(null);
  const product = products.find((p) => p.id === parseInt(id));
  const userLogged = useSelector((state) => state.auth.userLogged);
  const userFavorites = useSelector((state) => state.favorites.userFavorites) || [];

  const isFavorite = userFavorites.some((item) => item.id === product.id);

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

  const handleToggleFavorite = () => {
    if (!userLogged) {
      alert('Para agregar un producto a favoritos, debes iniciar sesión.');
      return;
    }

    if (isFavorite) {
      dispatch(removeFromFavorites(product));
    } else {
      dispatch(addToFavorites(product));
    }
  };

  const [heartColor, setHeartColor] = useState('none');

  useEffect(() => {
    setHeartColor(userLogged ? (isFavorite ? 'red' : 'none') : 'none');
  }, [userLogged, isFavorite]);

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

            <div className="details__photos justify-between w-[100%]">
              <img
                className="w-20 cursor-pointer"
                src={product.gallery.frontPage}
                alt={product.name}
                onClick={() => handleThumbnailClick(product.gallery.frontPage)}
              />
              <img
                className="w-20 cursor-pointer"
                src={product.gallery.imgTwo}
                alt={product.name}
                onClick={() => handleThumbnailClick(product.gallery.imgTwo)}
              />
              <img
                className="w-20 cursor-pointer"
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
                <svg
                onClick={handleToggleFavorite}
                className={`heart-icon ${userLogged ? (isFavorite ? 'heart-icon-filled' : '') : ''}`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill={heartColor}
                >
                  <path d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
            <p className="font-semibold">{product.title}</p>

            <p>{product.description}</p>

            <div>
              <p>Talla</p>
              <p className="details__size rounded-md p-1 w-8">{product.size}</p>
            </div>

            <button className="button__page px-6 py-1.5 w-[100%]">Añadir a la bolsa</button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Details;


