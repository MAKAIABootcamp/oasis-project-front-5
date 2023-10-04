import React, { useState } from 'react'
import './addProducts.scss'
import Header from '../../components/header/Header'
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './addProducts.scss'
import Swal from 'sweetalert2';
import photo from '../../assets/photo.png'
import { addDoc, collection, getDocs, getFirestore, query } from '@firebase/firestore';
import filesUpload from '../../service/fileUpload';


const AddProducts
    = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { register, handleSubmit, reset } = useForm();
        const { error } = useSelector((store) => store.auth);
        const db = getFirestore();
        const itemsCollection = collection(db, 'items');
   
        const onSubmit = async (data) => {

            const querySnapshot = await getDocs(query(itemsCollection));
            const itemCount = querySnapshot.size; 
            const nextItemId = itemCount + 1; 
            const state = 'Disponible'
            try {
        
                const newItem = {
                    ...data,
                    id: nextItemId,
                    sold: false,
                    state: state,
                    name: data.name,
                    status: data.status,
                    category: data.category,
                    size: data.size,
                    price: parseFloat(data.price),
                    title: data.title,
                    genre: data.genre,
                    color: data.color,
                    description: data.description,
                    text: data.text,
                    
                };

                const docRef = await addDoc(itemsCollection, newItem);
                console.log('ID del nuevo documento:', docRef.id);

                Swal.fire("¡Excelente!", "Has agregado un nuevo producto", "success");
       reset();
            } catch (error) {
                Swal.fire("¡Oops!", "Hubo un error al agregar el producto", "error");
                console.error('Error al agregar el producto:', error);
            }
        };
        return (
            <div className='addProduct'>
                <Header showSearchBar={false} />
                <div className="products">
                    <div className="products__container">
                        <Sidebar />
                        <div className="flex flex-col items-center text-[14px] relative formAdd">
                            <h1 className='title fontGreen mb-10'>NUEVO PRODUCTO</h1>
                            <form className="w-[80%]" onSubmit={handleSubmit(onSubmit)}>
                                <div className="addProduct__dates">
                                    <div className='addProduct__divForm'>
                                        <div className=" flex gap-4">
                                            <label className=" fontGreen w-[150px]">
                                                Nombre:
                                            </label>
                                            <input
                                              type="text"
                                              id="name"
                                              name="name"
                                              required 
                                              className="addProduct__input"
                                                {...register("name")}
                                         
                                            />
                                        </div>
                                        <div className=" flex gap-4">
                                            <label className=" fontGreen w-[150px]">
                                                Estado:
                                            </label>
                                            <select
                                            id="status"
                                            name="status"
                                            required 
                                                className="border-b addProduct__input"
                                                {...register('status')}
                                            >
                                                <option value="Nuevo">Nuevo</option>
                                                <option value="Usado">Usado</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen w-[150px]">Tipo:</label>
                                            <input
                                                type="text"
                                                id="category"
                                                name="category"
                                                required 
                                                className="border-b addProduct__input"
                                                {...register("category")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen w-[150px]">Precio:</label>
                                            <input
                                                type="number"
                                                id="price"
                                                name="price"
                                                required 
                                                className="border-b addProduct__input"
                                                {...register("price")}
                                            />
                                            
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[150px]">
                                                Color:
                                            </label>
                                            <input
                                                type="text"
                                                id="color"
                                                name="color"
                                                required 
                                                className="border-b addProduct__input"
                                                {...register("color")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[150px]">
                                                Categoría:
                                            </label>
                                            <select
                                                  type="text"
                                                  id="genre"
                                                  name="genre"
                                                  required 
                                                className="border-b addProduct__input"
                                                {...register("genre")}
                                            >
                                             <option value="Hombre">Hombre</option>
                                                <option value="Mujer">Mujer</option>
                                                <option value="Niños">Niños</option>
                                                <option value="Accesorios">Accesorios</option>
                                            </select>
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[150px]">
                                                Talla:
                                            </label>
                                            <input
                                                  type="text"
                                                  id="size"
                                                  name="size"
                                                  required 
                                                className="border-b addProduct__input"
                                                {...register("size")}
                                            />
                                        </div>
                                    </div>

                                    <div className='addProduct__divForm'>
                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[150px]">
                                                Descripción:
                                            </label>
                                            <input
                                             type="text"
                                             id="description"
                                             name="description"
                                             required 
                                                className="border-b addProduct__input"
                                                {...register("description")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[150px]">
                                                Composición:
                                            </label>
                                            <input
                                                  type="text"
                                                  id="text"
                                                  name="text"
                                                  required 
                                                className="border-b addProduct__input"
                                                {...register("text")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[150px]">
                                                Título:
                                            </label>
                                            <input
                                                  type="text"
                                                  id="title"
                                                  name="title"
                                                  required 
                                                className="border-b addProduct__input"
                                                {...register("title")}
                                            />
                                        </div>
                                        
                                    </div>
                                </div>
                                <div className="flex flex-col w-[100%] mt-8 items-center">
                                    <button type="submit" className="button__login fontGreen">
                                        Agregar producto
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </div>
            </div>
        )
    }

export default AddProducts; 