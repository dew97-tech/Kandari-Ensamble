import { readFileSync, writeFileSync } from "fs";
import bcrypt from "bcrypt";

export default function handler(req, res) {
   if (req.method === "POST") {
      const { username, password } = req.body;

      let registeredUsers = [];
      let loggedUsers = [];

      try {
         const data = readFileSync("./db.json");
         registeredUsers = JSON.parse(data).registeredUser;
         loggedUsers = JSON.parse(data).loggedUser;
      } catch (err) {
         console.error(err);
         return res.status(500).json({ message: "Internal server error" });
      }

      const registeredUser = registeredUsers.find(
         (user) => user.name === username
      );
      if (registeredUser) {
         bcrypt.compare(password, registeredUser.password, (err, result) => {
            if (err) {
               console.error(err);
               return res
                  .status(500)
                  .json({ message: "Internal server error" });
            }

            if (result) {
               const existingUser = loggedUsers.find(
                  (user) => user.name === username
               );

               let updatedUser;

               if (existingUser) {
                  existingUser.lastLogin = new Date().toISOString();
                  const index = loggedUsers.findIndex(
                     (user) => user.name === username
                  );
                  loggedUsers[index] = existingUser;
               } else {
                  const { id, name, email, role } = registeredUser;
                  updatedUser = {
                     id,
                     name,
                     email,
                     role,
                     lastLogin: new Date().toISOString(),
                  };
                  loggedUsers.push(updatedUser);
               }

               //    const updatedLoggedUsers = [...loggedUsers, updatedUser];

               const dbData = {
                  ...JSON.parse(readFileSync("./db.json")),
                  loggedUser: loggedUsers,
               };

               writeFileSync("./db.json", JSON.stringify(dbData));
               // console.log("Logged in successfully", dbData);
               return res.status(200).json(updatedUser);
            } else {
               console.log("Invalid password");
               return res
                  .status(401)
                  .json({ message: "Invalid username or password" });
            }
         });
      } else {
         console.log("User not found");
         return res
            .status(401)
            .json({ message: "Invalid username or password" });
      }
   } else {
      res.setHeader("Allow", ["POST"]);
      return res
         .status(405)
         .json({ message: `Method ${req.method} not allowed` });
   }
}
