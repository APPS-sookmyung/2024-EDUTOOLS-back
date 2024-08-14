const chatRoutes = require('../routes/chatRoutes');
const userRoutes = require('../routes/userRoutes');

module.exports = (app) => {
  app.use('/api/chat', chatRoutes);
  app.use('/api/user', userRoutes);
  app.use('/api/trades', tradeRoutes); // 거래 라우트 설정
  // 다른 라우트 설정도 이곳에 추가
};
