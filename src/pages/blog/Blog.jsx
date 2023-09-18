import React from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../../assets/back.png'
import bag from '../../assets/bag.png'
import './blog.scss'

const Blog = () => {
    const navigate = useNavigate();
    return (
        <div className='blog flex flex-col'>
            <div className='flex justify-between'>
                <img className='backArrow' onClick={() => navigate(-1)} src={back} alt="" />
                <button className='flex items-center gap-2' onClick={() => navigate('/products')}>
                    <img className='icons' src={bag} alt="" />
                    <p>Nuestra tienda</p>
                </button>
            </div>
            <div className='blog__container flex flex-col gap-12'>
                <h1 className='title self-center'>OASIS BLOG</h1>
                <div className='blog__item flex justify-between'>
                    <div className='blog__titleImage flex flex-col gap-4'>
                        <h2 className='font-bold'>Lorem ipsum dolor sit amet.</h2>
                        <img className='h-40 rounded-md' src="https://www.nueva-iso-14001.com/wp-content/uploads/2020/12/medio-ambiente.jpg" alt="" />
                    </div>
                    <p className='blog__paragraph mt-10'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quis quo consequuntur officiis odit, sed vel? Alias libero recusandae, at praesentium mollitia laudantium adipisci dicta, et ullam necessitatibus magnam, perspiciatis nam!</p>
                </div>

                <div className='blog__item flex justify-between'>
                    <div className='blog__titleImage flex flex-col gap-4'>
                        <h2 className='font-bold'>Lorem ipsum dolor sit amet.</h2>
                        <img className='h-40 rounded-md' src="https://tn.com.ar/resizer/rmu6QhMBeufWp-9Egy3UwZJ5sq8=/767x0/smart/filters:format(webp)/cloudfront-us-east-1.images.arcpublishing.com/artear/AYP4ZIECXVEN3FBZZIX5XP2HCA.jpeg" alt="" />
                    </div>
                    <p className=' blog__paragraph mt-10'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nemo repellat dolorum nesciunt assumenda, ducimus reprehenderit sint voluptatum tenetur, impedit nisi debitis dicta dignissimos voluptas temporibus? Eos at ducimus est rerum.</p>
                </div>
            </div>
        </div>
    )
}

export default Blog