import React, { useState } from "react";
import "./Header.css";
import { Backdrop } from "@mui/material";
import { SpeedDial, SpeedDialAction } from "@mui/material";
import profilelogo from "../../../images/user.png";
import { RiDashboardFill } from "react-icons/ri";
import { BsCartFill } from "react-icons/bs";
import { BsFillPersonFill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { FaList } from "react-icons/fa";
import { MdLogout } from "react-icons/md";
import { AiFillHome } from "react-icons/ai";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import { logout } from "../../../actions/userAction";

const UserOptions = ({ user }) => {
  const { cartItems } = useSelector((state) => state.cart);

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  const location = useLocation();

  const dispatch = useDispatch();
  const alert = useAlert();

  const options = [
    { icon: <FaList />, name: "Orders", func: orders },
    { icon: <FaSearch />, name: "Search", func: search },
    { icon: <BsFillPersonFill />, name: "Profile", func: account },
    {
      icon: (
        <BsCartFill
          style={{ color: cartItems.length > 0 ? "#fa8163f6" : "unset" }}
        />
      ),
      name: `Cart (${cartItems.length})`,
      func: cart,
    },
    { icon: <MdLogout />, name: "Logout", func: logoutUser },
  ];

  if (user.role === "admin") {
    options.unshift({
      icon: <RiDashboardFill />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  if (location.pathname !== "/") {
    options.unshift({
      icon: <AiFillHome />,
      name: "Home",
      func: home,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }

  function home() {
    navigate("/");
  }

  function orders() {
    navigate("/orders");
  }

  function search() {
    navigate("/search");
  }

  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }

  function logoutUser() {
    dispatch(logout());
    alert.success("Logout Successfully");
  }

  return (
    <>
      <Backdrop open={open} style={{ zIndex: "10" }} />
      <SpeedDial
        className="speedDial"
        ariaLabel="SpeedDial tooltip example"
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        style={{ zIndex: "11" }}
        open={open}
        direction="down"
        icon={
          <img
            className="speedDialIcon"
            src={user.avatar.url ? user.avatar.url : profilelogo}
            alt="Profile"
          />
        }
      >
        {options.map((item) => (
          <SpeedDialAction
            key={item.name}
            icon={item.icon}
            tooltipTitle={item.name}
            onClick={item.func}
            tooltipOpen={window.innerWidth <= 600 ? true : false}
          />
        ))}
      </SpeedDial>
    </>
  );
};

export default UserOptions;
