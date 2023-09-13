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
        <div className="details">

            <Header/>

            <div className="details__container">

                <div className="details__paragraph">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Iure tempore assumenda officia! Cupiditate, sunt tenetur, minus maxime, repudiandae nobis officia porro ab facilis rem perspiciatis doloribus nemo deserunt tempore quod.
                    </p>
                </div>

              <h2 className='details__nameUp font-bold'>Blusa casual azul</h2>

                <div className="details__photosContainer flex gap-6">
                    <img className="w-80" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_1_1.jpg?ts=1689584553276" alt="" />

                    <div className="details__photos justify-between w-[100%]">
                        <img className="w-20" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_1_1.jpg?ts=1689584553276" alt="" />
                        <img className="w-20" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_2_1.jpg?ts=1689584553343" alt="" />
                        <img className="w-20" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_3_1.jpg?ts=1689584553743" alt="" />

                    </div>
                </div>

                <div className="details__info flex flex-col justify-between">

                    <div>

                        <h2 className='details__name font-semibold'>{product.name}</h2>

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

