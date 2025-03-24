import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const MessageInput = ({ onSend, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSend(inputValue);
    setInputValue('');
  };

  /**
   * 監聽鍵盤事件：
   * - Shift + Enter => 插入換行
   * - Enter => 送出訊息
   */
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault(); // 避免 TextField 自動換行
      handleSend();
    }
    // 若是 Shift+Enter，則保持預設行為（換行）
  };

  return (
    <Box sx={{ display: 'flex', mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        multiline         // 開啟多行模式
        minRows={1}         // 初始顯示 1 行
        maxRows={10}     // 最多自動撐高到 10 行
        placeholder={
          disabled
            ? 'AI 正在思考中，請稍候…'
            : '輸入訊息 (Enter 送出, Shift+Enter 換行)...'
        }
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
        disabled={disabled}
        sx={{
          // 這裡可根據需求進一步自訂樣式
        }}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        sx={{ ml: 1 }}
        disabled={disabled}
      >
        發送
      </Button>
    </Box>
  );
};

export default MessageInput;
