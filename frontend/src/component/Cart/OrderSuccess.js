import React from 'react'
import { FiCheckCircle } from "react-icons/fi";
import "./OrderSuccess.css"
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import MetaData from "../layout/MetaData";

const OrderSuccess = () => {

    const { user } = useSelector((state) => state.user);

  return (
    <>
    <MetaData title={"Confirm Order"} />
    <div  className="orderSuccess">
      <FiCheckCircle />

      <Typography>{user.name ? `${user.name.split(" ")[0]}` : "Loading..."}, Your order has been placed successfully </Typography>
      <Link to="/orders">View Orders</Link>
    </div>
    </>
  )
}

export default OrderSuccess
