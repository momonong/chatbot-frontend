import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';

const ChatBubble = ({ message, isUser, reasoning, thinkingTime, finalized }) => {
  const [showReasoning, setShowReasoning] = useState(false);

  // 根據 finalized 狀態，自動展開（思考中）或折疊（最終回覆）
  useEffect(() => {
    if (!finalized) {
      setShowReasoning(true);
    } else {
      setShowReasoning(false);
    }
  }, [finalized]);

  // 如果是使用者訊息，直接顯示使用者的泡泡
  if (isUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
        <Paper
          elevation={1}
          sx={{
            p: 1,
            maxWidth: '80%',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
          }}
        >
          <Typography variant="body1">{message}</Typography>
        </Paper>
      </Box>
    );
  }

  // 如果是 AI 訊息：
  return (
    <Box sx={{ mb: 1 }}>
      {/* 
        在 AI 還沒產生最終回覆 (finalized = false) 時，
        顯示「模型正在思考」標籤
      */}
      {!finalized && (
        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ mb: 0.5, fontWeight: 'bold' }}
        >
          模型正在思考
        </Typography>
      )}

      {/* AI 泡泡本體 */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Paper
          elevation={1}
          sx={{
            p: 1,
            maxWidth: '80%',
            backgroundColor: 'grey.300',
            color: 'black',
            borderRadius: 2,
          }}
        >
          {/* 若已 finalized，顯示思考時間 */}
          {finalized && thinkingTime && (
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 0.5 }}
            >
              思考了 {thinkingTime} 秒
            </Typography>
          )}

          {/* 若已 finalized，顯示切換按鈕 */}
          {finalized && (
            <Button
              onClick={() => setShowReasoning((prev) => !prev)}
              size="small"
              variant="text"
              sx={{ minWidth: 'auto', p: 0, mb: 0.5 }}
            >
              {showReasoning ? '隱藏思考過程' : '顯示思考過程'}
            </Button>
          )}

          {/* 推理過程容器 */}
          {(showReasoning || !finalized) && reasoning && reasoning.length > 0 && (
            <Box
              sx={{
                mt: 1,
                mb: 2,
                backgroundColor: 'grey.200',
                p: 1,
                borderRadius: 1,
              }}
            >
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}
              >
                模型思考過程
              </Typography>
              {reasoning.map((step, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 0.5 }}
                >
                  {step}
                </Typography>
              ))}
            </Box>
          )}

          {/* 最終回覆內容 */}
          <Typography variant="body1">{message}</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default ChatBubble;
