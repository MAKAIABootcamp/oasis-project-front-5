import React, { useEffect, useState } from "react";
import "./products.scss";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { fetchItems } from "../../redux/store/products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";

const Products = () => {
    const dispatch = useDispatch();

    const selectedCategory = useSelector(
        (state) => state.products.selectedCategory
    );

    const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);


    const products = useSelector((state) => state.products.items);

    let filteredProducts = products;

    if (localSelectedCategory !== 'Todo') {
        filteredProducts = products.filter((product) => {
            return product.genre === localSelectedCategory;
        });
    } else {
        filteredProducts = products
    }

    useEffect(() => {

        setLocalSelectedCategory(selectedCategory);
    }, [selectedCategory]);

    useEffect(() => {

        if (localSelectedCategory) {
            dispatch(fetchItems(localSelectedCategory));
        }
    }, [dispatch, localSelectedCategory]);


    return (
        <>
            <Header />
            <div className="products">
                <div className="products__container">
                    <Sidebar/>
                    <div className="flex gap-10 flex-wrap justify-center">
                        {filteredProducts.map((product, index) => (
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
                        ))}
                    </div>
                </div>
                <Footer />
            </div>
        </>
    );
};

export default Products;
