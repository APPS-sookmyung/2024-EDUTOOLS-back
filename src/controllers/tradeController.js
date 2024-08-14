const tradeService = require('../services/tradeService');

// 새로운 거래 생성
exports.createTrade = async (req, res) => {
  try {
    const tradeData = { ...req.body, createdBy: req.user._id }; // 거래 데이터와 생성자 정보 포함
    const trade = await tradeService.createTrade(tradeData);
    res.status(201).json(trade); // 생성된 거래를 반환
  } catch (error) {
    res.status(500).json({ message: 'Failed to create trade', error });
  }
};

// 모든 거래 조회
exports.getAllTrades = async (req, res) => {
  try {
    const trades = await tradeService.getAllTrades();
    res.status(200).json(trades); // 모든 거래 정보를 반환
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trades', error });
  }
};

// 특정 거래 조회
exports.getTradeById = async (req, res) => {
  try {
    const { tradeId } = req.params; // URL에서 거래 ID를 가져옴
    const trade = await tradeService.getTradeById(tradeId);

    if (trade) {
      res.status(200).json(trade); // 거래 정보를 반환
    } else {
      res.status(404).json({ message: 'Trade not found' }); // 거래를 찾지 못한 경우
    }
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch trade', error });
  }
};

// 거래 지원자 추가
exports.applyToTrade = async (req, res) => {
  try {
    const { tradeId } = req.params;
    const userId = req.user._id; // 현재 로그인한 사용자 ID

    const trade = await tradeService.applyToTrade(tradeId, userId);
    res.status(200).json(trade); // 지원이 완료된 거래 정보를 반환
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 거래 상태 업데이트 (예: 완료)
exports.updateTradeStatus = async (req, res) => {
  try {
    const { tradeId } = req.params;
    const { status } = req.body; // 새로운 상태 정보

    const trade = await tradeService.updateTradeStatus(tradeId, status);
    res.status(200).json(trade); // 상태가 업데이트된 거래 정보를 반환
  } catch (error) {
    res.status(500).json({ message: 'Failed to update trade status', error });
  }
};
// 거래 수정 컨트롤러
exports.updateTrade = async (req, res) => {
  try {
    const tradeId = req.params.id;
    const updateData = req.body;
    const userId = req.user.id; // 요청한 사용자의 ID (인증 미들웨어를 통해 설정됨)

    const updatedTrade = await tradeService.updateTrade(
      tradeId,
      updateData,
      userId
    );
    res.status(200).json(updatedTrade); // 성공적으로 업데이트된 거래를 반환
  } catch (error) {
    res.status(500).json({ message: 'Failed to update trade', error });
  }
};

//거래 삭제 컨트롤러
exports.deleteTrade = async (req, res) => {
  try {
    const tradeId = req.params.id;
    const userId = req.user.id; // 요청한 사용자의 ID (인증 미들웨어를 통해 설정됨)
    await tradeService.deleteTrade(tradeId, userId);
    res.status(200), json({ message: 'trade successfully deleted' }); //성공 메세지 반환
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete trade,error' });
  }
};
//거래 완료 컨트롤러
exports.completeTrade = async (req, res) => {
  try {
    const tradeId = req.params.id;
    const userId = req.user.id;

    const completedTrade = await tradeService.completeTrade(tradeId, userId);
    req.status(200).json(completedTrade); // 성공적으로 완료된 거래 반환
  } catch (error) {
    req.status(500).json({ message: 'Failed to complete trade', error });
  }
};
