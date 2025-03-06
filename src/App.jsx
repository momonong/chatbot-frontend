import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '您好，請問有什麼可以幫忙的嗎？', isUser: false },
  ]);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim()) return;

    // 1. 新增使用者訊息
    const userMsgId = Date.now();
    const newUserMessage = {
      id: userMsgId,
      text: messageText,
      isUser: true,
    };
    setMessages((prev) => [...prev, newUserMessage]);

    // 2. 插入「思考中氣泡」
    const thinkingMsgId = `${userMsgId}-thinking`;
    const thinkingMessage = {
      id: thinkingMsgId,
      text: '',
      isUser: false,
      isThinking: true,
    };
    setMessages((prev) => [...prev, thinkingMessage]);

    // 紀錄開始思考時間
    const startTime = Date.now();

    // 3. 模擬 AI 回覆
    setTimeout(() => {
      // 移除「思考中氣泡」
      setMessages((prev) => prev.filter((msg) => msg.id !== thinkingMsgId));

      // 計算思考秒數
      const endTime = Date.now();
      const thinkingTime = ((endTime - startTime) / 1000).toFixed(1);

      // 新增 AI 回覆
      const aiReply = {
        id: endTime, // 或其他唯一 ID
        text: `這是 AI 回覆: ${messageText}`,
        isUser: false,
        reasoning: [
          '正在分析使用者訊息...',
          '判斷可能的回答方向...',
          '最終產生回覆中...',
        ],
        thinkingTime, // 將思考時間帶入
      };
      setMessages((prev) => [...prev, aiReply]);
    }, 2000);
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        bgcolor: '#fafafa',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container maxWidth="md">
        <Paper
          elevation={3}
          sx={{
            p: 2,
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Typography variant="h5" gutterBottom>
            聊天機器人
          </Typography>
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <ChatWindow messages={messages} />
          </Box>
          <MessageInput onSend={handleSendMessage} />
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
