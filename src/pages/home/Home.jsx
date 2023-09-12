import React from 'react';
import './home.scss'
import user from '../../assets/user.png'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setItemsAndCategory } from "../../redux/store/products/productsReducer";


const Home = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const goProducts = (category) => {

        console.log('Categoría en Home:', category);
        dispatch(setItemsAndCategory({ items: [], selectedCategory: category }));
        navigate('/products');
    }


    return (
        <div className='home flex flex-col items-center my-4 mx-10 gap-4 relative'>
            <img className="w-6 absolute right-10 top-8 cursor-pointer" onClick={() => navigate('/login')} src={user} alt="" />
            <h1 className='text-[70px] font-bold'>OASIS</h1>
            <div className='flex gap-8 w-full'>
                <div onClick={() => goProducts('Mujer')} className='w-[23%] relative flex justify-center'>
                    <img className="home__image" src="https://img.freepik.com/foto-gratis/joven-mujer-bonita-morena-posando-fondo-marmol-beige-vistiendo-pantalones-cortos-lino-beige-bolso-lujo-cuero-caramelo-camisa-blanca-accesorios-dorados-traje-estilo-callejero_291049-1753.jpg?w=360&t=st=1694128326~exp=1694128926~hmac=5bee90fe1de0a371b76195315967334df7e9a2859157309d19714b61fe95666d" alt="" />
                    <span className='font-semibold'>MUJER</span>
                </div>
                <div onClick={() => goProducts('Hombre')} className='w-[23%] relative flex justify-center'>
                    <img className="home__image" src="https://img.freepik.com/foto-gratis/retrato-guapo-sonriente-elegante-hipster-lumbersexual-empresario-modelo-hombre-vestido-ropa-chaqueta-jeans_158538-1740.jpg?w=900&t=st=1694128392~exp=1694128992~hmac=9f458c8a7feccfa222c0bb19de2d3a07af409d18edad154647bfdc7cde4de20b" alt="" />
                    <span className='font-semibold'>HOMBRE</span>
                </div>
                <div onClick={() => goProducts('Niños')} className='w-[23%] relative flex justify-center'>
                    <img className="home__image" src="https://img.freepik.com/foto-gratis/ninos-tiro-completo-posando-juntos_23-2149853383.jpg?size=626&ext=jpg&ga=GA1.1.1065096577.1685206262&semt=ais" alt="" />
                    <span className='font-semibold'>NIÑOS</span>
                </div>
                <div onClick={() => goProducts('Hogar')} className='w-[23%] relative flex justify-center'>
                    <img className="home__image" src="https://img.freepik.com/foto-gratis/decoracion-interior-espejo-planta-maceta_23-2149428031.jpg?w=360&t=st=1694130543~exp=1694131143~hmac=e38aa64ad17b7b75f36ce978063c7aecedf5df5cb33df6494e9c6007ce166cbd" alt="" />
                    <span className='font-semibold'>HOGAR</span>
                </div>
            </div>
        </div>
    )
}

export default Home