import back from '../../assets/back.png';
import search from '../../assets/search.png';
import bag from '../../assets/bag.png';
import heart from '../../assets/heart.png';
import { useNavigate } from 'react-router-dom';
import './header.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setItemsAndCategory } from '../../redux/store/products/productsReducer';

const Header = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.products.selectedCategory);
  const navigate = useNavigate();

  const handleCategoryChange = (category) => {
    dispatch(setItemsAndCategory({ items: [], selectedCategory: category }));
  };


  return (
    <div className="header flex justify-between items-center">
     <img className="backArrow" onClick={() => navigate(-1)} src={back} alt="" />

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
            className={`products__li ${selectedCategory === 'Hogar' ? 'selected' : ''}`}
            onClick={() => handleCategoryChange('Hogar')}
          >
          Hogar
        </li>
      </ul>

      <div className="header__input relative flex items-center">
        <input className="products__search w-[100%]" type="text" />
        <img className="absolute object-contain w-6 left-2" src={search} alt="" />
      </div>

      <div className="flex gap-6">
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
      </div>
    </div>
  );
};

export default Header;
