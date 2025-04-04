import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mui/material';
import 'github-markdown-css';

const MarkdownRenderer = ({ content = '' }) => {
  const processedContent = (typeof content === 'string' ? content : '').replace(
    /<step(\d+)>/gi, 
    (_, stepNumber) => `\n\n**Step ${stepNumber}**`
  );

  return (
    <Box 
      className="markdown-body"  // 讓外層容器套用 GitHub Markdown CSS
      sx={{
        // 可在這裡進一步自訂樣式，例如調整字體大小、行高等
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
