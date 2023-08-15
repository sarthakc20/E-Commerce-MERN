import React, { useEffect, useState } from "react";
import { MdCategory } from "react-icons/md";
import { MdDescription } from "react-icons/md";
import { FaDatabase } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { BiSolidDollarCircle } from "react-icons/bi";
import Sidebar from "./Sidebar";
import MetaData from "../layout/MetaData";
import { Button } from "@mui/material";
import { useAlert } from "react-alert";
import {
  clearErrors,
  updateProduct,
  getProductDetails,
} from "../../actions/productAction";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../constants/productConstants";
import Loader from "../layout/Loader/Loader";

const UpdateProduct = () => {
  const alert = useAlert();

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const {
    loading,
    error: updateError,
    isUpdated,
  } = useSelector((state) => state.editProduct);

  const { error, product } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [stock, setStock] = useState(0);
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const categories = [
    "Laptop",
    "Footwear",
    "Bottom",
    "Tops",
    "Attire",
    "Camera",
    "SmartPhones",
  ];

  const { id } = useParams();

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setDescription(product.description);
      setPrice(product.price);
      setCategory(product.category);
      setStock(product.stock);
      setOldImages(product.images);
    }

    // if (product) {
    //   setName(product.name);
    //   setDescription(product.description);
    //   setPrice(product.price);
    //   setCategory(product.category);
    //   setStock(product.stock);
    //   setOldImages(product.images);
    // }

    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    if (updateError) {
      alert.error(updateError);
      dispatch(clearErrors());
    }

    if (isUpdated) {
      alert.success("Product Updated Successfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [
    dispatch,
    alert,
    error,
    navigate,
    updateError,
    isUpdated,
    id,
    product,
  ]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("price", price);
    myForm.set("description", description);
    myForm.set("category", category);
    myForm.set("stock", stock);

    images.forEach((image) => {
      myForm.append("images", image);
    });
    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const files = Array.from(e.target.files);
    // Array.from creates a copy of an array

    setImages([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImages((old) => [...old, reader.result]);
        }
      };

      reader.readAsDataURL(file);
    });
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Update Product - Admin" />
          <div className="dashboard">
            <Sidebar />
            <div className="newProductContainer">
              <form
                className="createProductForm"
                encType="multipart/form-data"
                onSubmit={updateProductSubmitHandler}
              >
                <h1>Update Product</h1>

                <div>
                  <BsPencilSquare />
                  <input
                    type="text"
                    placeholder="Product Name"
                    required
                    name="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div>
                  <BiSolidDollarCircle />
                  <input
                    type="number"
                    placeholder="Price"
                    required
                    name="price"
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                  />
                </div>

                <div>
                  <MdDescription />

                  <textarea
                    placeholder="Product Description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    cols="30"
                    rows="1"
                  ></textarea>
                </div>

                <div>
                  <MdCategory />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option value="">Choose Category</option>
                    {categories.map((cate) => (
                      <option key={cate} value={cate}>
                        {cate}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <FaDatabase />
                  <input
                    type="number"
                    placeholder="Stock"
                    required
                    onChange={(e) => setStock(e.target.value)}
                    value={stock}
                  />
                </div>

                <div id="createProductFormFile">
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={updateProductImagesChange}
                    multiple
                  />
                </div>

                <div id="createProductFormImage">
                  {oldImages &&
                    oldImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt="Old Product Preview"
                      />
                    ))}
                </div>

                <div id="createProductFormImage">
                  {imagesPreview.map((image, index) => (
                    <img key={index} src={image} alt="Product Preview" />
                  ))}
                </div>

                <Button
                  id="createProductBtn"
                  type="submit"
                  disabled={loading ? true : false}
                >
                  Update
                </Button>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default UpdateProduct;
