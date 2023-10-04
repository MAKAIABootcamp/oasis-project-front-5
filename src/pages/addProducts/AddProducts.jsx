import React from 'react'
import './addProducts.scss'
import Header from '../../components/header/Header'
import Sidebar from "../../components/sidebar/Sidebar";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import './addProducts.scss'

const AddProducts
    = () => {
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const { register, handleSubmit } = useForm();
        const { error } = useSelector((store) => store.auth);


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
                                        <div className="flex gap-4">
                                            <label className=" fontGreen fontGreen">
                                                Nombre:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none"
                                                {...register("name")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen">
                                                Estado:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none"
                                                {...register("status")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen">Categoría:</label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none "
                                                {...register("category")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen">Precio:</label>
                                            <input
                                                type="number"
                                                className="border-b border-gray-300 mb-2 outline-none "
                                                {...register("price")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="  fontGreen">
                                                Color:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none"
                                                {...register("color")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen">
                                                Género:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none"
                                                {...register("genre")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen">
                                                Talla:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none"
                                                {...register("size")}
                                            />
                                        </div>
                                    </div>

                                    <div className='addProduct__divForm'>
                                        <div className="flex gap-4">
                                            <label className="  fontGreen">
                                                Descripción:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none"
                                                {...register("description")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen">
                                                Composición:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none"
                                                {...register("text")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="  fontGreen">
                                                Título:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b border-gray-300 mb-2 outline-none"
                                                {...register("title")}
                                            />
                                        </div>
                                        <div className="file flex gap-4">
                                            <label className="  fontGreen">
                                                Foto 1
                                            </label>
                                            <input
                                                type="file"
                                                className=""
                                                {...register("photoURL")}
                                            />
                                        </div>
                                        <div className="file flex gap-4">
                                            <label className="  fontGreen">
                                                Foto 2
                                            </label>
                                            <input
                                                type="file"
                                                className=""
                                                {...register("photoURL")}
                                            />
                                        </div>
                                        <div className="file flex gap-4">
                                            <label className="fontGreen">
                                                Foto 3
                                            </label>
                                            <input
                                                type="file"
                                                className=""
                                                {...register("photoURL")}
                                            />
                                        </div>
                                        <div className="file flex gap-4">
                                            <label className="fontGreen">
                                                Foto 4
                                            </label>
                                            <input
                                                type="file"
                                                className=""
                                                {...register("photoURL")}
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

export default AddProducts