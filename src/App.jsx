import React, { useState } from 'react';
import { Container, Paper, Typography, Box } from '@mui/material';
import ChatWindow from './components/ChatWindow';
import MessageInput from './components/MessageInput';

const App = () => {
    const [messages, setMessages] = useState([
        { id: 1, text: '歡迎使用 Agent 聊天系統！', isUser: false, finalized: true },
    ]);

    // 檢查是否有 AI 還在思考
    const isThinking = messages.some(msg => !msg.isUser && !msg.finalized);

    const handleSendMessage = async (messageText) => {
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

        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ query: messageText }),
            });

            if (!response.body) {
                console.error("沒有可讀取的回應 stream");
                return;
            }

            const reader = response.body.getReader();
            const decoder = new TextDecoder("utf-8");
            let done = false;

            while (!doen) {
                const { value, done: readerDone } = await reader.read();
                done = readerDone;
                const chunkValue = decoder.decode(value);
                // 每行都是一個 JSON 字串，分割後更新 state
                const line = chunkValue.split("\n").filter((line) => line.trim() !== "");
                for (const line of lines) {
                    try {
                        const msg = JSON.parse(line);
                        // 更新 msg 狀態
                        setMessages((prec) => [...prev, msg]);
                    } catch (error) {
                        console.error("無法解析 JSON 字串", line);
                    }
                }
            }
        }
        catch (error) {
            console.error("發生錯誤", error);
        }
    }


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
