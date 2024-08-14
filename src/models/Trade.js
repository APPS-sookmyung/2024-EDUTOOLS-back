const mongoose = require('mongoose');

// 거래 스키마 정의
const tradeSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String, // 썸네일 이미지 URL
    },
    amount: {
      type: Number, // 제시 금액
      required: true,
    },
    deadline: {
      type: Date, // 거래 기한
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 거래를 생성한 사용자 참조
      required: true,
    },
    applicants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // 거래에 신청한 사용자들
      },
    ],
    selectedApplicant: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // 선택된 신청자
    },
    isCompleted: {
      type: Boolean,
      default: false, //거래가 처음 생성될 때는 완료되지 않았으므로 기본값 false 로 설정
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Trade', tradeSchema);
