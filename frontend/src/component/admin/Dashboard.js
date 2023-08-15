import React, { useEffect } from "react";
import Sidebar from "./Sidebar.js";
import MetaData from "../layout/MetaData";
import "./Dashboard.css";
import { Typography } from "@mui/material";
import { Doughnut, Line } from "react-chartjs-2";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Chart as ChartJS, registerables } from "chart.js";
import { getAdminProducts } from "../../actions/productAction.js";
import { getAllOrders } from "../../actions/orderAction.js";
ChartJS.register(...registerables);

const Dashboard = () => {

  const dispatch = useDispatch();

  const { products } = useSelector((state) => state.products);

  const { orders } = useSelector((state) => state.allOrders);

  const { users } = useSelector((state) => state.allUsers);

  let outOfStock = 0;

  products &&
    products.forEach((item) => {
      if (item.stock === 0) {
        outOfStock += 1;
      }
    });

  let inStock = products.length - outOfStock;

  useEffect(() => {
    dispatch(getAdminProducts());

    dispatch(getAllOrders());
  }, [dispatch]);

  let totalAmount = 0;
  orders &&
    orders.forEach((item) => {
      totalAmount += item.totalPrice;
    });

  const lineState = {
    labels: ["Initial Amount", "Amount Earned"],
    datasets: [
      {
        label: "TOTAL AMOUNT",
        backgroundColor: ["tomato"],
        hoverBackgroundColor: ["rgb(197, 72, 49)"],
        data: [0, totalAmount],
      },
    ],
  };

  const doughnutState = {
    labels: ["Out of Stock", "In Stock"],
    datasets: [
      {
        backgroundColor: ["#dc9094", "#EB526B"],
        hoverBackgroundColor: ["#FFA8AD", "#CB4C60"],
        data: [outOfStock, inStock],
      },
    ],
  };

  return (
    <>
      <MetaData title={`Admin Dashboard`} />
      <div className="dashboard">
        <Sidebar />

        <div className="dashboardContainer">
          <Typography component="h1">Dashboard</Typography>

          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> ₹{totalAmount.toFixed(2)}
              </p>
            </div>
            <div className="dashboardSummaryBox2">
              <Link to="/admin/products">
                <p>Products</p>
                <p>{products && products.length}</p>
              </Link>
              <Link to="/admin/orders">
                <p>Orders</p>
                <p>{orders && orders.length}</p>
              </Link>
              <Link to="/admin/users">
                <p>Users</p>
                <p>{users && users.length}</p>
              </Link>
            </div>
          </div>

          <div className="lineChart">
            <Line data={lineState} />
          </div>

          <div className="doughnutChart">
            <Doughnut data={doughnutState} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
