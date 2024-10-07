import { getUser } from "../../services/users/getUser.js";

export const getUserController = async (req, res) => {
  try {
    const uid = req?.user?.uid;
    if (!uid || req.user.role !== "user") {
      return res.status(400).send("Bad Request");
    }
    const user = await getUser(uid);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("Error in getUserController", error);
    res.status(500).send("Internal Server Error");
  }
};
