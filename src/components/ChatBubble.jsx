import React, { useState } from 'react';
import { Paper, Typography, Box, Button } from '@mui/material';
import ThinkingIndicator from './ThinkingIndicator';

const ChatBubble = ({ message, isUser, reasoning, thinkingTime, isThinking }) => {
  const [showReasoning, setShowReasoning] = useState(false);
  const toggleReasoning = () => setShowReasoning((prev) => !prev);

  // 若為「思考中」訊息，顯示一個專門的動畫泡泡
  if (isThinking) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          mb: 1,
        }}
      >
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
          <ThinkingIndicator />
        </Paper>
      </Box>
    );
  }

  // 判斷是否為 AI 回覆（非使用者）且帶有思考過程
  const hasReasoning = !isUser && reasoning && reasoning.length > 0;

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: isUser ? 'flex-end' : 'flex-start',
        mb: 1,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 1,
          maxWidth: '80%',
          backgroundColor: isUser ? 'primary.main' : 'grey.300',
          color: isUser ? 'primary.contrastText' : 'black',
          borderRadius: 2,
        }}
      >
        {/* 如果是 AI 回覆且有思考過程，就在訊息頂部分開顯示「思考幾秒」和「顯示思考過程」按鈕 */}
        {hasReasoning && (
          <Box sx={{ mb: 1 }}>
            {/* (1) 思考幾秒 */}
            {thinkingTime && (
              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mb: 0.5 }}
              >
                思考了 {thinkingTime} 秒
              </Typography>
            )}

            {/* (2) 顯示思考過程按鈕 + 思考內容 */}
            <Button
              onClick={toggleReasoning}
              size="small"
              variant="text"
              sx={{ minWidth: 'auto', p: 0 }}
            >
              {showReasoning ? '隱藏思考過程' : '顯示思考過程'}
            </Button>

            {showReasoning && (
              <Box sx={{ mt: 1, backgroundColor: 'grey.200', p: 1, borderRadius: 1 }}>
                {reasoning.map((step, index) => (
                  <Typography key={index} variant="body2" sx={{ mb: 0.5 }}>
                    {step}
                  </Typography>
                ))}
              </Box>
            )}
          </Box>
        )}

        {/* 最終訊息 (使用者 or AI 回覆) */}
        <Typography variant="body1">{message}</Typography>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
