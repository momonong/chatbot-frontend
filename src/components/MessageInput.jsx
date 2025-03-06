import React, { useState } from 'react';
import { Box, TextField, Button } from '@mui/material';

const MessageInput = ({ onSend }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSend(inputValue);
      setInputValue('');
    }
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
        placeholder="輸入訊息..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyPress={handleKeyPress}
      />
      <Button
        variant="contained"
        color="primary"
        onClick={handleSend}
        sx={{ ml: 1 }}
      >
        發送
      </Button>
    </Box>
  );
};

export default MessageInput;
