import { Schema, models, model } from "mongoose";

const userSchema = new Schema(
   {
      username: {
         type: String,
         required: [true, "Please enter your name"],
         unique: true,
      },
      email: {
         type: String,
         required: [true, "Please enter your email"],
         unique: true,
      },
      password: {
         type: String,
         required: [true, "Please enter your password"],
      },
      whyJoin: {
         type: String,
         required: true,
      },
      role: {
         type: String,
         default: "user",
      },
   },
   {
      timestamps: true,
   }
);

// Change the model name to `User`
const User = models.User || model("User", userSchema);

export default User;
