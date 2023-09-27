import logo from "../../assets/logo-circle.svg";
import "./noFound.scss";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { fetchItems } from "../../redux/store/products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";

const NoFound = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );

  const [localSelectedCategory, setLocalSelectedCategory] =
    useState(selectedCategory);
  const [localSearchTerm, setLocalSearchTerm] = useState("");
  const products = useSelector((state) => state.products.items);
  const filterProducts = (products, selectedCategory, searchTerm) => {
    let filteredProducts = products;
    if (selectedCategory !== "Todo") {
      filteredProducts = products.filter(
        (product) => product.genre === selectedCategory
      );
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

  const filteredProducts = filterProducts(
    products,
    localSelectedCategory,
    localSearchTerm
  );

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
      <Header
        searchTerm={localSearchTerm}
        onSearchChange={(term) => setLocalSearchTerm(term)}
      />

      <div className="noFound">
        <div className="noFound__container">
          <Sidebar />
          <div className="flex gap-10 flex-wrap justify-center">
            <div className=" flex items-center gap-2 w-[200px]">
              <img className="w-[30%] " src={logo} alt="" />
              <h1 className="blog__title">Oasis</h1>
            </div>
            <h2>404</h2>
            <h1>Page Not Found</h1>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default NoFound;
