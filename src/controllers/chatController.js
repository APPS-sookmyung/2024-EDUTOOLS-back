//서버와 라우트 사이 로직 처리
const chatService = require('../services/ChatService');

exports.createChatRoom = async (req, res) => {
  try {
    const { name, participants } = req.body;
    const chatRoom = await chatService.createChatRoom(name, participants);
    res.status(201).json(chatRoom);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create chat room', error });
  }
};

exports.getChatRooms = async (req, res) => {
  try {
    const chatRooms = await chatService.getChatRooms();
    res.status(200).json(chatRooms);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch chat rooms', error });
  }
};

exports.getMessagesByChatRoomId = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const messages = await chatService.getMessagesByChatRoomId(chatRoomId);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch messages', error });
  }
};

exports.createMessage = async (req, res) => {
  try {
    const { chatRoomId } = req.params;
    const { senderId, content } = req.body;
    const message = await chatService.createMessage(
      chatRoomId,
      senderId,
      content
    );
    res.status(201).json(message);
  } catch (error) {
    res.status(500).json({ message: 'Failed to send message', error });
  }
};
