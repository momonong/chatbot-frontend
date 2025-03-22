import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const App = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: '歡迎使用 Agent 聊天系統！', isUser: false, finalized: true },
  ]);

  // 判斷是否有 AI 還在思考
  const isThinking = messages.some((msg) => !msg.isUser && !msg.finalized);

  const handleSendMessage = async (messageText) => {
    if (!messageText.trim() || isThinking) return; // 若為空白或 AI 正在思考，則不處理

    // 1. 新增使用者訊息
    const userMsgId = Date.now();
    const userMessage = {
      id: userMsgId,
      text: messageText,
      isUser: true,
      finalized: true,
    };
    setMessages((prev) => [...prev, userMessage]);

    // 2. 新增一筆 AI 訊息（初始為空）
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
    setMessages((prev) => [...prev, newAiMessage]);

    try {
      const response = await fetch('http://localhost:8051/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: messageText }),
      });

      if (!response.body) {
        console.error('沒有可讀取的回應 stream');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      let partialData = "";
      
      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        
        partialData += decoder.decode(value, { stream: true });
        const lines = partialData.split('\n');
        partialData = lines.pop() || '';  // 保留最後一個不完整的行

        for (const line of lines) {
          if (!line.trim()) continue;
          
          try {
            const parsed = JSON.parse(line);
            console.log("收到數據：", parsed);
            
            // 更新 messages 狀態
            setMessages((prev) => {
              const newList = [...prev];
              const idx = newList.findIndex((m) => m.id === aiMsgId);
              if (idx === -1) return prev;

              const currentMsg = newList[idx];
              
              // 如果收到最終消息
              if (parsed.finalized) {
                newList[idx] = {
                  ...currentMsg,
                  text: parsed.message || '',  // 使用最終消息
                  // 將新的推理步驟加入現有的推理陣列
                  reasoning: [...(currentMsg.reasoning || []), ...(parsed.reasoning || [])],
                  finalized: true,
                  thinkingTime: ((Date.now() - startTime) / 1000).toFixed(1)
                };
              } else {
                // 累積推理過程
                newList[idx] = {
                  ...currentMsg,
                  reasoning: [...(currentMsg.reasoning || []), ...(parsed.reasoning || [])],
                  finalized: false
                };
              }
              
              return newList;
            });
            
          } catch (error) {
            console.error("解析數據時發生錯誤：", error);
          }
        }
      }
      
      // 最後可計算 AI 的思考時間
      const endTime = Date.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(1);
      // 如果後端沒回傳 thinkingTime，可在此手動更新
      setMessages((prev) => {
        const newList = [...prev];
        const idx = newList.findIndex((m) => m.id === aiMsgId);
        if (idx > -1 && !newList[idx].thinkingTime) {
          newList[idx].thinkingTime = totalTime;
        }
        return newList;
      });
    } catch (error) {
      console.error('發生錯誤', error);
    }
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
      <Container maxWidth="lg"> {/* 讓視窗更寬 */}
        <Typography variant="h5" gutterBottom>
              Agent Chatbot by Morris
        </Typography>
        <Paper
          elevation={3}
          sx={{
            p: 2,
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
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
          <MessageInput onSend={handleSendMessage} disabled={isThinking} />
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
