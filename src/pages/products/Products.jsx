import React from 'react'
import back from '../../assets/back.png'
import search from '../../assets/search.png'
import bag from '../../assets/bag.png'
import like from '../../assets/like.png'
import './products.scss'
import { useNavigate } from 'react-router-dom'

const Products = () => {

    const navigate = useNavigate();

    const goBack = () => {
        navigate('/')
    }

    return (
        <div className="products m-14 flex flex-col gap-20" >

            <div className="flex justify-between items-center">
                <img onClick={goBack} className="w-4 object-contain" src={back} alt="" />

                <ul className="flex gap-5">
                    <li className="products__li">Mujer</li>
                    <li className="products__li">Hombre</li>
                    <li className="products__li">Niños</li>
                    <li className="products__li">Hogar</li>
                </ul>

                <div className="relative flex items-center w-[30%]">
                    <input className="products__search w-[100%]" type="text" />
                    <img className=" absolute object-contain w-6 left-2" src={search} alt="" />
                </div>

                <div className="flex gap-6">
                    <img className="w-7 object-contain" src={like} alt="" />
                    <img className="w-5 object-contain" src={bag} alt="" />
                </div>

            </div>

            <div className="flex gap-[10%]">
                <div className="flex flex-col gap-6">
                    <h2 className="text-[18px]">Categoría</h2>
                    <ul className="flex flex-col gap-5">
                        <li className="products__li">Blusas</li>
                        <li className="products__li">Pantalones</li>
                        <li className="products__li">Vestidos</li>
                        <li className="products__li">Buzos</li>
                    </ul>
                </div>
                <div className="flex gap-10">
                    <div className="flex flex-col gap-2">
                        <img className="w-80" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_1_1.jpg?ts=1689584553276" alt="" />
                        <div>
                            <p>Blusa casual azul</p>
                            <p>$ 15.000</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <img className="w-80" src="https://static.zara.net/photos///2023/I/0/1/p/4174/641/700/2/w/972/4174641700_6_1_1.jpg?ts=1693823442969" alt="" />
                        <div>
                            <p>Blusa casual marrón</p>
                            <p>$ 15.000</p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-2">
                        <img className="w-80" src="https://static.zara.net/photos///2023/V/0/1/p/4174/170/675/2/w/972/4174170675_6_1_1.jpg?ts=1685375449439" alt="" />
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