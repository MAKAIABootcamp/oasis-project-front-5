import React from 'react'
import { useNavigate } from 'react-router-dom'
import comunity from '../../assets/comunity.png'
import home from '../../assets/home.png'
import user from '../../assets/user.png'

const Options = () => {
    const navigate = useNavigate();
    return (
        <div className='flex gap-4'>
            <img className='w-4 object-contain cursor-pointer' onClick={() => navigate('/')} src={home} alt="" />
            <img className='w-4 object-contain cursor-pointer' onClick={() => navigate('/login')} src={user} alt="" />
            <img className='w-6 object-contain cursor-pointer' src={comunity} alt="" />
        </div>
    )
}

export default Options