import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import bag from '../../assets/bag.png'
import { fireStore } from '../../firebase/firebaseConfig';
import './blog.scss'
import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';

const Blog = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [commentData, setCommentData] = useState({ name: '', text: '' });


    useEffect(() => {

        const getArticles = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireStore, 'articles'));
                const articleData = [];
                querySnapshot.forEach((doc) => {
                    const article = doc.data();
                    article.id = doc.id; 
                    articleData.push(article);
                });
                setArticles(articleData);
            } catch (error) {
                console.error('Error al obtener los artículos desde Firestore:', error);
            }
        };

        getArticles();
    }, []);

    const handleCommentSubmit = async (e, index) => {
        e.preventDefault();

        const updatedArticles = [...articles];
        const articleId = updatedArticles[index].id;

        if (!Array.isArray(updatedArticles[index].comments)) {
            updatedArticles[index].comments = [];
        }

        const newComment = { name: commentData.name, text: commentData.text };
        const articleRef = doc(fireStore, 'articles', updatedArticles[index].id); 
        await updateDoc(articleRef, {
            comments: [...updatedArticles[index].comments, newComment],
        });
        updatedArticles[index].comments.push(newComment);
        setArticles(updatedArticles);
        setCommentData({ name: '', text: '' });
    };

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
                            <div className='blog__comments'>
                                <h3>Comentarios</h3>
                                {article.comments && Array.isArray(article.comments) && article.comments.map((comment, commentIndex) => (
                                    <div key={commentIndex} className='comment'>
                                        <p className='comment-user'>{comment.name}:</p>
                                        <p className='comment-text'>{comment.text}</p>
                                    </div>
                                ))}

                                <form onSubmit={(e) => handleCommentSubmit(e, index)}>
                                    <div className='comment-input'>
                                        <input
                                            type='text'
                                            placeholder='Nombre del usuario'
                                            value={commentData.name}
                                            onChange={(e) => setCommentData({ ...commentData, name: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className='comment-input'>
                                        <textarea
                                            placeholder='Escribe tu comentario...'
                                            value={commentData.text}
                                            onChange={(e) => setCommentData({ ...commentData, text: e.target.value })}
                                            required
                                        />
                                    </div>
                                    <div className='comment-button'>
                                        <button type='submit'>Enviar comentario</button>
                                    </div>
                                </form>
                            </div>

                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


export default Blog; 