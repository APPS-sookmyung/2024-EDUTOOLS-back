const express = require('express');
const userController = require('../controllers/userController');
const router = express.Router();

// 사용자 프로필 생성 또는 업데이트 경로
router.post('/profile', userController.createOrUpdateUser);

// 사용자 프로필 조회 경로
router.get('/profile/:email', userController.getUserProfile);

// 모든 사용자 프로필 조회 경로
router.get('/profiles', userController.getAllUsers);

module.exports = router;
