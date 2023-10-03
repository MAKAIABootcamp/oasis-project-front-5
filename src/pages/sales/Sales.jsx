import React, { useEffect, useState } from "react";
import "./sales.scss";
import Header from "../../components/header/Header";
import Sidebar from "../../components/sidebar/Sidebar";
import { collection, getDocs } from "firebase/firestore";
import { fireStore } from "../../firebase/firebaseConfig";
import { BarChart, Bar, PieChart, Pie } from "recharts";

const Sales = () => {
  const [salesData, setSalesData] = useState([]);
  const [totalSales, setTotalSales] = useState(0);

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const salesCollection = collection(fireStore, "ventas");
        const querySnapshot = await getDocs(salesCollection);
        const sales = querySnapshot.docs.map((doc) => doc.data());
        console.log("Datos de ventas desde Firestore:", sales);

        const totalSalesAmount = sales.reduce((acc, sale) => {
          if (typeof sale.orderData.cartData[0].price === "number") {
            return acc + sale.orderData.cartData[0].price;
          }
          return acc;
        }, 0);

        console.log("Total de ventas:", totalSalesAmount);

        // Asegúrate de que los datos en salesData son correctos
        console.log("Datos para las gráficas:", sales);

        setSalesData(sales);
        setTotalSales(totalSalesAmount);
      } catch (error) {
        console.error("Error al cargar datos de ventas", error);
      }
    };

    fetchSalesData();
  }, []);

  return (
    <div>
      <Header showSearchBar={false} />
      <div className="products">
        <div className="products__container">
          <Sidebar />
          <div className="sales-container">
            <br />
            <div className="charts flex ">
              <div className="chart">
                <br />
                <BarChart width={190} height={300} data={totalSales}>
                  <Bar dataKey="total" fill="#8884d8" />
                </BarChart>

                <br />
                <span className="text"> Ingreso Total: ${totalSales}</span>
              </div>
              <div className="chart">
                <span className="text">Informe de Ventas</span>
                <PieChart width={300} height={300}>
                  <Pie
                    dataKey="total"
                    isAnimationActive={false}
                    data={salesData.length}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                  />
                </PieChart>
                <br />
                <span className="text">
                  Total de Ventas: {salesData.length}
                </span>
              </div>
            </div>
            <div className="sales-history">
              <h2>Historial de Ventas</h2>
              <table>
                <thead>
                  <tr>
                    <th>Fecha de Venta</th>
                    <th>Nombre del Producto</th>
                    <th>Precio</th>
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
                      <td>${sale.orderData.cartData[0].price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sales;
