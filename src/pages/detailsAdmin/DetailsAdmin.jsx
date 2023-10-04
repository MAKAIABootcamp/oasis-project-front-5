import React, { useEffect, useState } from "react";
import Header from "../../components/header/Header";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchItems } from "../../redux/store/products/productsActions";
import Sidebar from "../../components/sidebar/Sidebar";
import edite from "../../assets/edit.png";
import "./detailsAdmin.scss";
import {
    collection,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import fileUpload from "../../service/fileUpload";


const DetailsAdmin = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    console.log("ID from URL:", id);
    const products = useSelector((state) => state.products.items);
    const [selectedImage, setSelectedImage] = useState(null);
    const product = products.find((p) => p.id === parseInt(id));
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingGallery, setIsEditingGallery] = useState(false);
    const [editedProduct, setEditedProduct] = useState({
        name: products.name || "",
        title: products.title || "",
        description: products.description || "",
        text: products.text || "",
        size: products.size || "",
        price: products.price || "",
        genre: products.genre || "",
        color: products.color || "",
        state: products.state || "",
        status: products.status || "",
    });

    const [editingField, setEditingField] = useState(null);

    useEffect(() => {
        if (products.length === 0) {
            dispatch(fetchItems());
        }
    }, [dispatch, products]);

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

    const handleEdit = (field) => {
        setIsEditing(true);
        setEditingField(field);
    };

    const handleSave = async (e) => {
        e.preventDefault();
        if (product && product.id) {
            try {
                const firestore = getFirestore();
                const itemsCollectionRef = collection(firestore, "items");
                const querySnapshot = await getDocs(itemsCollectionRef);

                let productDocRef;
                querySnapshot.forEach((doc) => {
                    if (doc.data().id === parseInt(id)) {
                        productDocRef = doc.ref;
                    }
                });

                if (productDocRef) {
                    const updatedFields = {};

                    if (editingField === "name") {
                        updatedFields.name = editedProduct.name;
                    }
                    if (editingField === "title") {
                        updatedFields.title = editedProduct.title;
                    }
                    if (editingField === "price") {
                        updatedFields.price = editedProduct.price;
                    }
                    if (editingField === "size") {
                        updatedFields.size = editedProduct.size;
                    }
                    if (editingField === "status") {
                        updatedFields.status = editedProduct.status;
                    }
                    if (editingField === "genre") {
                        updatedFields.genre = editedProduct.genre;
                    }
                    if (editingField === "color") {
                        updatedFields.color = editedProduct.color;
                    }
                    if (editingField === "text") {
                        updatedFields.text = editedProduct.text;
                    }
                    if (editingField === "description") {
                        updatedFields.description = editedProduct.description;
                    }

                    await updateDoc(productDocRef, updatedFields);

                    setIsEditing(false);
                    setEditingField(null);
                    setEditedProduct((prevProduct) => ({
                        ...prevProduct,
                        ...updatedFields,
                    }));
                } else {
                    console.error("Documento no encontrado en Firestore.");
                }
            } catch (error) {
                console.error(
                    "Error al actualizar la información en Firestore:",
                    error
                );
            }
        }
    };

    const handleThumbnailClick = (image) => {
        setSelectedImage(image);
    };

    const handleImageUpload = async (e, field) => {
        const newImageFile = e.target.files[0];
        if (newImageFile) {
            const imageUrl = await fileUpload(newImageFile);

            if (imageUrl) {
                try {
                    const firestore = getFirestore();
                    const itemsCollectionRef = collection(firestore, "items");
                    const querySnapshot = await getDocs(
                        query(itemsCollectionRef, where("id", "==", parseInt(id)))
                    );

                    if (!querySnapshot.empty) {
                        const productDocRef = querySnapshot.docs[0].ref;
                        const updateField = `gallery.${field}`;
                        await updateDoc(productDocRef, {
                            [updateField]: imageUrl,
                        });
                        cancelEditGallery();
                    } else {
                        console.error("Documento no encontrado en Firestore.");
                    }
                } catch (error) {
                    console.error("Error al actualizar la imagen en Firestore:", error);
                }
            }
        }
    };

    const cancelEditGallery = () => {
        setIsEditingGallery(false);
    };

    const handleEditGallery = () => {
        setIsEditingGallery(true);
    };
    return (
        <>
            <Header showSearchBar={false} />
            <div className="details detailsAdmin">
                <Sidebar />
                <div className="detailsAdmin__container">
                    <div className="detailsAdmin__photosContainer flex gap-6">
                        <div className="fontGreen flex justify-between">
                            Galería{" "}
                            {!isEditingGallery ? (
                                <img
                                    className="icons"
                                    src={edite}
                                    alt=""
                                    onClick={handleEditGallery}
                                />
                            ) : (
                                <button onClick={cancelEditGallery}>Cancelar</button>
                            )}
                        </div>

                        {isEditingGallery ? (
                            <div className="detailsAdmin__photoShow flex flex-col gap-8">

                                <form className="detailsAdmin__photoShow flex gap-2">
                                    <div className=" photoShow cursor-pointer">
                                        <label htmlFor="poster">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="poster"
                                                onChange={(e) => handleImageUpload(e, 'poster')}
                                            />
                                            <img 
                                                src={product.gallery.poster}
                                                alt='Imagen de poster'
                                            />
                                        </label>
                                    </div>
                                </form>
                                <br />
                                <form className="detailsAdmin__photos">

                                    <div className="cursor-pointer">
                                        <label htmlFor="frontPage">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="frontPage"
                                                onChange={(e) => handleImageUpload(e, 'frontPage')}
                                            />
                                            <img className="w-[70px]  cursor-pointer"
                                                src={product.gallery.frontPage}
                                                alt='Imagen de frontPage'
                                            />
                                        </label>
                                    </div>
                                    <div className="cursor-pointer">
                                        <label htmlFor="imgOne">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="imgOne"
                                                onChange={(e) => handleImageUpload(e, 'imgOne')}
                                            />
                                            <img className="w-[70px]  cursor-pointer"
                                                src={product.gallery.imgOne}
                                                alt='Imagen de imgOne'
                                            />
                                        </label>
                                    </div>
                                    <div className="cursor-pointer">
                                        <label htmlFor="imgTwo">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                style={{ display: 'none' }}
                                                id="imgTwo"
                                                onChange={(e) => handleImageUpload(e, 'imgTwo')}
                                            />
                                            <img className="w-[70px]  cursor-pointer"
                                                src={product.gallery.imgTwo}
                                                alt='Imagen de imgTwo'
                                            />
                                        </label>
                                    </div>
                                </form>
                            </div>
                        ) : (
                            <div className="detailsAdmin__photoShow flex gap-2">
                                <img
                                    className="photoShow"
                                    src={selectedImage || product.gallery.poster}
                                    alt={product.name}
                                />
                            </div>
                        )}

                        {!isEditingGallery && (
                            <div className="detailsAdmin__photos">
                                <img
                                    className="w-[70px] cursor-pointer"
                                    src={product.gallery.frontPage}
                                    alt={product.name}
                                    onClick={() =>
                                        handleThumbnailClick(product.gallery.frontPage)
                                    }
                                />
                                <img
                                    className="w-[70px] cursor-pointer"
                                    src={product.gallery.imgTwo}
                                    alt={product.name}
                                    onClick={() => handleThumbnailClick(product.gallery.imgTwo)}
                                />
                                <img
                                    className="w-[70px] cursor-pointer"
                                    src={product.gallery.imgOne}
                                    alt={product.name}
                                    onClick={() => handleThumbnailClick(product.gallery.imgOne)}
                                />
                            </div>
                        )}
                    </div>

                    <div className="details__info flex flex-col gap-4">
                        <div className="detailsAdmin__item">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Nombre:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("name")}
                                    />
                                </div>
                                {isEditing && editingField === "name" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.name}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                name: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <span>{editedProduct.name || product.name}</span>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="detailsAdmin__item">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Título:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("title")}
                                    />
                                </div>
                                {isEditing && editingField === "title" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.title}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                title: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.title || product.title}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="detailsAdmin__item">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Precio:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("price")}
                                    />
                                </div>
                                {isEditing && editingField === "price" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.price}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                price: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.price || product.price}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="detailsAdmin__item">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Talla:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("size")}
                                    />
                                </div>
                                {isEditing && editingField === "size" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.size}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                size: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.size || product.size}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="detailsAdmin__item">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Estado:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("status")}
                                    />
                                </div>
                                {isEditing && editingField === "status" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.status}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                status: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.status || product.status}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="detailsAdmin__item">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Categoría:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("genre")}
                                    />
                                </div>
                                {isEditing && editingField === "genre" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.genre}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                genre: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.genre || product.genre}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="detailsAdmin__item">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Color:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("color")}
                                    />
                                </div>
                                {isEditing && editingField === "color" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.color}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                color: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.color || product.color}</p>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="details__info flex flex-col gap-4">
                        <div className="detailsAdmin__item">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Stock:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("state")}
                                    />
                                </div>
                                {isEditing && editingField === "state" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.state}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                state: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.state || product.state}</p>
                                    </>
                                )}
                            </div>
                        </div>
                        <div className="detailsAdmin__item flex flex-col gap-2">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Composición:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("text")}
                                    />
                                </div>
                                {isEditing && editingField === "text" ? (
                                    <input
                                        className="input"
                                        type="text"
                                        value={editedProduct.text}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                text: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.text || product.text}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <div className="detailsAdmin__item flex flex-col gap-2">
                            <div className=" flex flex-col gap-2 justify-between">
                                <div className="fontGreen flex justify-between">
                                    Descripción:{" "}
                                    <img
                                        className="icons"
                                        src={edite}
                                        alt=""
                                        onClick={() => handleEdit("description")}
                                    />
                                </div>
                                {isEditing && editingField === "description" ? (
                                    <input
                                        className="input"
                                        type="description"
                                        value={editedProduct.description}
                                        onChange={(e) =>
                                            setEditedProduct({
                                                ...editedProduct,
                                                description: e.target.value,
                                            })
                                        }
                                    />
                                ) : (
                                    <>
                                        <p>{editedProduct.description || product.description}</p>
                                    </>
                                )}
                            </div>
                        </div>

                        <button
                            className="button__page px-6 py-1.5 w-[100%]"
                            onClick={handleSave}
                        >
                            Guardar cambios
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default DetailsAdmin;

