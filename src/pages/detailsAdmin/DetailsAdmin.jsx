import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../redux/store/products/productsActions';
import Sidebar from '../../components/sidebar/Sidebar';
import { collection, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { fireStore } from '../../firebase/firebaseConfig';



const DetailsAdmin = () => {
  const { id } = useParams();
  console.log('ID from URL:', id);
  const products = useSelector((state) => state.products.items);
  const [selectedImage, setSelectedImage] = useState(null);
  const product = products.find((p) => p.id === parseInt(id));
  const dispatch = useDispatch();

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

  if (!product) {
    return <p>Un momento...</p>;
  }
  return (
    <>
      <Header showSearchBar={false} />
      <div className='details'>
        <Sidebar />
        <div className="details__container">
          <div className="paragraph">
            <span className="details__name fontGreen">COMPOSICIÓN</span>
            <p>{product.text}</p>
          </div>
          <div className="details__photosContainer flex gap-6">
            <img className="photoShow" src={selectedImage || product.gallery.poster} alt={product.name} />

            <div className="details__photos">
              <img
                className="w-[90px] cursor-pointer"
                src={product.gallery.frontPage}
                alt={product.name}
                // onClick={() => handleThumbnailClick(product.gallery.frontPage)}
              />
              <img
                className="w-[90px]  cursor-pointer"
                src={product.gallery.imgTwo}
                alt={product.name}
                // onClick={() => handleThumbnailClick(product.gallery.imgTwo)}
              />
              <img
                className="w-[90px]  cursor-pointer"
                src={product.gallery.imgOne}
                alt={product.name}
                // onClick={() => handleThumbnailClick(product.gallery.imgOne)}
              />
            </div>
          </div>

          <div className="details__info flex flex-col gap-10">
            <div>
              <h2 className="details__name font-semibold">{product.name}</h2>
            </div>
            <p className="fontGreen">{product.title}</p>

            <p>{product.description}</p>

            <div>
              <p>Talla</p>
              <p className="details__size rounded-md p-1 w-8">{product.size}</p>
            </div>

            <button className="button__page px-6 py-1.5 w-[100%]" >Añadir a la bolsa</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DetailsAdmin