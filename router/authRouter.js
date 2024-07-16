import Express from "express";
import { authlogin, getUser, authSignup } from "../Controllers/authController.js";

const authrouter = Express.Router();

authrouter.route("/login").post(authlogin);
authrouter.route("/signup").post(authSignup);
authrouter.route("/getauser/:id").get(getUser);



export default authrouter;