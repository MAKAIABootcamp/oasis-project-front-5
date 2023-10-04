import React, { useEffect, useState } from "react";
import "./sales.scss";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../../firebase/firebaseConfig";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalSalesData, setTotalSalesData] = useState([{ total: 0 }]);

  useEffect(() => {

    const fetchSalesData = async () => {
      try {
        const salesCollection = collection(fireStore, "ventas");
        const querySnapshot = await getDocs(salesCollection);
        const sales = querySnapshot.docs.map((doc) => doc.data());
        console.log("Datos de ventas desde Firestore:", sales);

        const totalSalesAmount = sales.reduce((acc, sale) => {
          if (typeof sale.orderData.total === "number") {
            return acc + sale.orderData.total;
          }
          return acc;
        }, 0);

        setTotalSalesData([{ total: totalSalesAmount }]);
        setSalesData(sales);
        setTotalSales(totalSalesAmount);
      } catch (error) {
        console.error("Error al cargar datos de ventas", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div className="sales">
      <Header showSearchBar={false} />
      <div className="products">
        <div className="products__container">
          <Sidebar />
          <div className="sales-container sales__desktop">
            <h2 className="fontGreen title flex self-center mb-8">HISTORIAL DE VENTAS</h2>
            <div className="flex justify-between">
              <p className="text"> Ingreso Total: $ {totalSales}</p>
              <p className="text">Total de Ventas: {salesData.length}</p>
            </div>
            <table className="sales-history">
              <thead>
                <tr>
                  <th>Fecha de Venta</th>
                  <th>Productos</th>
                  <th>Valor de compra</th>
                  <th>Dirección</th>
                  <th>Nombre del cliente</th>
                  <th>Correo</th>
                </tr>
              </thead>
              <tbody>
                {salesData.map((sale, index) => (
                  <tr key={index}>
                    <td>
                      {" "}
                      {new Date(sale.timestamp.toDate()).toLocaleString()}
                    </td>
                    <td>{sale.orderData.cartData[0].name}</td>
                    <td>$ {sale.orderData.total}</td>
                    <td>{sale.orderData.selectedAddress}</td>
                    <td>{sale.orderData.nombre}</td>
                    <td>{sale.orderData.correo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="sales-container sales__responsive">
            <h2 className="fontGreen title flex self-center mb-8">HISTORIAL DE VENTAS</h2>
            <div className="flex justify-between">
              <p className="text"> Ingreso Total: ${totalSales}</p>
              <p className="text">Total de Ventas: {salesData.length}</p>
            </div>
            <div className="sales-history-container mb-[120px]">
              {salesData.map((sale, index) => (
                <div key={index} className="sales__item">
                  <div>
                    <strong>Fecha:</strong><span>{new Date(sale.timestamp.toDate()).toLocaleString()} </span><br />
                  </div>
                  <div>
                    <strong>Productos:</strong> <span>{sale.orderData.cartData[0].name} </span><br />
                  </div>
                  <div>
                    <strong>Valor total:</strong> <span>$ {sale.orderData.total}</span> <br />
                  </div>
                  <div>
                    <strong>Nombre de usuario:</strong> <span>{sale.orderData.nombre} </span><br />
                  </div>
                  <div>
                    <strong>Dirección:</strong> <span>{sale.orderData.selectedAddress}</span> <br />
                  </div>
                  <div>
                    <strong>Correo:</strong> <span>{sale.orderData.correo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Sales;











