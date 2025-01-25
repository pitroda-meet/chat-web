import { Conversation } from "../models/conversationModel.js";
import { Message } from "../models/messageModel.js";
import { getReceiverSocketId, io } from "../socket/socket.js";
export const sendMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const { message } = req.body;
    let gotConversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });
    if (!gotConversation) {
      gotConversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = await Message.create({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      gotConversation.messages.push(newMessage._id);
    }

    Promise.all([gotConversation.save(), newMessage.save()]);

    //SOKET IO
    const receiverIdSocketId = getReceiverSocketId(receiverId);

    if (receiverIdSocketId) {
      io.to(receiverIdSocketId).emit("newMessage", newMessage);
    }
    res.status(201).json({ newMessage });
  } catch (error) {
    console.error(error);
  }
};

export const getMessage = async (req, res) => {
  try {
    const senderId = req.id;
    const receiverId = req.params.id;
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");
    return res.status(200).json(conversation?.messages);
  } catch (error) {
    console.error(error);
  }
};
