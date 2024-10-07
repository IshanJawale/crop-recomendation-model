import { plantationChat } from "../../services/gemini/plantationChat.js";

export const plantationChatController = async (req, res) => {
  try {
    const { plantationId, message, chatId } = req.body;
    if (!plantationId || !message) {
      return res.status(400).json({ message: "Invalid input data" });
    }
    const userId = req.user.uid;
    const response = await plantationChat(
      userId,
      plantationId,
      message,
      chatId
    );

    res.status(200).json({ response });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
