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
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const selectedProfileView = useSelector((state) => state.admin.selectedProfileView);
  const [localSelectedCategory, setLocalSelectedCategory] = useState(selectedCategory);
  const userLogged = useSelector((state) => state.auth.userLogged);


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
      <Header showSearchBar={false} />
      <div className="products">
        <div className="products__container">
          <Sidebar />
          <div className="flex flex-col justify-center gap-10">
          <h1 className="flex self-center fontGreen text-[20px]"> PRODUCTOS </h1>
          <div className="product-list">
            {selectedProfileView === "stock" && (
              <>
                <div className="adminProduct__list">
                  {localSearchTerm && noResults ? (
                    <div className="no-results-message">
                      Lo siento, no se encontraron productos.
                    </div>
                  ) : (
                    filteredProducts.map((product, index) => (
                      <div
                        className={`adminProduct__div flex gap-2 ${
                          product.sold ? "sold" : ""
                        }`}
                        key={index}
                      >
                        {product.sold ? (
                          <div   className="adminProduct__item">
                       <img
                                className="w-[100px] h-[100px] object-cover rounded-md cursor-pointer "
                                src={product.gallery.poster}
                                alt={product.name}
                              />
                              <p className="fontGreen w-[150px]">
                                {product.title}
                              </p>
                              <span className="adminProduct__info w-[150px]">
                                {product.status}
                              </span>
                              <p className="adminProduct__info fontGreen w-[150px]">
                                ${product.price}
                              </p>
                              <p className="adminProduct__info w-[150px]">{product.genre}</p>
                            <p className="adminProduct__agotado font-semibold w-[150px] text-red-500">
                              AGOTADO
                            </p>

                          </div>
                        ) : (
                          <div>
                            <Link
                              className="adminProduct__item"
                              to={`/admin-details/${product.id}`}
                            >
                              <img
                                className="w-[100px] h-[100px] object-cover rounded-md cursor-pointer "
                                src={product.gallery.poster}
                                alt={product.name}
                              />
                              <p className="fontGreen w-[150px]">
                                {product.title}
                              </p>
                              <span className="adminProduct__info w-[150px]">
                                {product.status}
                              </span>
                              <p className="adminProduct__info fontGreen w-[150px]">
                                ${product.price}
                              </p>
                              <p className="w-[150px] adminProduct__info">{product.genre}</p>
                              <p className="w-[150px] adminProduct__info">{product.state}</p>
                            </Link>
                          </div>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
          </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminPanel;

