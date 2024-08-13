const ChatRoom = require('../models/ChatRoom');
const Message = require('../models/Message');

exports.createChatRoom = async (name, participants) => {
  const chatRoom = new ChatRoom({ name, participants });
  return await chatRoom.save();
};

exports.getChatRooms = async () => {
  return await ChatRoom.find().populate('participants');
};

exports.getMessagesByChatRoomId = async (chatRoomId) => {
  return await Message.find({ chatRoom: chatRoomId }).populate('sender');
};

exports.createMessage = async (chatRoomId, senderId, content) => {
  const message = new Message({
    chatRoom: chatRoomId,
    sender: senderId,
    content,
  });
  return await message.save();
};
