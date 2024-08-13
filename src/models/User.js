const mongoose = require('mongoose');

// 사용자 스키마 정의
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true, // 이름은 고유해야 합니다
    },
    avatar: {
      type: String, // 아바타 이미지 URL
    },
    description: {
      type: String, // 사용자 설명 (마크다운 가능)
      maxlength: 500, // 최대 500자
    },
    portfolioLink: {
      type: String, // 포트폴리오 링크
    },
    email: {
      type: String,
      required: true,
      unique: true, // 이메일도 고유해야 합니다
    },
  },
  { timestamps: true }
); // timestamps 옵션은 생성 및 업데이트 시간을 자동

//모델 내보내기
module.exports = mongoose.model('User', userSchema);
