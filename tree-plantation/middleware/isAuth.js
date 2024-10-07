import { admin } from "../config/firebase.js";
import jwt from "jsonwebtoken";
import { generateIdToken } from "../testing/generateIdToken.js";
const secret = "1234567890";
const isAuthenticated = async (req, res, next) => {
  let token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  try {
    const mode = String(process.env.MODE);
    //For testing
    if (mode == "development") {
      //FOR TESTING WE ARE USING JWT
      const decodedToken = jwt.verify(token, secret, { algorithms: ["HS256"] });
      console.log("isAuthenticated :: decodedToken", decodedToken);
      //Update the token with the id token
      token = await generateIdToken(decodedToken.id);
    }
    const decodedToken = await admin.auth().verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("isAuthenticated :: error", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export default isAuthenticated;
