import {
  startChatInstance,
  sendMessage,
} from "../../services/gemini/chatbot.js";
import { v4 as uuidv4 } from "uuid";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 10 * 60 }); // 10 minutes
const getChatbotResponse = async (req, res) => {
  const { chatId, prompt } = req.body;
  if (!prompt) {
    return res.status(400).json({ message: "Prompt is required" });
  }
  try {
    let chatInstance;
    let newChatId = chatId;
    let history;
    history = chatId
      ? cache.get(chatId)
        ? await JSON.parse(cache.get(chatId))
        : []
      : [];

    chatInstance = startChatInstance(history);
    if (history == [] || history?.length == 0) {
      newChatId = uuidv4();
      chatInstance = startChatInstance();
    }
    await sendMessage(chatInstance, prompt);
    cache.set(newChatId, JSON.stringify(chatInstance.params.history));
    res.status(200).json({ newChatId, response: chatInstance.params.history });
  } catch (error) {
    console.error(
      "Gemini Test Controller :: getChatbotResponse :: error",
      error
    );
    res.status(500).json({ message: "Internal server error" });
  }
};

export { getChatbotResponse };
