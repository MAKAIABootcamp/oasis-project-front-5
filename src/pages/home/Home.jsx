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
                    <img className="home__image" src="https://img.freepik.com/foto-gratis/retrato-hermosa-mujer-morena-sensual-chica-ropa-clasica-beige-elegante-pantalones-anchos-modelo-aislado-blanco_158538-9432.jpg?w=740&t=st=1694619167~exp=1694619767~hmac=eaa8681d77b9038bf91597cbdcc4b7e8b8f3acae5ad6a49ec03c1b673a6a0ed8" alt="" />
                    <span className='font-semibold'>MUJER</span>
                </div>
                <div onClick={() => goProducts('Hombre')} className='w-[23%] relative flex justify-center'>
                    <img className="home__image" src="https://img.freepik.com/foto-gratis/retrato-guapo-modelo-lambersexual-hipster-estilo-seguro-hombre-vestido-sueter-verde-jeans-hombre-moda-posando-estudio-cerca-pared-gris_158538-23991.jpg?w=900&t=st=1694615324~exp=1694615924~hmac=a35c306c365bddd581f53b4671db8e1f1be91688f17bafeaf0d91f7c7d82bfba" alt="" />
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