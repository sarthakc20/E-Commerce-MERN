const express = require("express");
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProducts,
  getProductDetails,
  createProductReview,
  getProductReview,
  deleteProductReview,
} = require("../controller/productController");
const { isAuthenticatedUser, autherizeRole } = require("../middleware/auth");

const router = express.Router();

router.route("/products").get(getAllProducts);

router.route("/admin/product/new")
  .post(isAuthenticatedUser, autherizeRole("admin"), createProduct);

router.route("/admin/product/:id")
  .put(isAuthenticatedUser, autherizeRole("admin"), updateProduct)
  .delete(isAuthenticatedUser, autherizeRole("admin"), deleteProducts);

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser, createProductReview);

router.route("/reviews")
  .get(getProductReview)
  .delete(isAuthenticatedUser, deleteProductReview);

module.exports = router;
