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
    const selectedCategory = useSelector((state) => state.products.selectedCategory); 

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

            <Header />

            <div className="details__container">

                <div className="details__paragraph">
                    <p>
                        ¿Sabías que la industria de la moda genera aproximadamente 92 millones de toneladas de desechos textiles al año, lo que contribuye significativamente a problemas ambientales como la contaminación del agua, las emisiones de gases de efecto invernadero y la agotación de recursos naturales? Es hora de hacer un cambio,  y OASIS está aquí para liderarlo,  Únete a nosotros y sé parte de la revolución de la moda sostenible.
                    </p>
                </div>

                <div className="details__photosContainer flex gap-6">
                    <img className="w-80" src={product.gallery.poster} alt={product.name} />

                    <div className="details__photos justify-between w-[100%]">
                        <img className="w-20" src={product.gallery.frontPage} alt={product.name} />
                        <img className="w-20" src={product.gallery.imgTwo} alt={product.name} />
                        <img className="w-20" src={product.gallery.imgOne} alt={product.name} />
                    </div>
                </div>

                <div className="details__info flex flex-col justify-between">

                    <div>
                        <h2 className='details__name font-semibold'>{product.name}</h2>
                        <div className="flex justify-between">
                            <p className='details__price'> $ {product.price}</p>
                            <img className="w-5 object-contain cursor-pointer" src={heart} alt="" />
                        </div>
                    </div>

                    <p className='font-semibold'>{product.title}</p>

                    <p>{product.description}</p>

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

