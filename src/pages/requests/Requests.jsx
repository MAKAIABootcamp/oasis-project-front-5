import React from 'react'
import './requests.scss'
import Header from '../../components/header/Header'
import Sidebar from "../../components/sidebar/Sidebar";

const Requests = () => {
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

export default Requests; 