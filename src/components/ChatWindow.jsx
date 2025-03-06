import React from 'react';
import { Box } from '@mui/material';
import ChatBubble from './ChatBubble';

const ChatWindow = ({ messages }) => {
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        pr: 1,
        pl: 1,
      }}
    >
      {messages.map((msg) => (
        <ChatBubble
          key={msg.id}
          message={msg.text}
          isUser={msg.isUser}
          reasoning={msg.reasoning}       // 新增: 思考過程
          thinkingTime={msg.thinkingTime} // 新增: 思考時間
        />
      ))}
    </Box>
  );
};

export default ChatWindow;
