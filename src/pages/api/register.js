// pages/api/register.js

import { readFileSync, writeFileSync } from "fs";
import bcrypt from "bcrypt";

export default async (req, res) => {
   if (req.method === "POST") {
      const { name, email, password, whyJoin } = req.body;

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Read existing user data
      let registeredUsers = [];
      try {
         const data = readFileSync("./db.json");
         registeredUsers = JSON.parse(data).registeredUser;
         // console.log(registeredUsers);
      } catch (err) {
         res.status(404).json({ message: "Can not read the file" });
         console.error(err);
      }

      // Create new user
      const newUser = {
         id: registeredUsers.length + 1,
         name,
         email,
         password: hashedPassword,
         whyJoin,
         role: "user",
         createdAt: new Date().toISOString(),
         updatedAt: new Date().toISOString(),
      };
      // Spread existing users and add new user
      const updatedUsers = [...registeredUsers, newUser];

      // Write updated data
      const dbData = {
         ...JSON.parse(readFileSync("./db.json")),
         registeredUser: updatedUsers,
      };
      // console.log(dbData);
      writeFileSync("./db.json", JSON.stringify(dbData));

      // Rest of logic...

      res.status(200).json({ message: "Registered successfully" });
   } else {
      res.status(405).json({ message: `Method ${req.method} not allowed` });
   }
};
