import React from 'react'
import { useNavigate } from 'react-router-dom'
import comunity from '../../assets/comunity.png'
import home from '../../assets/home.png'
import user from '../../assets/user.png'
import './options.scss'

const Options = () => {
    const navigate = useNavigate();
    return (
        <div className='flex gap-4'>
            <img className='options' onClick={() => navigate('/')} src={home} alt="" />
            <img className='options' onClick={() => navigate('/login')} src={user} alt="" />
            <img className='options comunity' onClick={() => navigate('/blog')} src={comunity} alt="" />
        </div>
    )
}

export default Options