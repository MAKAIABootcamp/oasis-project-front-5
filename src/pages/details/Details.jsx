import React, { useEffect } from 'react'
import heart from '../../assets/heart.png'
import './details.scss'
import Header from '../../components/header/Header'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItems } from '../../redux/store/products/productsActions'

const Details = () => {

    const { id } = useParams();
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products.items);
  
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


    return (
        <div className="details my-10 mx-16 flex flex-col gap-20">

            <Header/>

            <div className="flex gap-20 mx-20">

                <div className="w-[30%]">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempore assumenda officia! Cupiditate, sunt tenetur, minus maxime, repudiandae nobis officia porro ab facilis rem perspiciatis doloribus nemo deserunt tempore quod.
                    </p>
                </div>

                <div className="flex gap-8 w-[50%]">
                    <img className="w-80" src={product.gallery.poster} alt={product.name} />

                    <div className="flex flex-col justify-between w-[100%]">
                        <img className="w-20" src={product.gallery.frontPage} alt={product.name} />
                        <img className="w-20" src={product.gallery.imgTwo} alt={product.name} />
                        <img className="w-20" src={product.gallery.imgOne} alt={product.name} />
                    </div>
                </div>

                <div className="flex flex-col justify-between w-[30%]">

                    <div>
                        <h2 className='font-semibold'>{product.name}</h2>

                        <div className="flex justify-between">
                            <p className='details__price'>{product.price}</p>
                            <img className="w-5 object-contain cursor-pointer" src={heart} alt="" />
                        </div>
                    </div>

                    <p className='font-semibold'>{product.title}</p>

                    <p>
                    {product.description}</p>

                    <div>
                        <p>Talla</p>
                        <p className="details__size rounded-md p-1 w-8">{product.size}</p>
                    </div>

                    <button className="button__page px-6 py-1.5 w-[100%]">Añadir a la bolsa</button>
                </div>
            </div>
        </div>
    )
}

export default Details

