import React, { useState, useEffect } from 'react';
import { Box, Paper, Typography, Button } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const ChatBubble = ({ message, isUser, reasoning, thinkingTime, finalized }) => {
  const [showReasoning, setShowReasoning] = useState(false);

  // 當尚未產生最終回覆時，自動展開推理過程；最終回覆後預設隱藏
  useEffect(() => {
    if (!finalized) {
      setShowReasoning(true);
    } else {
      setShowReasoning(false);
    }
  }, [finalized]);

  // 使用者訊息仍使用氣泡樣式
  if (isUser) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Paper
          elevation={2}
          sx={{
            p: 2,
            maxWidth: '60%',
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            borderRadius: 2,
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message}
          </ReactMarkdown>
        </Paper>
      </Box>
    );
  }

  // AI 訊息：佔滿版面，不使用傳統氣泡背景
  return (
    <Box sx={{ width: '100%', mb: 2 }}>
      {/* 顯示思考狀態標籤 */}
      {!finalized && (
        <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, fontWeight: 'bold' }}>
          模型正在思考
        </Typography>
      )}

      {/* AI 訊息區：不限制寬度，使用透明背景，讓文字佔滿版面 */}
      <Box sx={{ width: '100%' }}>
        <Box
          sx={{
            p: 2,
            width: '100%',
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {message}
          </ReactMarkdown>
        </Box>

        {/* 顯示思考時間（若有） */}
        {finalized && thinkingTime && (
          <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
            思考了 {thinkingTime} 秒
          </Typography>
        )}
      </Box>

      {/* 推理過程展示區，僅在需要時顯示 */}
      {(showReasoning || !finalized) && reasoning && reasoning.length > 0 && (
        <Box
          sx={{
            mt: 1,
            mb: 2,
            backgroundColor: 'grey.200',
            p: 1,
            borderRadius: 1,
            wordBreak: 'break-word',
            whiteSpace: 'pre-wrap',
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
            <Typography key={index} variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5 }}>
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {step}
              </ReactMarkdown>
            </Typography>
          ))}
        </Box>
      )}

      {/* 最終回覆後提供切換按鈕 */}
      {finalized && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            onClick={() => setShowReasoning((prev) => !prev)}
            size="small"
            variant="text"
            sx={{ minWidth: 'auto', p: 0 }}
          >
            {showReasoning ? '隱藏思考過程' : '顯示思考過程'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default ChatBubble;
