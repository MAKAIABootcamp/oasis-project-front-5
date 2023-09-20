import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bag from '../../assets/bag.png'
import add from '../../assets/add.png'
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
            <div className='blog__header'>
                <button className='blog__option flex items-center gap-2 w-[200px]' onClick={() => navigate('/products')}>
                    <img className='blog__icon' src={bag} alt="" />
                    <p className='blog__buttonText'>Nuestra tienda</p>
                </button>
                <h1 className='blog__title'>Oasis</h1>
            </div>
            <div className='blog__container'>
                {/* <div className='w-[20%] flex flex-col gap-4'>
                        <button className='blog__option flex items-center gap-2 w-[200px]' onClick={() => navigate('/products')}>
                            <img className='icons' src={add} alt="" />
                            <p>Publicar artículo</p>
                        </button>
                </div> */}
                <div className='blog__button'>
                    <p className='blog__transform'>Transformemos la forma en que concebimos la moda !</p>
                </div>

                <div>
                    ¿Sabías que la industria de la moda genera aproximadamente 92 millones de toneladas de desechos textiles al año, lo que contribuye significativamente a problemas ambientales como la contaminación del agua, las emisiones de gases de efecto invernadero y la agotación de recursos naturales? Es hora de hacer un cambio, y OASIS está aquí para liderarlo, Únete a nosotros y sé parte de la revolución de la moda sostenible.
                </div>
                <div>
                    {articles.map((article, index) => (
                        <div key={index} className='blog__item flex justify-between'>
                            <div className='blog__titleImage flex flex-col gap-4'>
                                <h2 className='blog__subtitle font-bold'>{article.title}</h2>
                                <a href={article.originalUrl} target="_blank" rel="noopener noreferrer">
                                    <img className="w-80 h-80 object-cover rounded-md cursor-pointer" src={article.imageUrl} alt={article.title} />
                                </a>
                            </div>
                            <p className='blog__paragraph mt-10'>{article.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Blog; 