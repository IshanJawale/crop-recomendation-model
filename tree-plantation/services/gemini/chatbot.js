import chatbotModel from "../../model/gemini/chatbotModel.js";

const startChatInstance = (history = []) => {
  return chatbotModel.startChat({ history: history });
};

const sendMessage = async (chatInstance, prompt) => {
  try {
    const response = await chatInstance.sendMessage(prompt);
    return response.response.text();
  } catch (error) {
    console.log(error);
    return "I'm sorry, I don't understand that.";
  }
};

export { startChatInstance, sendMessage };
