import React from 'react'
import './sales.scss'
import Header from '../../components/header/Header'
import Sidebar from "../../components/sidebar/Sidebar";

const Sales = () => {
    return (
        <div>
            <Header showSearchBar={false} />
            <div className="products">
                <div className="products__container">
                    <Sidebar />
                </div>
            </div>
        </div>
    )
}

export default Sales