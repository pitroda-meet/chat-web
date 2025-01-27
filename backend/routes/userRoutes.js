import express from "express";
import {
  addContact,
  contactUser,
  login,
  logout,
  register,
  verifyUser,
} from "../controllers/userController.js";
import isAuthenticated from "../middeleware/isAuthenticated.js";

const router = express.Router();

//router.post("register", register);
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/addcontact").post(isAuthenticated, addContact);
router.route("/contacts").get(isAuthenticated, contactUser);
router.route("/verify").get(isAuthenticated, verifyUser);

export default router;
