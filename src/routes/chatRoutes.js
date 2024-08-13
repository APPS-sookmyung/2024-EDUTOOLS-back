//톡방과 관련된 api 경로 정의

const express = require('express');
const chatController = require('../controllers/chatController');
const router = express.Router();

router.post('/rooms', chatController.createChatRoom); // 방 만들기
router.get('/rooms', chatController.getChatRooms); // 채팅방 갖고오기
router.get(
  '/rooms/:chatRoomId/messages',
  chatController.getMessagesByChatRoomId // 채팅방 메세지 갖고오기
);
router.post('/rooms/:chatRoomId/messages', chatController.createMessage);

module.exports = router;
