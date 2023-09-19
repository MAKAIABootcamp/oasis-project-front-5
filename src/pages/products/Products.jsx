import React, { useEffect, useState } from "react";
import "./products.scss";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { fetchItems } from "../../redux/store/products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";
import Swal from "sweetalert2";

const Products = () => {
    const dispatch = useDispatch();
    const selectedCategory = useSelector(
        (state) => state.products.selectedCategory
    );

    const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);
    const [localSearchTerm, setLocalSearchTerm] = useState("");
    const products = useSelector((state) => state.products.items);
    const filterProducts = (products, selectedCategory, searchTerm) => {

        let filteredProducts = products;
        if (selectedCategory !== 'Todo') {
            filteredProducts = products.filter((product) => product.genre === selectedCategory);
        }


        if (searchTerm.trim() !== "") {
            const searchTerms = searchTerm.trim().toLowerCase().split(" ");
            filteredProducts = filteredProducts.filter((product) => {
                return searchTerms.every((term) =>
                    product.name.toLowerCase().includes(term)
                );
            });
        }

        return filteredProducts;
    };

    const filteredProducts = filterProducts(products, localSelectedCategory, localSearchTerm);

    useEffect(() => {

        setLocalSelectedCategory(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {

        if (localSelectedCategory) {
            dispatch(fetchItems(localSelectedCategory));
        }
    }, [dispatch, localSelectedCategory]);

    const noResults = filteredProducts.length === 0;

    const showNoResultsAlert = () => {
        Swal.fire({
            icon: 'info',
            title: 'Producto no encontrado',
            text: 'No se encontraron productos que coincidan con la búsqueda.',
        });
    };

    return (
        <>
            <Header searchTerm={localSearchTerm} onSearchChange={(term) => setLocalSearchTerm(term)} />

            <div className="products">
                <div className="products__container">
                    <Sidebar />
                    <div className="flex gap-10 flex-wrap justify-center">
                        {localSearchTerm && noResults ? (
                            <div>
                                {showNoResultsAlert()}
                            </div>
                        ) : (

                            filteredProducts.map((product, index) => (
                                <div className="flex flex-col gap-2" key={index}>
                                    <Link to={`/details/${product.id}`}>
                                        <img
                                            className="w-80 h-80 object-cover rounded-md cursor-pointer"
                                            src={product.gallery.poster}
                                        />
                                    </Link>
                                    <div>
                                        <p className="font-semibold">{product.name}</p>
                                        <p>${product.price}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Products;
