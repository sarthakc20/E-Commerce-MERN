import React from "react";
import { BiCommentError } from "react-icons/bi";
import "./NotFound.css";
import { Link } from "react-router-dom";
import { Typography } from "@mui/material";
import MetaData from "../MetaData";

const NotFound = () => {
  return (
    <>
    <MetaData title={`404 Not Found`} />
    <div className="PageNotFound">
      <BiCommentError />

      <Typography>Page Not Found </Typography>
      <Link to="/">Home</Link>
    </div>
    </>
  );
};

export default NotFound;