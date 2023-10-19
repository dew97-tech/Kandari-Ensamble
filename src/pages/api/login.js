import { connectToDatabase } from "@/src/dbConfig/dbConfig";
import User from "@/src/models/userModel";
import bcrypt from "bcrypt";

export default async function handler(req, res) {
   if (req.method === "POST") {
      const { username, password } = req.body;

      try {
         // Connect to the database
         const db = await connectToDatabase();

         // Find the user by email
         const user = await User.findOne({ username });

         // If the user is not found, return an error
         if (!user) {
            return res
               .status(401)
               .json({ message: "Invalid username or password" });
         }

         // Validate the password
         const isValidPassword = await bcrypt.compare(password, user.password);

         // If the password is invalid, return an error
         if (!isValidPassword) {
            return res
               .status(401)
               .json({ message: "Invalid username or password" });
         }
         console.log("User LoggedIn Successfully", user);
         // Close the database connection
         db.disconnect();

         // Return the logged-in user
         return res.status(200).json(user);
      } catch (err) {
         console.error(err);
         return res.status(500).json({ message: "Internal server error" });
      }

      // If the request method is not POST, return an error
   } else {
      res.setHeader("Allow", ["POST"]);
      return res
         .status(405)
         .json({ message: `Method ${req.method} not allowed` });
   }
}
