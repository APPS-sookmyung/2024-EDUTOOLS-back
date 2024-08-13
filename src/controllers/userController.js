const userService = require('../services/userService');

// 사용자 프로필 생성 또는 업데이트
exports.createOrUpdateUser = async (req, res) => {
  try {
    const userData = req.body; // 클라이언트로부터 받은 사용자 데이터
    const user = await userService.createOrUpdateUser(userData);
    res.status(200).json(user); //  사용자 데이터를 반환
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to create or update user profile', error });
  }
};

// 사용자 프로필 조회 (이메일 기반)
exports.getUserProfile = async (req, res) => {
  try {
    const { email } = req.params; // URL 경로에서 이메일을 추출
    const user = await userService.getUserByEmail(email);

    if (user) {
      res.status(200).json(user); // 사용자를 찾았으면 데이터를 반환
    } else {
      res.status(404).json({ message: 'User not found' }); // 사용자를 찾지 못하면 404 에러
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch user profile', error });
  }
};

// 모든 사용자 프로필 조회 (선택 사항)
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users); // 모든 사용자 데이터를 반환합니다.
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error });
  }
};
