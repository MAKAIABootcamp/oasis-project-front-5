import React, { useState} from 'react'
import './addProducts.scss'
import Header from '../../components/header/Header'
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './addProducts.scss'
import Swal from 'sweetalert2';
import photo from '../../assets/photo.png'


const AddProducts
    = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { register, handleSubmit } = useForm();
        const { error } = useSelector((store) => store.auth);
        const [fileNames, setFileNames] = useState({
            poster: 'Elige una foto',
            frontPage: 'Elige una foto',
            imgOne: 'Elige una foto',
            imgTwo: 'Elige una foto',
          });


        const itemRegister = async (data) => {
            try {
                const imageFile = data.photoURL[0];
                const avatar = await fileUpload(imageFile);
                const newItem = {
                    ...data,
                    photoURL: avatar,
                };
                console.log(newItem);
                dispatch(createAnItem(newItem));
                Swal.fire("Excelente!", "Haz envíado los datos de tu producto!", "success");
            } catch (error) {
                Swal.fire("Oops!", "Hubo un error en el envío de los datos de tu producto", "error");
            }
        };

        const handleFileChange = (event, fieldName) => {
            const fileName = event.target.files[0]?.name || '';
            setFileNames((prevFileNames) => ({
              ...prevFileNames,
              [fieldName]: fileName,
            }));
          };

        return (
            <div className='addProduct'>
                <Header showSearchBar={false} />
                <div className="products">
                    <div className="products__container">
                        <Sidebar />
                        <div className="flex flex-col items-center text-[14px] relative">
                            <h1 className='title fontGreen mb-10'>NUEVO PRODUCTO</h1>
                            <form className="w-[80%]" onSubmit={handleSubmit(itemRegister)}>
                                <div className="addProduct__dates">
                                    <div className='addProduct__divForm'>
                                        <div className=" flex gap-4">
                                            <label className=" fontGreen w-[150px]">
                                                Nombre:
                                            </label>
                                            <input
                                                type="text"
                                                className="addProduct__input"
                                                {...register("name")}
                                            />
                                        </div>
                                        <div className=" flex gap-4">
                                            <label className=" fontGreen w-[150px]">
                                                Estado:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input "
                                                {...register("status")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen w-[150px]">Categoría:</label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input"
                                                {...register("category")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen w-[150px]">Precio:</label>
                                            <input
                                                type="number"
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
                                                className="border-b addProduct__input"
                                                {...register("color")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[150px]">
                                                Género:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input"
                                                {...register("genre")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[150px]">
                                                Talla:
                                            </label>
                                            <input
                                                type="text"
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
                </div>
            </div>
        )
    }

export default AddProducts