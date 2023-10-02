import React, { useEffect, useState } from "react";
import "./adminPanel.scss";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import { fetchItems } from "../../redux/store/products/productsActions";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../components/footer/Footer";
import Sidebar from "../../components/sidebar/Sidebar";

const AdminPanel = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.products.selectedCategory
  );

  const [localSelectedCategory, setLocalSelectedCategory] = useState(
    selectedCategory
  );
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

  const noResults = filteredProducts.length === 0;

  return (
    <>
      <Header
        searchTerm={localSearchTerm}
        onSearchChange={(term) => setLocalSearchTerm(term)}
      />
      <div className="products adminProduct">
        <div className="adminProduct__container">
          <Sidebar />
          <div className="adminProduct__list">
            {localSearchTerm && noResults ? (
              <div className="no-results-message">
                Lo siento, no se encontraron productos.
              </div>
            ) : (
              filteredProducts.map((product, index) => (
                <div
                  className={`adminProduct__div flex gap-2 ${product.sold ? "sold" : ""
                    }`}
                  key={index}
                >
                  {product.sold ? (
                    <div >
                      <img
                        className="w-80 h-80 object-cover rounded-md cursor-not-allowed"
                        src={product.gallery.poster}
                        alt={product.name}
                      />
                      <p className="font-semibold text-red-500">AGOTADO</p>
                      <p className="fontGreen">{product.name}</p>
                      <span>{product.status}</span>
                      <p>${product.price}</p>
                    </div>
                  ) : (
                    <div>
                      <Link className="adminProduct__item" to={`/admin-details/${product.id}`}>
                        <img
                          className="w-[100px] h-[100px] object-cover rounded-md cursor-pointer "
                          src={product.gallery.poster}
                          alt={product.name}
                        />
                        <p className="fontGreen w-[150px]">{product.title}</p>
                        <span className="w-[150px]">{product.status}</span>
                        <p className="fontGreen w-[150px]">${product.price}</p>
                        <p className="w-[150px]">{product.genre}</p>
                        <p className="w-[150px]">{product.state}</p>
                      </Link>
                    </div>
                  )}
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

export default AdminPanel;
