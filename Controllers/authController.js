import authSchema from "../model/authSchema.js";
import { comparePassword, jwtGenrator } from "../utils/index.js";

const authlogin = async (req, res) => {
    try {
      //check if all required data i provided
      if (!req.body.email|| !req.body.password) {
        return res.status(400).json({ message: "Please fill all fields" });
      }
      const userExists = await authSchema.findOne({
        email: req.body.email,
      });
      if (!userExists) {
        //check if user exists
        return res.status(409).json({ message: "user does'nt exist" });
      }
      //comparing the entered password with the hashed password
      const passwordMatch = await comparePassword(
        req.body.password,
        userExists.password
      );
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
      const token = jwtGenrator({
        payload: { id: userExists._id, email: userExists.email},
      });
      res.cookie("token", token, {
        httpOnly: false,
        secure: true,
        maxAge: 1000 * 60 * 60 * 24,
      });
      // Return JWT token in response
      return res
        .status(201)
        .json({ "Status": "Success","message": "User logged in successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Login failed", err: err.message });
    }
};

const getUser = async (req, res) => {
  try {
    const id = req.params.id
    const User = await authSchema.find({ _id : id});
    if (!User) res.json({Status : false, message:"User not found"})
    res.json({ User });
  }catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const authSignup = async(req,res) =>{
  try {
    if (
      !req.body.firstname ||
      !req.body.lastname ||
      !req.body.email ||
      !req.body.password
    ) {
      return res
        .status(400)
        .json({ message: "Please fill all required field" });
    }
    const isExisting = await authSchema.findOne({
      email: req.body.email,
    });
    if (isExisting) {
      return res.status(400).json({ message: "User already exists" });
    }
    await authSchema.create(req.body);
    res.status(201).json({ "Status": "Success","message": "User created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}

export { authlogin, getUser, authSignup };