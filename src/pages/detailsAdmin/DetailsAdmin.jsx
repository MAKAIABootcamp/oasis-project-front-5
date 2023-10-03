import React, { useEffect, useState } from 'react';
import Header from '../../components/header/Header';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItems } from '../../redux/store/products/productsActions';
import Sidebar from '../../components/sidebar/Sidebar';
import del from '../../assets/delete.png';
import edite from '../../assets/edit.png';
import { collection, doc, setDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { fireStore } from '../../firebase/firebaseConfig';
import './detailsAdmin.scss'


const DetailsAdmin = () => {
    const { id } = useParams();
    console.log('ID from URL:', id);
    const products = useSelector((state) => state.products.items);
    const [selectedImage, setSelectedImage] = useState(null);
    const product = products.find((p) => p.id === parseInt(id));
    const dispatch = useDispatch();
    const [editedItem, setEditedItem] = useState(null);

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
            <div className='details detailsAdmin'>
                <Sidebar />
                <div className="detailsAdmin__container">

                    <div className="detailsAdmin__photosContainer gap-6">
                        <div>
                            <p className='fontGreen flex gap-2 justify-between'>Fotos: <img className='icons' src={edite} alt="" /></p>
                            <img className="detailsAdmin__photoShow" src={selectedImage || product.gallery.poster} alt={product.name} />
                        </div>
                        <div className="detailsAdmin__photos">
                            <img
                                className="w-[70px] cursor-pointer"
                                src={product.gallery.frontPage}
                                alt={product.name}
                            />
                            <img
                                className="w-[70px]  cursor-pointer"
                                src={product.gallery.imgTwo}
                                alt={product.name}
                            />
                            <img
                                className="w-[70px]  cursor-pointer"
                                src={product.gallery.imgOne}
                                alt={product.name}
                            />
                        </div>
                    </div>

                    <div className="details__info flex flex-col gap-4">
                        <div className='detailsAdmin__item'>
                            <span className='fontGreen flex gap-2 justify-between'>Nombre: <img className='icons' src={edite} alt="" /></span>
                            <p>{product.name}</p>
                        </div>
                        <div className='detailsAdmin__item'>
                            <span className='fontGreen flex gap-2 justify-between'>Título: <img className='icons' src={edite} alt="" /></span>
                            <p >{product.title}</p>
                        </div>

                        <div className='detailsAdmin__item'>
                            <span className='fontGreen flex gap-2 justify-between'>Precio: <img className='icons' src={edite} alt="" /></span>
                            <p>{product.price}</p>
                        </div>

                        <div className='detailsAdmin__item'>
                            <p className='fontGreen flex gap-2 justify-between'>Talla: <img className='icons' src={edite} alt="" /></p>
                            <p>{product.size}</p>
                        </div>
                        <div className='detailsAdmin__item'>
                            <p className='fontGreen flex gap-2 justify-between'>Estado: <img className='icons' src={edite} alt="" /></p>
                            <p>{product.status}</p>
                        </div>
                        <div className='detailsAdmin__item'>
                            <p className='fontGreen flex gap-2 justify-between'>Género: <img className='icons' src={edite} alt="" /></p>
                            <p>{product.genre}</p>
                        </div>
                        <div className='detailsAdmin__item'>
                            <p className='fontGreen flex gap-2 justify-between'>Color: <img className='icons' src={edite} alt="" /></p>
                            <p>{product.color}</p>
                        </div>

                    </div>

                    <div className="details__info flex flex-col gap-4">
                    <div className='detailsAdmin__item'>
                            <p className='fontGreen flex gap-2 justify-between'>Estado: <img className='icons' src={edite} alt="" /></p>
                            <p>{product.state}</p>
                        </div>
                        <div className='detailsAdmin__item flex flex-col gap-2'>
                            <p className="fontGreen flex gap-2 justify-between">Composición: <img className='icons' src={edite} alt="" /></p>
                            <p>{product.text}</p>
                        </div>

                        <div className='detailsAdmin__item flex flex-col gap-2'>
                            <p className='fontGreen flex gap-2 justify-between'>Descripcion: <img className='icons' src={edite} alt="" /></p>
                            <p>{product.description}</p>
                        </div>

                        {/* <button className="button__page px-6 py-1.5 w-[100%]" >Guardar cambios</button> */}
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailsAdmin







