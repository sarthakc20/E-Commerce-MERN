import { legacy_createStore as createStore } from "redux";
import { combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  deleteReviewsReducer,
  editProductReducer,
  newProductReducer,
  newReviewReducer,
  productDetailsReducer,
  productReducer,
  productReviewsReducer,
} from "./reducer/productReducer";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducer/userReducer";
import { cartReducer } from "./reducer/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  ordersReducer,
} from "./reducer/orderReducer";

const reducer = combineReducers({
  products: productReducer,
  productDetails: productDetailsReducer,
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  newProduct: newProductReducer,
  editProduct: editProductReducer,
  allOrders: allOrdersReducer,
  order: ordersReducer,
  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,
  productReviews: productReviewsReducer,
  deleteReviews: deleteReviewsReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [], // to get cart items if exist in localstorage already, otherwise show the empty array

    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

// import { configureStore, combineReducers } from '@reduxjs/toolkit';
// import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";
// import { productReducer } from './reducer/productReducer';

// const rootReducer = combineReducers({
//     products: productReducer
// });

// let initialState = {};

// const middleware = [thunk];

// const store = configureStore({
//     reducer: rootReducer,
//     preloadedState: initialState,
//     middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middleware),
//     devTools: composeWithDevTools()
// });

// export default store;
