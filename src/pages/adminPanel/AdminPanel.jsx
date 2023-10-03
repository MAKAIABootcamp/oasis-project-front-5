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

          <div className="product-list">
            {selectedProfileView === "stock" && (
              <>
                <h1>Productos</h1>
                <table className="adminProduct__list">
                  <thead>
                    <tr>
                      <th className="w-[150px]">Foto</th>
                      <th className="w-[150px]">Nombre</th>
                      <th className="w-[150px]">Estado</th>
                      <th className="w-[150px]">Precio</th>
                      <th className="w-[150px]">Género</th>
                      <th className="w-[150px]">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {localSearchTerm && noResults ? (
                      <tr>
                        <td colSpan="6" className="no-results-message">
                          Lo siento, no se encontraron productos.
                        </td>
                      </tr>
                    ) : (
                      filteredProducts.map((product, index) => (
                        <tr
                          className={`adminProduct__div flex gap-2 ${
                            product.sold ? "sold" : ""
                          }`}
                          key={index}
                        >
                          {product.sold ? (
                            <td>
                              <img
                                className="w-80 h-80 object-cover rounded-md cursor-not-allowed"
                                src={product.gallery.poster}
                                alt={product.name}
                              />
                              <p className="font-semibold text-red-500">AGOTADO</p>
                              <p className="fontGreen">{product.name}</p>
                              <span>{product.status}</span>
                              <p>${product.price}</p>
                            </td>
                          ) : (
                            <td>
                              <Link
                                className="adminProduct__item"
                                to={`/admin-details/${product.id}`}
                              >
                                <div>
                                  <img
                                    className="w-[100px] h-[100px] object-cover rounded-md cursor-pointer "
                                    src={product.gallery.poster}
                                    alt={product.name}
                                  />
                                </div>
                                <p className="fontGreen w-[150px]">{product.title}</p>
                                <span className="w-[150px]">{product.status}</span>
                                <p className="fontGreen w-[150px]">${product.price}</p>
                                <p className="w-[150px]">{product.genre}</p>
                                <p className="w-[150px]">{product.state}</p>
                              </Link>
                            </td>
                          )}
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </>
            )}

            {selectedProfileView === "perfil" && (
              <>
                <div className="w-20 h-20 rounded-full overflow-hidden">
                  <img
                    src={userLogged.photoURL}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-6 p-10"></div>
              </>
            )}
            {selectedProfileView === "ventas" && <h1>Ventas</h1>}
            {selectedProfileView === "agregar" && <h1>Agregar producto</h1>}
            {selectedProfileView === "solicitudes" && <h1>Solicitudes</h1>}
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default AdminPanel;

