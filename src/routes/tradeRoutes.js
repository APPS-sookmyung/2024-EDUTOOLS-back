const express = require('express');
const tradeController = require('../controllers/tradeController');
const router = express.Router();

// 새로운 거래 생성 경로
router.post('/', tradeController.createTrade);

// 모든 거래 조회 경로
router.get('/', tradeController.getAllTrades);

// 특정 거래 조회 경로
router.get('/:tradeId', tradeController.getTradeById);

// 거래 지원자 추가 경로
router.post('/:tradeId/apply', tradeController.applyToTrade);

// 거래 상태 업데이트 경로 ( 뭐 논의중,,, 이런식으로 업데이트 할수 있음 좋을듯)
router.put('/:tradeId/status', tradeController.updateTradeStatus);
//거래 완료 경로 ...
router.post('/trades/:id/complete', tradeController.completeTrade);
//거래 수정 경로
router.put('/trades/:id', tradeController.updateTrade);
//거래 삭제 경로
router.delete('/trades/:id', tradeController.deleteTrade);
module.exports = router;
