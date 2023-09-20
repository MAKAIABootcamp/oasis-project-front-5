import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import back from '../../assets/back.png'
import bag from '../../assets/bag.png'
import { fireStore } from '../../firebase/firebaseConfig'; 
import './blog.scss'
import { collection, getDocs } from 'firebase/firestore';

const Blog = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);

    useEffect(() => {
     
        const getArticles = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireStore, 'articles'));
                const articleData = [];
                querySnapshot.forEach((doc) => {
                    articleData.push(doc.data());
                });
                setArticles(articleData);
            } catch (error) {
                console.error('Error al obtener los artículos desde Firestore:', error);
            }
        };

        getArticles();
    }, []);

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
                {articles.map((article, index) => (
                    <div key={index} className='blog__item flex justify-between'>
                        <div className='blog__titleImage flex flex-col gap-4'>
                            <h2 className='font-bold'>{article.title}</h2>
                            <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
                                <img className="w-80 h-80 object-cover rounded-md cursor-pointer" src={article.imageUrl} alt={article.title} />
                            </a>
                        </div>
                        <p className='blog__paragraph mt-10'>{article.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Blog; 