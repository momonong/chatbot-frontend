import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import MarkdownRenderer from './MarkdownRenderer';

// 將秒數轉換為「X 秒」或「Y 分 Z 秒」格式
const formatTime = (timeSec) => {
  const sec = Math.floor(timeSec);
  if (sec < 60) {
    return `${sec} 秒`;
  } else {
    const minutes = Math.floor(sec / 60);
    const remain = sec % 60;
    return `${minutes} 分 ${remain} 秒`;
  }
};

const ChatBubble = ({ message, isUser, reasoning, thinkingTime, finalized }) => {
  const [showReasoning, setShowReasoning] = useState(false);

  // 當 finalized 改變時：未產生最終訊息時，展開所有思考過程；產生最終訊息後，立即收起
  useEffect(() => {
    setShowReasoning(!finalized);
  }, [finalized]);

  // === 使用者訊息：靠右顯示，並用 maxWidth 控制最大寬度 ===
  // 使用者訊息泡泡（靠右顯示）
  if (isUser) {
    return (
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'flex-end', 
          mb: 2, 
          width: '98%',
          pr: { xs: 1, sm: 0 },  // 螢幕小時放大右邊距
        }}
      >
        <Paper
          elevation={2}
          sx={{
            p: 2,
            backgroundColor: '#e0f7fa',   // 修改背景色
            color: '#006064',             // 修改文字色
            borderRadius: 2,
            maxWidth: '60%',              // 控制寬度
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
            // 設定文字選取時的樣式
            '& ::selection': {
              backgroundColor: '#80deea',
              color: '#000',
            },
          }}
        >
          <Typography>{message}</Typography>
        </Paper>
      </Box>
    );
  }

  // === AI 訊息：顯示在左邊 / 佔滿版面 ===
  return (
    <Box 
      sx={{ 
        width: '100%', 
        mb: 2, 
        pl: 1, 
        pr: { xs: 1, sm: 0 },  // 螢幕小時放大右邊距
      }}
    >
      {/* 上方：顯示「模型正在思考」或「思考了 N」（若已 finalized），以及按鈕（按鈕可手動切換） */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
        {!finalized ? (
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            模型正在思考
          </Typography>
        ) : thinkingTime ? (
          <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 'bold' }}>
            思考了 {formatTime(thinkingTime)}
          </Typography>
        ) : null}

        {finalized && reasoning && reasoning.length > 0 && (
          <Button
            onClick={() => setShowReasoning((prev) => !prev)}
            size="small"
            variant="text"
            sx={{ minWidth: 'auto', p: 0 }}
          >
            {showReasoning ? '隱藏思考過程' : '顯示思考過程'}
          </Button>
        )}
      </Box>

      {/* 對話框本體 (AI 回覆氣泡) */}
      <Paper
        elevation={2}
        sx={{
          p: 2,
          backgroundColor: 'grey.100',
          borderRadius: 2,
          maxWidth: "98%", 
          wordBreak: 'break-word',
          whiteSpace: 'pre-wrap',
          boxSizing: 'border-box', // 確保內邊距被包含在寬度內
        }}
      >

        {/* 思考過程標題移到外面 */}
        {reasoning && reasoning.length > 0 && showReasoning && (
          <>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{ display: 'block', mb: 0.5, fontWeight: 'bold' }}
            >
              模型思考過程
            </Typography>
            <Box
              sx={{
                mb: 2,
                backgroundColor: 'grey.200',
                p: 1,
                borderRadius: 1,
              }}
            >
              {reasoning.map((step, index) => (
                <Typography
                  key={index}
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: 'block', mb: 0.5 }}
                >
                  <MarkdownRenderer content={step} />
                </Typography>
              ))}
            </Box>
          </>
        )}

        {/* 最終回覆文字 */}
        <Box sx={{ width: '100%' }}>
          <MarkdownRenderer content={message} />
        </Box>
      </Paper>
    </Box>
  );
};

export default ChatBubble;
