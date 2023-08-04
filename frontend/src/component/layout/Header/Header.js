import React from "react";
import { ReactNavbar } from "overlay-navbar";
import { RiAccountPinBoxLine } from "react-icons/ri";
import { MdSearch } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import logo from "../../../images/logo.png";

const options = {
  burgerColor: "#ADEFD1FF",
  burgerColorHover: "#F7D8BA",
  logo,
  logoWidth: "20vmax",
  navColor1: "#FFFEFA",
  logoHoverSize: "10px",
  logoHoverColor: "#F7D8BA",
  link1Text: "Home",
  link2Text: "Products",
  link3Text: "Contact",
  link4Text: "About",
  link1Url: "/",
  link2Url: "/products",
  link3Url: "/contact",
  link4Url: "/about",
  link1Size: "1.3vmax",
  link1Color: "rgba(35, 35, 35,0.8)",
  nav1justifyContent: "flex-end",
  nav2justifyContent: "flex-end",
  nav3justifyContent: "flex-start",
  nav4justifyContent: "flex-start",
  link1ColorHover: "#F7D8BA",
  link1Margin: "1vmax",

  profileIcon: true,
//   profileIconColor: "rgba(35, 35, 35,0.8)",
  ProfileIconElement: RiAccountPinBoxLine,
  searchIcon: true,
//   searchIconColor: "rgba(35, 35, 35,0.8)",
  SearchIconElement: MdSearch,
  cartIcon: true,
//   cartIconColor: "rgba(35, 35, 35,0.8)",
  CartIconElement: BsCart4,

  profileIconUrl: "/login",
  profileIconColor: "rgba(35, 35, 35,0.8)",
  searchIconColor: "rgba(35, 35, 35,0.8)",
  cartIconColor: "rgba(35, 35, 35,0.8)",
  profileIconColorHover: "#F7D8BA",
  searchIconColorHover: "#F7D8BA",
  cartIconColorHover: "#F7D8BA",
  cartIconMargin: "1vmax",
};

const Header = () => {
  return <ReactNavbar {...options} />;
};

export default Header;
