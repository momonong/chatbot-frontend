import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mui/material';

const MarkdownRenderer = ({ content }) => {
  return (
    <Box 
      sx={{
        width: '100%',  // 確保寬度100%
        maxWidth: '100%',  // 限制最大寬度
        overflowX: 'hidden',  // 明確防止水平滾動
        '& *': { 
          overflowWrap: 'break-word', 
          wordBreak: 'break-word',
          maxWidth: '100%'  // 確保所有子元素不超過
        },
        '& pre': {
          overflowX: 'auto',  // 代碼塊允許水平滾動
          whiteSpace: 'pre',
          maxWidth: '100%'
        },
        '& code': {
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        },
        '& img': {  // 控制圖片大小
          maxWidth: '100%',
          height: 'auto'
        },
        '& table': {
          display: 'block',
          overflowX: 'auto',
          maxWidth: '100%',
          borderCollapse: 'collapse',
          '& th, & td': {
            border: '1px solid #ddd',
            padding: '8px',
            maxWidth: '250px',  // 限制表格單元格寬度
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }
        },
        '& blockquote': {
          borderLeft: '4px solid #ccc',
          margin: '0',
          padding: '0 15px',
          maxWidth: '100%'
        },
        '& a': {
          wordBreak: 'break-all'
        }
      }}
    >
      <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {content}
      </ReactMarkdown>
    </Box>
  );
};

export default MarkdownRenderer;
