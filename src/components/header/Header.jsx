import React from 'react'
import back from '../../assets/back.png'
import search from '../../assets/search.png'
import bag from '../../assets/bag.png'
import heart from '../../assets/heart.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center">
      <img className="w-4 object-contain cursor-pointer" onClick={() => navigate(-1)} src={back} alt="" />

      <ul className="flex gap-5 font-semibold">
        <li className="products__li selected">Mujer</li>
        <li className="products__li">Hombre</li>
        <li className="products__li">Niños</li>
        <li className="products__li">Hogar</li>
      </ul>

      <div className="relative flex items-center w-[30%]">
        <input className="products__search w-[100%]" type="text" />
        <img className=" absolute object-contain w-6 left-2" src={search} alt="" />
      </div>

      <div className="flex gap-6">
        <img className="w-7 object-contain cursor-pointer" onClick={() => navigate('/favorites')} src={heart} alt="" />
        <img className="w-5 object-contain cursor-pointer" onClick={() => navigate('/cart')} src={bag} alt="" />
      </div>
    </div>
  )
}



export default Header;
