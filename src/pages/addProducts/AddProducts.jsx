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
import { addDoc, collection, doc, getDocs, getFirestore, query, setDoc } from '@firebase/firestore';
import uploadFile from '../../service/uploadFile';

const AddProducts
    = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { register, handleSubmit, reset } = useForm();
        const { error } = useSelector((store) => store.auth);
        const db = getFirestore();
        const itemsCollection = collection(db, 'items');

        const [fileNames, setFileNames] = useState({
            poster: 'Elige una foto',
            frontPage: 'Elige una foto',
            imgOne: 'Elige una foto',
            imgTwo: 'Elige una foto',
        });


        const [imageSelected, setImageSelected] = useState({
            poster: false,
            frontPage: false,
            imgOne: false,
            imgTwo: false,
        });

        const [imageUrls, setImageUrls] = useState({
            poster: '',
            frontPage: '',
            imgOne: '',
            imgTwo: '',
        });

        const posterUrl = imageUrls.poster;
        const frontPageUrl = imageUrls.frontPage;
        const imgOneUrl = imageUrls.imgOne;
        const imgTwoUrl = imageUrls.imgTwo;

        const handleImageUpload = async (fieldName, imageFile) => {
            try {
                const imageUrl = await uploadFile(imageFile);
                setImageUrls((prevImageUrls) => ({
                    ...prevImageUrls,
                    [fieldName]: imageUrl,
                }));
                setImageSelected((prevImageSelected) => ({
                    ...prevImageSelected,
                    [fieldName]: true,
                }));
                return imageUrl;
            } catch (error) {
                console.log(error);
                alert('Error loading images');
                return null;
            }
        };

        const handleFileChange = async (event, fieldName) => {
            const imageFile = event.target.files[0];
            const fileName = imageFile?.name || '';
            setFileNames((prevFileNames) => ({
                ...prevFileNames,
                [fieldName]: fileName,
            }));
            if (imageFile) {
                await handleImageUpload(fieldName, imageFile);
            }
        };

        const onSubmit = async (data) => {

            const querySnapshot = await getDocs(query(itemsCollection));
            const itemCount = querySnapshot.size;
            const nextItemId = itemCount + 1;
            const state = 'Disponible'
            try {

                console.log('URLs de las imágenes:', imageUrls);

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
                    poster: posterUrl,
                    frontPage: frontPageUrl,
                    imgOne: imgOneUrl,
                    imgTwo: imgTwoUrl,


                };


                const newDocRef = doc(itemsCollection);

                await setDoc(newDocRef, newItem);

                console.log('ID del nuevo documento:', newDocRef.id);

                Swal.fire("¡Excelente!", "Has agregado un nuevo producto", "success");
                reset();
            } catch (error) {
                Swal.fire("¡Oops!", "Hubo un error al agregar el producto", "error");
                console.error('Error al agregar el producto:', error);
            }
        };


        return (
            <>
                <Header showSearchBar={false} />
                <div className='addProduct'>
                    <Sidebar />
                    <div className="addProduct__container">
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
                                    <div className="file flex gap-4">
                                        <label className="  fontGreen w-[300px] flex gap-4">
                                            Foto galeria 1:
                                            <input
                                                style={{ display: 'none' }}
                                                type="file"
                                                accept="image/*"
                                                {...register("poster")}
                                                onChange={(e) => handleFileChange(e, 'poster')}
                                            />
                                            <img className='w-5 object-contain' src={photo} alt="" />
                                            <span className='text-gray-500'>{fileNames.poster}</span>
                                        </label>
                                    </div>
                                    <div className="file flex gap-4">
                                        <label className="  fontGreen w-[300px] flex gap-4">
                                            Foto galeria 2:
                                            <input
                                                style={{ display: 'none' }}
                                                type="file"
                                                accept="image/*"
                                                {...register("frontPage")}
                                                onChange={(e) => handleFileChange(e, 'frontPage')}
                                            />
                                            <img className='w-5 object-contain' src={photo} alt="" />
                                            <span className='text-gray-500'>{fileNames.frontPage}</span>
                                        </label>
                                    </div>
                                    <div className="file flex gap-4">
                                        <label className="fontGreen w-[300px] flex gap-4">
                                            Foto galeria 3:
                                            <input
                                                style={{ display: 'none' }}
                                                type="file"
                                                accept="image/*"
                                                {...register("imgOne")}
                                                onChange={(e) => handleFileChange(e, 'imgOne')}
                                            />
                                            <img className='w-5 object-contain' src={photo} alt="" />
                                            <span className='text-gray-500'>{fileNames.imgOne}</span>
                                        </label>
                                    </div>
                                    <div className="file flex gap-4">
                                        <label className="fontGreen w-[300px] flex gap-4">
                                            Foto galeria 4:
                                            <input
                                                style={{ display: 'none' }}
                                                type="file"
                                                accept="image/*"
                                                {...register("imgTwo")}
                                                onChange={(e) => handleFileChange(e, 'imgTwo')}
                                            />
                                            <img className='w-5 object-contain' src={photo} alt="" />
                                            <span className='text-gray-500'>{fileNames.imgTwo}</span>
                                        </label>
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
            </>
        )
    }

export default AddProducts

