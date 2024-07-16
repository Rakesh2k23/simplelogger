import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";

const User = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validator: {
        validate: (value) => validator.isEmail(value),
        message: "Email is not valid",
      },
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
    },
    firstname: {
      type: String,
      minlength: 3,
    },
    lastname: {
      type: String,
      minlength: 3,
    },
  },

  { timestamps: true }
);

User.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

const authSchema = mongoose.model("authUser", User);

export default authSchema;