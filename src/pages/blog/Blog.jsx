import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import bag from '../../assets/bag.png';
import user from '../../assets/user.png'
import deleteIcon from '../../assets/delete.png';
import editIcon from '../../assets/edit.png';
import logo from "../../assets/logo-circle.svg";
import { fireStore } from '../../firebase/firebaseConfig';
import './blog.scss';
import { collection, getDocs, updateDoc, doc, } from 'firebase/firestore';

const Blog = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [commentData, setCommentData] = useState({ name: '', text: '' });
    const [editingComment, setEditingComment] = useState({
        index: -1,
        commentIndex: -1,
        text: '',
    });
    const [isEditing, setIsEditing] = useState(false);

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
        if (editingComment.index === index && editingComment.commentIndex !== -1) {
            const commentIndex = editingComment.commentIndex;
            updatedArticles[index].comments[commentIndex].text = commentData.text;
        } else {
            const newComment = { name: commentData.name, text: commentData.text, timestamp: Date.now() };
            updatedArticles[index].comments.push(newComment);
        }
        const articleRef = doc(fireStore, 'articles', articleId);
        await updateDoc(articleRef, {
            comments: updatedArticles[index].comments,
        });
        setArticles(updatedArticles);
        setCommentData({ name: '', text: '' });
        setEditingComment({ index: -1, commentIndex: -1, text: '' });
        setIsEditing(false);
    };

    const handleCommentEdit = (index, commentIndex) => {
        const commentText = articles[index].comments[commentIndex].text;
        setEditingComment({ index, commentIndex, text: commentText });
        setCommentData({ name: '', text: commentText });
        setIsEditing(true);
    };

    const handleCommentDelete = async (index, commentIndex) => {
        const updatedArticles = [...articles];
        const articleId = updatedArticles[index].id;
        const commentId = updatedArticles[index].comments[commentIndex].id;
        const articleRef = doc(fireStore, 'articles', articleId);
        updatedArticles[index].comments.splice(commentIndex, 1);
        await updateDoc(articleRef, {
            comments: updatedArticles[index].comments,
        });
        setArticles(updatedArticles);
    };

    const isCommentEditableOrDeletable = (commentTimestamp) => {
        const currentTime = Date.now();
        const timeDifference = currentTime - commentTimestamp;
        const minutesDifference = Math.floor(timeDifference / (1000 * 60));
        return minutesDifference <= 2;
    };

    return (
        <div className='blog flex flex-col'>
            <div className='blog__header'>
                <div className=' flex items-center w-[200px]' >
                    <img className="w-[50%]" src={logo} alt="" />
                    <h1 className='blog__title'  >OASIS</h1>
                </div>

                <div className='flex'>
                    <div className='blog__option flex items-center gap-2 w-[200px]'>
                        <button onClick={() => navigate('/products')}>
                            <img className='blog__icon' src={bag} alt='' />
                        </button>
                        <p onClick={() => navigate('/products')} className='blog__buttonText'>Nuestra tienda</p>
                    </div>
                    <div className='blog__option flex items-center gap-2 w-[200px]'>
                        <button onClick={() => navigate('/login')}>
                            <img className="blog__icon" src={user} alt="" />
                        </button>
                        <p onClick={() => navigate('/login')} className='blog__buttonText'>Ingresa</p>
                    </div>
                </div>

            </div>
            <div className='blog__container'>
                <div className='blog__button'>
                    <p className='blog__transform'>Transformemos la forma en que concebimos la moda !</p>
                    <div>
                        ¿Sabías que la industria de la moda genera aproximadamente 92 millones de toneladas de desechos textiles al
                        año, lo que contribuye significativamente a problemas ambientales como la contaminación del agua, las
                        emisiones de gases de efecto invernadero y la agotación de recursos naturales? Es hora de hacer un cambio,
                        y OASIS está aquí para liderarlo, Únete a nosotros y sé parte de la revolución de la moda sostenible.
                    </div>
                </div>


                <div>
                    {articles.map((article, index) => (
                        <div key={article.id} className='blog__item flex flex-col'>
                            <div className='blog__titleImage flex flex-col gap-4'>
                                <h2 className='blog__subtitle font-bold'>{article.title}</h2>
                                <a href={article.originalUrl} className='blog__a' target='_blank' rel='noopener noreferrer'>
                                    <img
                                        className='w-[30%] h-[200px] object-cover rounded-md cursor-pointer'
                                        src={article.imageUrl}
                                        alt={article.title}
                                    />
                                    <p className='blog__paragraph'>{article.description}</p>
                                </a>
                            </div>
                            
                            <div className='blog__comments'>
                                <h3 className='font-bold'>Comentarios</h3>
                                {article.comments &&
                                    Array.isArray(article.comments) &&
                                    article.comments.map((comment, commentIndex) => (
                                        <div key={commentIndex} className='comment'>
                                            <p className='comment-user'>{comment.name}:</p>
                                            <p className='comment-text'>{comment.text}</p>
                                            {isCommentEditableOrDeletable(comment.timestamp) && (
                                                <>
                                                    <button
                                                        className='comment-delete'
                                                        onClick={() => handleCommentDelete(index, commentIndex)}
                                                    >
                                                        <img src={deleteIcon} className='deleteIcon w-5' alt='Eliminar' />
                                                    </button>
                                                    <button
                                                        className='comment-edit'
                                                        onClick={() => handleCommentEdit(index, commentIndex)}
                                                    >
                                                        <img src={editIcon} className='editIcon w-5' alt='Editar' />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                <form onSubmit={(e) => handleCommentSubmit(e, index)}>
                                    <div className='comment-input'>
                                        <input
                                            type='text'
                                            placeholder='Nombre'
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
                                        <button type='submit'>{isEditing ? 'Guardar cambios' : 'Enviar'}</button>
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
