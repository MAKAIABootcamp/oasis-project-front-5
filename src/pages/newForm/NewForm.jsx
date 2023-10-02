import React from "react";
import logo from '../../assets/logo.jpeg'
import back from '../../assets/back.png'
import './newForm.scss'
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import fileUpload from "../../service/fileUpload";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { createAnItem } from "../../redux/store/products/productsActions";

const NewForm = () => {
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
      <div className="register flex flex-col items-center text-[14px] relative">
        <div className="container__login">
  
          <div className="flex flex-col items-center gap-2">
            <div className="back">
              <img className="backArrow " onClick={() => navigate(-1)} src={back} alt="" />
              <div>
                <h1 className="text-[20px]">PRODUCTO A VENDER</h1>
              </div>
            </div>
  
            <img className="w-[26%]" src={logo} alt="" />
          </div>
          <form className="w-[80%]" onSubmit={handleSubmit(itemRegister)}>
            <div className="flex flex-col gap-6">
              <div className="flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  className="border-b border-gray-300 mb-2 outline-none"
                  {...register("name")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Estado (nuevo o usado)
                </label>
                <input
                  type="text"
                  className="border-b border-gray-300 mb-2 outline-none"
                  {...register("status")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 login__label">Precio</label>
                <input
                  type="number"
                  className="border-b border-gray-300 mb-2 outline-none "
                  {...register("price")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Color
                </label>
                <input
                  type="text"
                  className="border-b border-gray-300 mb-2 outline-none"
                  {...register("color")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Descipción
                </label>
                <input
                  type="text"
                  className="border-b border-gray-300 mb-2 outline-none"
                  {...register("description")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Genero
                </label>
                <input
                  type="text"
                  className="border-b border-gray-300 mb-2 outline-none"
                  {...register("genre")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 login__label">Precio</label>
                <input
                  type="number"
                  className="border-b border-gray-300 mb-2 outline-none "
                  {...register("price")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Talla
                </label>
                <input
                  type="text"
                  className="border-b border-gray-300 mb-2 outline-none"
                  {...register("size")}
                />
              </div>
              
              <div className="flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Descripción
                </label>
                <input
                  type="text"
                  className="border-b border-gray-300 mb-2 outline-none"
                  {...register("text")}
                />
              </div>
              <div className="flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Titulo producto
                </label>
                <input
                  type="text"
                  className="border-b border-gray-300 mb-2 outline-none"
                  {...register("title")}
                />
              </div>
              <div className="file flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Foto frente
                </label>
                <input
                  type="file"
                  className="file__box border-b border-gray-300 mb-2 outline-none"
                  {...register("photoURL")}
                />
              </div>
              <div className="file flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Foto atras
                </label>
                <input
                  type="file"
                  className="file__box border-b border-gray-300 mb-2 outline-none"
                  {...register("photoURL")}
                />
              </div>
              <div className="file flex flex-col">
                <label className="text-gray-400 text-[14px]  login__label">
                  Foto de lado
                </label>
                <input
                  type="file"
                  className="file__box border-b border-gray-300 mb-2 outline-none"
                  {...register("photoURL")}
                />
              </div>
              <div className="file">
                <label className="text-gray-400 text-[14px]  login__label">
                  Foto material
                </label>
                <input
                  type="file"
                  className="file__box"
                  {...register("photoURL")}
                />
              </div>
            </div>
            <div className="flex flex-col w-[100%] mt-8 items-center">
              <button type="submit" className="button__login">
                Enviar información
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

export default NewForm