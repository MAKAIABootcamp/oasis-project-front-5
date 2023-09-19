import React, { useEffect, useState } from 'react'
import heart from '../../assets/heart.png'
import './details.scss'
import Header from '../../components/header/Header'
import { useLocation, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../../redux/store/products/productsActions'
import Sidebar from "../../components/sidebar/Sidebar";

const Details = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
    const selectedCategory = useSelector((state) => state.products.selectedCategory);
    const [selectedImage, setSelectedImage] = useState(null);

    const location = useLocation();
    const isDetailsPage = location.pathname.startsWith('/details'); // Verificar si estamos en la página de detalles

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchItems());
        }
    }, [dispatch, products]);

    const product = products.find((p) => p.id === parseInt(id));
    console.log('Producto:', product);

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

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    return (
        <>
            <Header showSearchBar={false} />
            <div className="details">
                <Sidebar />
                <div className="details__container">
                   <div className="paragraph" style={{ textAlign: 'justify' }}>
                        <span className='details__name font-semibold'>COMPOSICIÓN</span>
                        <p>
                            {product.text}
                        </p>
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
                            <h2 className='details__name font-semibold'>{product.name}</h2>
                            <div className="flex justify-between">
                                <p className='details__price'> $ {product.price}</p>
                                <img className="w-5 object-contain cursor-pointer" src={heart} alt="" />
                            </div>
                        </div>

                        <p className='font-semibold'>{product.title}</p>

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
    )
}

export default Details

