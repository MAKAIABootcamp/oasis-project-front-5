import React from 'react'
import './addProducts.scss'
import Header from '../../components/header/Header'
import Sidebar from "../../components/sidebar/Sidebar";

const AddProducts
 = () => {
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

export default AddProducts