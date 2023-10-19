// pages/api/register.js
import bcrypt from "bcrypt";
import { connectToDatabase } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";

export default async (req, res) => {
   if (req.method === "POST") {
      const { name, email, password, whyJoin } = req.body;

      try {
         // Connect To Datrabase
         const db = await connectToDatabase();
         // Access the "RegisteredUsers" collection
         // Validate the passowrd
         if (password.length < 6) {
            return res
               .status(400)
               .json({
                  message: "Password must be at least 6 characters long",
               });
         }
         // Check if the email already exists
         const existingEmail = await User.findOne({ email });
         if (existingEmail) {
            return res
               .status(400)
               .json({ message: "User with this email already exists" });
         }
         // Check if the username is unique
         const existingUser = await User.findOne({ username: name });
         if (existingUser) {
            return res
               .status(400)
               .json({ message: "Username is already taken" });
         }
         // Hash password
         const hashedPassword = await bcrypt.hash(password, 10);
         // Create A New User Document
         const newUser = new User({
            username: name,
            email,
            password: hashedPassword,
            whyJoin,
         });

         // Save the new user document to the "RegisteredUsers" collection
         await newUser.save();

         res.status(200).json({ message: "Registered successfully" });
      } catch (error) {
         res.status(500).json({ message: "Server error" });
         console.error(error);
      }
   } else {
      res.status(405).json({ message: `Method ${req.method} not allowed` });
   }
};
