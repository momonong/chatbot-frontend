import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '您好，請問有什麼可以幫忙的嗎？', isUser: false, finalized: true },
  ]);

  // 檢查是否有 AI 還在思考
  const isThinking = messages.some(msg => !msg.isUser && !msg.finalized);

  const handleSendMessage = (messageText) => {
    if (!messageText.trim() || isThinking) return; // 如果空白或正在思考，則不執行

    // 1. 新增「使用者訊息」
    const userMsgId = Date.now();
    const userMessage = {
      id: userMsgId,
      text: messageText,
      isUser: true,
      finalized: true,
    };
    setMessages(prev => [...prev, userMessage]);

    // 2. 新增「AI 訊息」，初始不顯示內容
    const aiMsgId = `${userMsgId}-ai`;
    const startTime = Date.now();
    const newAiMessage = {
      id: aiMsgId,
      text: '',          // 最終回覆文字之後才會更新
      isUser: false,
      reasoning: [],
      thinkingTime: null,
      finalized: false,  // 還沒產生最終回覆
    };
    setMessages(prev => [...prev, newAiMessage]);

    // 3. 模擬思考過程
    setTimeout(() => {
      console.log('[AI] 第1階段：正在分析使用者訊息...');
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMsgId
            ? { ...msg, reasoning: [...msg.reasoning, '正在分析使用者訊息...'] }
            : msg
        )
      );
    }, 2000);

    setTimeout(() => {
      console.log('[AI] 第2階段：判斷可能的回答方向...');
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMsgId
            ? { ...msg, reasoning: [...msg.reasoning, '判斷可能的回答方向...'] }
            : msg
        )
      );
    }, 4000);

    setTimeout(() => {
      console.log('[AI] 第3階段：生成最終回覆中...');
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMsgId
            ? { ...msg, reasoning: [...msg.reasoning, '生成最終回覆中...'] }
            : msg
        )
      );
    }, 6000);

    // 4. 產生最終回覆
    setTimeout(() => {
      console.log('[AI] 最終回覆產生');
      const endTime = Date.now();
      const thinkingTime = ((endTime - startTime) / 1000).toFixed(1);
      setMessages(prev =>
        prev.map(msg =>
          msg.id === aiMsgId
            ? {
                ...msg,
                text: `這是 AI 回覆: ${messageText}`,
                thinkingTime,
                finalized: true,
              }
            : msg
        )
      );
    }, 8000);
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
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
            }}
          >
            <ChatWindow messages={messages} />
          </Box>
          {/* 傳入 disabled prop 給 MessageInput */}
          <MessageInput onSend={handleSendMessage} disabled={isThinking} />
        </Paper>
      </Container>
    </Box>
  );
};

export default App;

