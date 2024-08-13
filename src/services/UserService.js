//프로필 관련 비즈니스 로직 처리 서비스
const User = require('../models/User');

//사용자 생성 또는 업데이트 함수
exports.createOrUpdateUser = async (UserData) => {
  const { email, name, avatar, description, portfolioLink } = userData;
  // 이메일을 기반으로 사용자가 이미 존재하는지 확인
  let user = await User.findOne({ email });
  if (user) {
    //사용자가 존재하면 업데이트 수행
    user.name = name || user.name;
    user.avatar = avatar || user.avatar;
    user.description = description || user.description;
    user.portfolioLink = portfolioLink || user.portfolioLink;
  } else {
    //사용자 없음 새로 만들기
    user = new User({ email, name, avatar, description, portfolioLink });
  }
  //사용자 정보 저장하고 반환
  return await user.save();
};

//사용자 조회 함수- 이메일 기반
exports.getUserByEmail = async (email) => {
  return await User.findOne({ email });
};
//모든 사용자 조회 함수 (빼도 됨)
exports.getAllUsers = async () => {
  return await User.find();
};
