import React from 'react'
import { Helmet } from 'react-helmet'

const ButtonEpayco = () => {
    return (
    <div>
    <Helmet>
    <script src='https://checkout.epayco.co/checkout.js'></script>
    </Helmet>
    
    <form>
    <button
              className='epayco-button'
              data-epayco-key='86c6155088028aa107d0d9ad2240ebbd'
              data-epayco-amount= '100000'
              data-epayco-tax='0.00'
              data-epayco-tax-ico='0.00'
              data-epayco-tax-base='0.00'
              data-epayco-name= 'Neis'
              data-epayco-description='Compra artesanías'
              data-epayco-currency='cop'
              data-epayco-country='CO'
              data-epayco-test='true'
              data-epayco-external='false'
              data-epayco-response=''
              data-epayco-confirmation=''
              data-epayco-acepted='http://localhost:5173/confirmation'
              data-epayco-button='https://multimedia.epayco.co/dashboard/btns/btn3.png'
              data-epayco-email-billing='neis@gmailcom'
              data-epayco-name-billing= 'Neis'
              data-epayco-address-billing='CTg cra 24'
    ></button>
    </form>
    </div>
)}

export default ButtonEpayco