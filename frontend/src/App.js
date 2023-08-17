import "./App.css";
import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import Header from "./component/layout/Header/Header";
import Footer from "./component/layout/Footer/Footer";
import Home from "./component/Home/Home";
import WebFont from "webfontloader";
import ProductDetails from "./component/Product/ProductDetails";
import Products from "./component/Product/Products";
import Search from "./component/Product/Search";
import LoginSignUp from "./component/User/LoginSignUP";
import UserOptions from "./component/layout/Header/UserOptions";
import Profile from "./component/User/Profile";
import ProtectedRoute from "./component/Route/ProtectedRoute";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import OrderDEtails from "./component/Order/OrderDEtails";
import Dashboard from "./component/admin/Dashboard";
import ProductList from "./component/admin/ProductList";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/OrderList";
import ProcessOrder from "./component/admin/ProcessOrder";
import UsersList from "./component/admin/UsersList";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";
import store from "./store";
import { loadUser } from "./actions/userAction";
import axios from "axios";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);

  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");

      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      // error
    }
  }

  useEffect(() => {

    WebFont.load({
      google: {
        families: ["Roboto", "Droid Sans", "Chilanka"],
      },
    });

    store.dispatch(loadUser());

    getStripeApiKey();
  }, []);

  // window.addEventListener("contextmenu", (e) => e.preventDefault()); // prevent to right click

  return (
    <>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />

        {/* Protected Routes */}
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/account" element={<Profile />} />
          <Route path="/me/update" element={<UpdateProfile />} />
          <Route path="/password/update" element={<UpdatePassword />} />
          <Route path="/shipping" element={<Shipping />} />
          <Route path="/order/confirm" element={<ConfirmOrder />} />
          {stripeApiKey && (
            <Route
              path="/process/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <Payment />
                </Elements>
              }
            />
          )}
          <Route path="/success" element={<OrderSuccess />} />
          <Route path="/orders" element={<MyOrders />} />
          <Route path="/order/:id" element={<OrderDEtails />} />
        </Route>

        {/* Admin Routes */}
        <Route element={<ProtectedRoute isAdmin={true} />}>
        <Route  path="/admin/dashboard" element={<Dashboard />} />
        <Route  path="/admin/products" element={<ProductList />} />
        <Route  path="/admin/product" element={<NewProduct />} />
        <Route  path="/admin/product/:id" element={<UpdateProduct />} />
        <Route  path="/admin/orders" element={<OrderList />} />
        <Route  path="/admin/orders/:id" element={<ProcessOrder />} />
        <Route  path="/admin/users" element={<UsersList />} />
        <Route  path="/admin/user/:id" element={<UpdateUser />} />
        <Route  path="/admin/reviews" element={<ProductReviews />} />
        </Route>

        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
