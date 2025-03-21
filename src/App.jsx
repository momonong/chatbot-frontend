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
      const response = await fetch('/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: messageText }),
      });

      if (!response.body) {
        console.error('沒有可讀取的回應 stream');
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder('utf-8');
      let done = false;

      while (!done) {
        const { value, done: readerDone } = await reader.read();
        done = readerDone;
        const chunkValue = decoder.decode(value);
        // 每行都是 JSON 字串，拆分並處理
        const lines = chunkValue.split('\n').filter((line) => line.trim() !== '');
        for (const line of lines) {
          try {
            const chunkMsg = JSON.parse(line);

            // 關鍵：更新同一個 AI 訊息
            setMessages((prev) => {
              // 先複製前狀態
              const newList = [...prev];
              // 找到我們剛剛新增的 AI 訊息
              const idx = newList.findIndex((m) => m.id === aiMsgId);
              if (idx < 0) {
                // 如果找不到，就直接 push
                // （理論上不應該發生，除非後端發了新的 ID）
                newList.push(chunkMsg);
                return newList;
              }

              // 更新 AI 訊息的屬性
              if (chunkMsg.reasoning) {
                // 若後端發送了部分推理步驟，合併進去
                // 你可以選擇用 concat 或直接替換
                newList[idx].reasoning = [
                  ...newList[idx].reasoning,
                  ...chunkMsg.reasoning,
                ];
              }
              if (typeof chunkMsg.text === 'string') {
                newList[idx].text = chunkMsg.text;
              }
              if (typeof chunkMsg.thinkingTime === 'number') {
                newList[idx].thinkingTime = chunkMsg.thinkingTime;
              }
              if (typeof chunkMsg.finalized === 'boolean') {
                newList[idx].finalized = chunkMsg.finalized;
              }

              return newList;
            });
          } catch (error) {
            console.error('無法解析 JSON：', line, error);
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
            Agent Chatbot by Morris
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
          <MessageInput onSend={handleSendMessage} disabled={isThinking} />
        </Paper>
      </Container>
    </Box>
  );
};

export default App;
