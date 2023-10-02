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

                    <div className="details__photosContainer flex gap-6">

                        <div>
                            <p className='fontGreen'>Foto pricipal:</p>
                            <img className="photoShow" src={selectedImage || product.gallery.poster} alt={product.name} />
                        </div>
                        <div className="details__photos">
                            <span className='fontGreen'>Otras fotos:</span>
                            <img
                                className="w-[90px] cursor-pointer"
                                src={product.gallery.frontPage}
                                alt={product.name}
                            />
                            <img
                                className="w-[90px]  cursor-pointer"
                                src={product.gallery.imgTwo}
                                alt={product.name}
                            />
                            <img
                                className="w-[90px]  cursor-pointer"
                                src={product.gallery.imgOne}
                                alt={product.name}
                            />
                        </div>
                    </div>

                    <div className="paragraph">
                        <span className="details__name fontGreen">Composición</span>
                        <p>{product.text}</p>
                    </div>

                    <div className="details__info flex flex-col gap-10">
                        <div>
                            <span className='fontGreen'>Nombre:</span>
                            <h2 className="details__name font-semibold">{product.name}</h2>
                        </div>
                        <div>
                            <span className='fontGreen'>Título:</span>
                            <p >{product.title}</p>
                        </div>

                        <div>
                            <span className='fontGreen'>Descripcion:</span>
                            <p>{product.description}</p>
                        </div>

                        <div>
                            <p className='fontGreen'>Talla:</p>
                            <p>{product.size}</p>
                        </div>

                        <button className="button__page px-6 py-1.5 w-[100%]" >Guardar cambios</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsAdmin