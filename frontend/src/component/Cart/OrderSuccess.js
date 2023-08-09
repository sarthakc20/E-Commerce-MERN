import React from "react";
import { FiCheckCircle } from "react-icons/fi";
import "./OrderSuccess.css";
import { Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import MetaData from "../layout/MetaData";
import Loader from "../layout/Loader/Loader";

const OrderSuccess = () => {
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  return (
    <>
      {loading || !isAuthenticated ? (
        <Loader />
      ) : (
        <>
          <MetaData title={"Confirm Order"} />
          <div className="orderSuccess">
            <FiCheckCircle />

            <Typography>
              {user.name ? `${user.name.split(" ")[0]}` : "Loading..."}, Your
              order has been placed successfully{" "}
            </Typography>
            <Link to="/orders">View Orders</Link>
          </div>
        </>
      )}
    </>
  );
};

export default OrderSuccess;
