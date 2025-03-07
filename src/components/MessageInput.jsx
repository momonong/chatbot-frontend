// src/components/MessageInput.jsx
import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const MessageInput = ({ onSend, disabled }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSend(inputValue);
    setInputValue('');
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <Box sx={{ display: 'flex', mt: 2 }}>
      <TextField
        fullWidth
        variant="outlined"
        placeholder={disabled ? 'AI 正在思考中，請稍候…' : '輸入訊息...'}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={disabled}
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

