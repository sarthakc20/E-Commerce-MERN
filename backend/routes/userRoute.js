const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  forgotPassword,
  resetPassowrd,
  getUserDetails,
  updatePassword,
  updateProfile,
  getAllUser,
  getSingleUser,
  updateUserRole,
  deleteUser,
} = require("../controller/userController");
const { isAuthenticatedUser, autherizeRole } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);

router.route("/login").post(loginUser);

router.route("/password/forgot").post(forgotPassword);

router.route("/password/reset/:token").put(resetPassowrd);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/password/update").put(isAuthenticatedUser, updatePassword);

router.route("/me/update").put(isAuthenticatedUser, updateProfile);

router
  .route("/admin/users")
  .get(isAuthenticatedUser, autherizeRole("admin"), getAllUser);

router
  .route("/admin/user/:id")
  .get(isAuthenticatedUser, autherizeRole("admin"), getSingleUser)
  .put(isAuthenticatedUser, autherizeRole("admin"), updateUserRole)
  .delete(isAuthenticatedUser, autherizeRole("admin"), deleteUser);

module.exports = router;
