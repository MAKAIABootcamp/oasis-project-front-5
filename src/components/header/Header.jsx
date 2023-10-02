import back from '../../assets/back.png';
import search from '../../assets/search.png';
import bag from '../../assets/bag.png';
import heart from '../../assets/heart.png';
import admin from '../../assets/adminPanel.png'
import adminUser from '../../assets/loginAdmin.png'
import { useNavigate } from 'react-router-dom';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setItemsAndCategory } from '../../redux/store/products/productsReducer';
import { useState } from 'react';

const Header = ({ showSearchBar = true, searchTerm, onSearchChange }) => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const { isLogged, userLogged } = useSelector((state) => state.auth);
 const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    navigate('/products')
    dispatch(setItemsAndCategory({ items: [], selectedCategory: category }));
  };

  const [localSearchTerm, setLocalSearchTerm] = useState("");


  const handleSearchChange = (event) => {
    const searchTerm = event.target.value;
    setLocalSearchTerm(searchTerm);
    onSearchChange(searchTerm);
  };

  return (
    <div className="header flex justify-between items-center flex-wrap gap-3">
      {isLogged && userLogged && userLogged.role === 'admin' ? (
        <div className="admin-info flex items-center gap-2">
          <img className="admin-icon" src={admin} alt="Admin Icon" />
          <p> Administrador </p>
        </div>
      ) : (
        <img className="backArrow" onClick={() => navigate(-1)} src={back} alt="" />
      )}
      {showSearchBar && (
        <ul className="header__categories flex gap-5 font-semibold">
          <li
            className={`products__li ${selectedCategory === 'Todo' ? 'selected' : ''}`}
            onClick={() => handleCategoryChange('Todo')}
          >
            Todo
          </li>
          <li
            className={`products__li ${selectedCategory === 'Mujer' ? 'selected' : ''}`}
            onClick={() => handleCategoryChange('Mujer')}
          >
            Mujer
          </li>
          <li
            className={`products__li ${selectedCategory === 'Hombre' ? 'selected' : ''}`}
            onClick={() => handleCategoryChange('Hombre')}
          >
            Hombre
          </li>
          <li
            className={`products__li ${selectedCategory === 'Niños' ? 'selected' : ''}`}
            onClick={() => handleCategoryChange('Niños')}
          >
            Niños
          </li>
          <li
            className={`products__li ${selectedCategory === 'Accesorios' ? 'selected' : ''}`}
            onClick={() => handleCategoryChange('Accesorios')}
          >
            Accesorios
          </li>
        </ul>
      )}

      {showSearchBar && (
        <div className="header__input relative flex items-center">
          <input
            className="products__search w-[100%]"
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
          />
          <img className="absolute object-contain w-6 left-2" src={search} alt="" />
        </div>
      )}

      <div className="flex gap-6">
      {isLogged && userLogged && userLogged.role === 'admin' ? (
          <div className="admin-icon" onClick={() => navigate('/admin')}>
            <img className="w-7 object-contain cursor-pointer" src={adminUser} alt="Admin Icon" />
          <p> {userLogged.displayName}</p>

          </div>
        ) : (
          <>
            <img
              className="w-7 object-contain cursor-pointer"
              onClick={() => navigate('/favorites')}
              src={heart}
              alt=""
            />
            <img
              className="w-5 object-contain cursor-pointer"
              onClick={() => navigate('/cart')}
              src={bag}
              alt=""
            />
          </>
        )}
      </div>
    </div>
  );
};


export default Header;
