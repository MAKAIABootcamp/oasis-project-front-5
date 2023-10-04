import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bag from "../../assets/bag.png";
import user from "../../assets/user.png";
import deleteIcon from "../../assets/delete.png";
import editIcon from "../../assets/edit.png";
import logo from "../../assets/logo-circle.svg";
import { fireStore } from "../../firebase/firebaseConfig";
import "./blog.scss";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { useSelector } from "react-redux";

const Blog = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState([]);
    const [commentData, setCommentData] = useState({ name: "", text: "" });
    const [editingComment, setEditingComment] = useState({
        index: -1,
        commentIndex: -1,
        text: "",
    });

    const [isEditing, setIsEditing] = useState(false);
    const { isLogged, userLogged } = useSelector((state) => state.auth);

    const handlePerfilClick = () => {
        if (isLogged) {
            if (userLogged?.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/profile");
            }
        } else {
            navigate("/login");
        }
    };
    useEffect(() => {
        const getArticles = async () => {
            try {
                const querySnapshot = await getDocs(collection(fireStore, "articles"));
                const articleData = [];
                querySnapshot.forEach((doc) => {
                    const article = doc.data();
                    article.id = doc.id;
                    articleData.push(article);
                });
                setArticles(articleData);
            } catch (error) {
                console.error("Error al obtener los artículos desde Firestore:", error);
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
            const newComment = {
                name: isLogged ? userLogged.displayName || "Anónimo" : "Anónimo",
                text: commentData.text,
                timestamp: Date.now(),
            };
            updatedArticles[index].comments.push(newComment);
        }
        const articleRef = doc(fireStore, "articles", articleId);
        await updateDoc(articleRef, {
            comments: updatedArticles[index].comments,
        });
        setArticles(updatedArticles);
        setCommentData({ name: "", text: "" });
        setEditingComment({ index: -1, commentIndex: -1, text: "" });
        setIsEditing(false);
    };

    const handleCommentEdit = (index, commentIndex) => {
        const commentText = articles[index].comments[commentIndex].text;
        setEditingComment({ index, commentIndex, text: commentText });
        setCommentData({ name: "", text: commentText });
        setIsEditing(true);
    };

    const handleCommentDelete = async (index, commentIndex) => {
        const updatedArticles = [...articles];
        const articleId = updatedArticles[index].id;
        const commentId = updatedArticles[index].comments[commentIndex].id;
        const articleRef = doc(fireStore, "articles", articleId);
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
        <div className="blog flex flex-col">
            <div className="blog__header">
                <div className=" flex items-center w-[200px]">
                    <img className="w-[50%]" src={logo} alt="" />
                    <h1 className="blog__title">OASIS</h1>
                </div>

                <div className="flex gap-8">
                    <div className="blog__option  flex items-center gap-2 ">
                        <button onClick={() => navigate("/products")}>
                            <img className="blog__icon" src={bag} alt="" />
                        </button>
                        <p
                            onClick={() => navigate("/products")}
                            className="blog__buttonText"
                        >
                            Nuestra tienda
                        </p>
                    </div>
                    <div className="blog__option flex items-center gap-2">
                        <button onClick={handlePerfilClick}>
                            <img className="blog__icon" src={user} alt="" />
                        </button>
                        <p onClick={handlePerfilClick} className="blog__buttonText">
                            {isLogged ? userLogged.displayName : "Ingresa"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="blog__container">
                <div className="blog__button">
                    <p className="blog__transform">
                        Transformemos la forma en que concebimos la moda !
                    </p>
                    <div>
                        ¿Sabías que la industria de la moda genera aproximadamente 92
                        millones de toneladas de desechos textiles al año, lo que contribuye
                        significativamente a problemas ambientales como la contaminación del
                        agua, las emisiones de gases de efecto invernadero y la agotación de
                        recursos naturales? Es hora de hacer un cambio, y OASIS está aquí
                        para liderarlo, Únete a nosotros y sé parte de la revolución de la
                        moda sostenible.
                    </div>
                </div>

                <div>
                    {articles.map((article, index) => (
                        <div key={article.id} className="blog__item flex flex-col">
                            <div className="blog__titleImage flex flex-col gap-4">
                                <h2 className="blog__subtitle font-bold">{article.title}</h2>
                                <a
                                    href={article.originalUrl}
                                    className="blog__a"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <img
                                        className="blog__image"
                                        src={article.imageUrl}
                                        alt={article.title}
                                    />
                                    <p className="blog__paragraph">{article.description}</p>
                                </a>
                            </div>

                            <hr />

                            <div className="blog__comments">
                                <h3 className="blog__subtitle font-bold">Comentarios</h3>
                                {article.comments &&
                                    Array.isArray(article.comments) &&
                                    article.comments.map((comment, commentIndex) => (
                                        <div key={commentIndex} className="comment">
                                            <p className="comment-user fontGreen">
                                                {comment.name}:
                                            </p>
                                            <p className="comment-text">{comment.text}</p>
                                            {isCommentEditableOrDeletable(comment.timestamp) && (
                                                <>
                                                    <button
                                                        className="comment-delete ml-4"
                                                        onClick={() =>
                                                            handleCommentDelete(index, commentIndex)
                                                        }
                                                    >
                                                        <img
                                                            src={deleteIcon}
                                                            className="deleteIcon w-3"
                                                            alt="Eliminar"
                                                        />
                                                    </button>
                                                    <button
                                                        className="comment-edit"
                                                        onClick={() =>
                                                            handleCommentEdit(index, commentIndex)
                                                        }
                                                    >
                                                        <img
                                                            src={editIcon}
                                                            className="editIcon w-3"
                                                            alt="Editar"
                                                        />
                                                    </button>
                                                </>
                                            )}
                                        </div>
                                    ))}
                                <form onSubmit={(e) => handleCommentSubmit(e, index)} className="flex gap-1">
                                    <div className="comment-input">
                                        {isLogged && (
                                            <img
                                                className="comment-image"
                                                src={isLogged ? userLogged.photoURL : commentData.photoURL}
                                                alt="Nombre"
                                                onChange={(e) =>
                                                    setCommentData({
                                                        ...commentData,
                                                        photoURL: e.target.value,
                                                    })
                                                }
                                                required
                                                disabled={isLogged}
                                            />
                                        )}

                                    </div>
                                    <div className="comment-input">
                                        <input
                                            className="input"
                                            placeholder="Escribe tu comentario..."
                                            value={commentData.text}
                                            onChange={(e) =>
                                                setCommentData({ ...commentData, text: e.target.value })
                                            }
                                            required
                                        />
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

