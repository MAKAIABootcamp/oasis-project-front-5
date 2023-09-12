import React from 'react'
import './products.scss'
import { useNavigate } from 'react-router-dom'
import Header from '../../components/header/Header';

const Products = () => {

    const navigate = useNavigate();

    return (
        <div className="products my-8 mx-14 flex flex-col gap-20" >
            <Header/>

            <div className="flex gap-[10%]">
                <div className="flex flex-col gap-6">
                    <h2 className="text-[18px]">Categoría</h2>
                    <ul className="flex flex-col gap-5">
                        <li className="products__li selected">Blusas</li>
                        <li className="products__li">Pantalones</li>
                        <li className="products__li">Vestidos</li>
                        <li className="products__li">Buzos</li>
                    </ul>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-2">
                        <img onClick={() => navigate('/details')} className="w-80 rounded-md cursor-pointer" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_1_1.jpg?ts=1689584553276" alt="" />
                        <div>
                            <p>Blusa casual azul</p>
                            <p>$ 15.000</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <img className="w-80 rounded-md cursor-pointer" src="https://static.zara.net/photos///2023/I/0/1/p/4174/641/700/2/w/972/4174641700_6_1_1.jpg?ts=1693823442969" alt="" />
                        <div>
                            <p>Blusa casual marrón</p>
                            <p>$ 15.000</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <img className="w-80 rounded-md cursor-pointer" src="https://static.zara.net/photos///2023/V/0/1/p/4174/170/675/2/w/972/4174170675_6_1_1.jpg?ts=1685375449439" alt="" />
                        <div>
                            <p>Blusa casual naranja</p>
                            <p>$ 15.000</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Products