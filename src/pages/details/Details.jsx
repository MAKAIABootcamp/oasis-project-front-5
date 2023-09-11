import React from 'react'
import heart from '../../assets/heart.png'
import './details.scss'
import Header from '../../components/header/Header'

const Details = () => {
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
                    <img className="w-80" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_1_1.jpg?ts=1689584553276" alt="" />

                    <div className="flex flex-col justify-between w-[100%]">
                        <img className="w-20" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_1_1.jpg?ts=1689584553276" alt="" />
                        <img className="w-20" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_2_1.jpg?ts=1689584553343" alt="" />
                        <img className="w-20" src="https://static.zara.net/photos///2023/I/0/1/p/3641/312/400/2/w/972/3641312400_6_3_1.jpg?ts=1689584553743" alt="" />
                    </div>
                </div>

                <div className="flex flex-col justify-between w-[30%]">

                    <div>
                        <h2>Blusa casual azul</h2>

                        <div className="flex justify-between">
                            <p>$ 15.000</p>
                            <img className="w-5 object-contain cursor-pointer" src={heart} alt="" />
                        </div>
                    </div>

                    <p>Ideal para una salida casual, para estar fresca y cómoda</p>

                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Repellendus saepe laudantium voluptatum quos culpa soluta quisquam hic, inventore quo nemo! Nihil omnis dolorem quis? Qui harum doloremque nemo quae eligendi!
                    </p>

                    <div>
                        <p>Talla</p>
                        <p className="details__size rounded-md p-1 w-8">M</p>
                    </div>

                    <button className="button__page px-6 py-1.5 w-[100%]">Añadir a la bolsa</button>
                </div>
            </div>
        </div>
    )
}

export default Details