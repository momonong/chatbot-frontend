// src/components/ChatWindow.jsx
import React from 'react';
import { Box } from '@mui/material';
import ChatBubble from './ChatBubble';

const ChatWindow = ({ messages }) => {
  return (
    <Box sx={{ flex: 1, overflowY: 'auto', pr: 1, pl: 1 }}>
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          message={msg.text}
          isUser={msg.isUser}
          reasoning={msg.reasoning}
          thinkingTime={msg.thinkingTime}
          finalized={msg.finalized}
        />
      ))}
    </Box>
  );
};

export default ChatWindow;
