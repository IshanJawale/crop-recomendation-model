import { getDoc, getDocs } from "../firebase/firestoreServices.js";
import config from "../../config/index.js";
import { getPlantationChatModel } from "../../model/gemini/plantationChatModel.js";
import { v4 as uuidv4 } from "uuid";
import NodeCache from "node-cache";
const cache = new NodeCache({ stdTTL: 10 * 60 }); // 10 minutes
export const plantationChat = async (userId, plantationId, message, chatId) => {
  try {
    if (!userId || !plantationId || !message) {
      return "Invalid input data";
    }
    const plantationRef = `${config.firestoreUsersCollection}/{${userId}}/${config.firestorePlantationCollection}/{${plantationId}}`;
    const treeRef = `${plantationRef}/${config.firestoreTreeCollection}`;
    const plantation = await getDoc(plantationRef);
    const trees = await getDocs(treeRef);
    const object = { ...plantation, trees };

    //
    let chatInstance;
    let newChatId = chatId;
    let history;
    history = chatId
      ? cache.get(chatId)
        ? await JSON.parse(cache.get(chatId))
        : []
      : [];

    chatInstance = startChatInstance(object, history);
    if (history == [] || history?.length == 0) {
      newChatId = uuidv4();
      chatInstance = startChatInstance(object);
    }
    await sendMessage(chatInstance, message);
    cache.set(newChatId, JSON.stringify(chatInstance.params.history));
    return { chatId: newChatId, response: chatInstance.params.history };
    //
  } catch (error) {
    return error.message;
  }
};

const startChatInstance = (object, history = []) => {
  const model = new getPlantationChatModel(object);
  return model.startChat({ history: history });
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
