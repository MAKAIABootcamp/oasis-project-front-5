import React from 'react'
import home from '../../assets/home.png'
import './oasis.scss'
import { useNavigate } from 'react-router-dom'

const Oasis = () => {

    const navigate = useNavigate();

    return (
        <div className='oasis relative'>
            <img className='oasis__home' onClick={() => navigate('/')} src={home} alt="" />
            <div className='oasis__container'>
                <div className='flex flex-col'>
                    <h1 className='oasis__title'>OASIS</h1>
                </div>
                <p>
                    OASIS es una aplicación diseñada para abordar el problema de nuestra era: la insostenibilidad de la industria de la moda. Esta industria, conocida por su alto consumo de recursos naturales y su producción de desechos textiles, se encuentra en el centro de la crisis ambiental actual. OASIS tiene como objetivo transformar la forma en que concebimos la moda. Nuestra plataforma promueve activamente la economía circular en el mundo de la moda, ofreciendo a los usuarios la posibilidad de reutilizar prendas de manera eficiente, encontrar ropa fabricada con materiales reciclados y acceder a productos de alta calidad que garanticen durabilidad. Creemos que la moda puede ser sostenible sin comprometer el estilo, y OASIS está aquí para liderar este cambio.
                </p>
            </div>
        </div>
    )
}

export default Oasis