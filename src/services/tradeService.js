const Trade = require('../models/Trade');
//거래 생성, 거래목록조회, 특정 거래 조회,거래 신청/취소,신청자 선택

// 새로운 거래 생성 함수
exports.createTrade = async (tradeData) => {
  const trade = new Trade(tradeData);
  return await trade.save(); // 생성된 거래 데이터를 저장합니다.
};

// 거래 목록 조회 함수
exports.getAllTrades = async () => {
  return await Trade.find().populate('createdBy applicants selectedApplicant'); // 거래 목록을 반환하며, 관련된 사용자 데이터를 포함합니다.
};

// 특정 거래 조회 함수
exports.getTradeById = async (tradeId) => {
  return await Trade.findById(tradeId).populate(
    'createdBy applicants selectedApplicant'
  ); // 거래 ID를 기반으로 특정 거래를 조회합니다.
};

// 거래 신청 함수
exports.applyForTrade = async (tradeId, userId) => {
  const trade = await Trade.findById(tradeId);

  if (!trade) {
    throw new Error('Trade not found');
  }

  if (!trade.applicants.includes(userId)) {
    trade.applicants.push(userId); // 신청자가 중복되지 않도록 확인한 후 추가합니다.
  }

  return await trade.save(); // 변경된 거래 데이터를 저장합니다.
};

// 거래 신청 취소 함수
exports.cancelApplication = async (tradeId, userId) => {
  const trade = await Trade.findById(tradeId);

  if (!trade) {
    throw new Error('Trade not found');
  }

  trade.applicants = trade.applicants.filter(
    (applicant) => applicant.toString() !== userId
  ); // 신청자를 목록에서 제거합니다.

  return await trade.save(); // 변경된 거래 데이터를 저장합니다.
};

// 신청자 선택 함수
exports.selectApplicant = async (tradeId, applicantId) => {
  const trade = await Trade.findById(tradeId);

  if (!trade) {
    throw new Error('Trade not found');
  }

  trade.selectedApplicant = applicantId; // 선택된 신청자를 설정합니다.

  return await trade.save(); // 변경된 거래 데이터를 저장합니다.
};

//거래 수정 비즈니스 로직
exports.updateTrade = async (tradeId, updateData, userId) => {
  // 거래를 생성한 사용자만 수정할 수 있도록 체크
  const trade = await Trade.findById(tradeId);

  if (!trade) {
    throw new Error('Trade not found');
  }

  // 거래 생성자와 요청 사용자가 동일한지 확인
  if (trade.createdBy.toString() !== userId) {
    throw new Error('You are not authorized to update this trade');
  }

  // 거래 정보를 업데이트
  Object.assign(trade, updateData);

  // 변경된 거래 데이터를 저장
  return await trade.save();
};

//거래 삭제
exports.deleteTrade = async (tradID, userId) => {
  const trade = await Trade.findById(tradeId);
  if (!trade) {
    throw new Error('Trade not found');
  }
  //거래 생성자와 요청 사용자가 동일한지 확인
  if (trade.createdBy.toString() !== userId) {
    throw new Error('You are not authorized to delete this trade');
  }
  //거래를 삭제
  await trade.remove();
  return { message: 'Trade successfully deleted' };
};
//거래 완료 처리 함수
exports.completeTrade = async (tradeId, userId) => {
  const trade = await Trade.findById(tradeId);
  if (!trade) {
    throw new Error('Trade not found');
  }
  //거래 생성자와 요청 사용자가 동일한지 확인
  if (trade.createdBy.toString() !== userId) {
    throw new Error('You are not authorized to complete this trade');
  }
  //거래 상태 완료로 설정
  trade.isCompleted = true;
  //변경된 거래 데이터 저장
  return await trade.save();
};
