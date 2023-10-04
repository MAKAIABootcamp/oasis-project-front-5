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
                                        <div className=" flex gap-4">
                                            <label className=" fontGreen w-[100px]">
                                                Nombre:
                                            </label>
                                            <input
                                                type="text"
                                                className="addProduct__input"
                                                {...register("name")}
                                            />
                                        </div>
                                        <div className=" flex gap-4">
                                            <label className=" fontGreen w-[100px]">
                                                Estado:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input "
                                                {...register("status")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen w-[100px]">Categoría:</label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input"
                                                {...register("category")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className=" fontGreen w-[100px]">Precio:</label>
                                            <input
                                                type="number"
                                                className="border-b addProduct__input"
                                                {...register("price")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[100px]">
                                                Color:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input"
                                                {...register("color")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[100px]">
                                                Género:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input"
                                                {...register("genre")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[100px]">
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
                                            <label className="  fontGreen w-[100px]">
                                                Descripción:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input"
                                                {...register("description")}
                                            />
                                        </div>

                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[100px]">
                                                Composición:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input"
                                                {...register("text")}
                                            />
                                        </div>
                                        <div className="flex gap-4">
                                            <label className="  fontGreen w-[100px]">
                                                Título:
                                            </label>
                                            <input
                                                type="text"
                                                className="border-b addProduct__input"
                                                {...register("title")}
                                            />
                                        </div>
                                        <div className="file flex gap-4">
                                            <label className="  fontGreen w-[100px]">
                                                Foto 1
                                            </label>
                                            <input
                                                type="file"
                                                className=""
                                                {...register("poster")}
                                            />
                                        </div>
                                        <div className="file flex gap-4">
                                            <label className="  fontGreen w-[100px]">
                                                Foto 2
                                            </label>
                                            <input
                                                type="file"
                                                className=""
                                                {...register("frontPage")}
                                            />
                                        </div>
                                        <div className="file flex gap-4">
                                            <label className="fontGreen w-[100px]">
                                                Foto 3
                                            </label>
                                            <input
                                                type="file"
                                                className=""
                                                {...register("imgOne")}
                                            />
                                        </div>
                                        <div className="file flex gap-4">
                                            <label className="fontGreen w-[100px]">
                                                Foto 4
                                            </label>
                                            <input
                                                type="file"
                                                className=""
                                                {...register("imgTwo")}
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