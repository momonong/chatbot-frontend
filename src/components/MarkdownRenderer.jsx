import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mui/material';
import 'github-markdown-css';

const MarkdownRenderer = ({ content = '' }) => {
  // 先進行自訂替換，例如把 <stepX> 轉成 Markdown 格式
  let processedContent = (typeof content === 'string' ? content : '').replace(
    /<step(\d+)>/gi, 
    (_, stepNumber) => `\n\n**Step ${stepNumber}**`
  );
  
  // 根據需求移除或壓縮換行符號
  // 若要完全移除換行符號：
  processedContent = processedContent.replace(/\n/g, ' \n ');
  
  // 若要壓縮多餘的換行符號：
  processedContent = processedContent.replace(/\n{2,}/g, '\n');
  
  return (
    <Box 
      className="markdown-body"
      sx={{
        fontSize: '14px',
        overflowX: 'hidden',
        backgroundColor: 'transparent',
      }}
    >
      <ReactMarkdown remarkPlugins={[[remarkGfm, { footnotes: false }]]}>
        {processedContent}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
