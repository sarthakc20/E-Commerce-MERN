import React, { useEffect, useState } from "react";
import "./Products.css";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useAlert } from "react-alert";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import { Typography } from "@mui/material";
import Slider from "@mui/material/Slider";

const categories = [
  "Laptop", "Footware", "Bottom", "Tops", "Attire", "Camera", "SmartPhones", "All"
];

const Products = () => {
  
  const alert = useAlert();

  const { keyword } = useParams();

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);

  const [price, setPrice] = useState([0, 250000]);

  const [category, setCategory] = useState("");

  const [ratings, setRatings] = useState(0);

  const { loading, error, products, productsCount, resultPerPage, filteredProductsCount} =
    useSelector((state) => state.products);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };



  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage, price, category, ratings));
  }, [dispatch, error, alert, keyword, currentPage, price, category,ratings]);

  let count = filteredProductsCount;

  return (
    <>
      <div className="filterBox">
        <Typography>Price</Typography>
        <Slider className="centered-slider"
          size="small"
          value={price}
          onChange={priceHandler}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={250000}
        />

        <Typography>Categories</Typography>
        <ul className="categoryBox">
          {categories.map((category) => (
            <li
            className="category-link"
            key={category}
            onClick={() => setCategory(category)}
            >
              {category} 
            </li>
          ))}
        </ul>

        <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider className="centered-slider"
                size="small"
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
      </div>

      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title={`Products (${currentPage}) - E MARKET`} />
          <h2 className="productsHeading">Products</h2>

          <h3 className="productFound">{count<1 ? "No Product Found" : count<2 ? "We Have 1 Product" : `We Have ${count} Products`} !</h3>

          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="First"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Products;
