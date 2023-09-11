import React from 'react'
import back from '../../assets/back.png'
import search from '../../assets/search.png'
import bag from '../../assets/bag.png'
import like from '../../assets/like.png'
import { useNavigate } from 'react-router-dom'

const Header = () => {

  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1)
  }

  return (
    <div className="flex justify-between items-center">
      <img className="w-4 object-contain cursor-pointer" onClick={goBack} src={back} alt="" />

      <ul className="flex gap-5">
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
        <img className="w-7 object-contain cursor-pointer" src={like} alt="" />
        <img className="w-5 object-contain cursor-pointer" src={bag} alt="" />
      </div>
    </div>
  )
}



export default Header;
