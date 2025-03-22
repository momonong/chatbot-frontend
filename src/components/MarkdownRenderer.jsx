import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Box } from '@mui/material';

const MarkdownRenderer = ({ content }) => {
  return (
    <Box 
      sx={{
        width: '100%',
        maxWidth: '100%',
        overflowX: 'hidden',
        fontSize: '14px',        // 設置基礎字體大小
        '& *': { 
          overflowWrap: 'break-word', 
          wordBreak: 'break-word',
          maxWidth: '100%',
          lineHeight: 1.4,       // 減少行高
          margin: 0,             // 重置所有邊距
          padding: 0             // 重置所有內邊距
        },
        '& p': {
          marginBottom: '0.3em',  // 段落之間的間距
          '&:last-child': {
            marginBottom: 0        // 最後一個段落不需要底部間距
          }
        },
        '& pre': {
          overflowX: 'auto',
          whiteSpace: 'pre',
          maxWidth: '100%',
          margin: '0.6em 0',     // 代碼塊上下間距
          padding: '0.6em',      // 代碼塊內邊距
          backgroundColor: '#f6f8fa', // 代碼塊背景色
          borderRadius: '4px'      // 圓角
        },
        '& code': {
          fontSize: '13px',        // 代碼字體略小
          padding: '0.2em 0.4em',  // 行內代碼內邊距
          backgroundColor: '#f6f8fa', // 行內代碼背景色
          borderRadius: '3px',     // 行內代碼圓角
          whiteSpace: 'pre-wrap',
          wordBreak: 'break-all'
        },
        '& ul, & ol': {
          paddingLeft: '1.2em',    // 列表縮進
          marginTop: '0em',      // 減少列表頂部間距
          marginBottom: '0em',   // 減少列表底部間距
          '& ul, & ol': {         // 處理巢狀列表
            margin: '0.2em 0'      // 巢狀列表的間距更小
          }
        },
        '& li': {
          marginBottom: '0em',   // 減少列表項目間距
          '&:last-child': {
            marginBottom: 0        // 最後一個項目不需要底部間距
          },
          '& p': {                // 處理列表項目中的段落
            margin: '0em 0',    // 減少段落間距
            '&:last-child': {
              marginTop: 0,       // 最後一個段落不需要頂部間距
              marginBottom: 0
            }
          }
        },
        '& img': {
          maxWidth: '100%',
          height: 'auto',
          margin: '0.5em 0'      // 圖片上下間距
        },
        '& table': {
          display: 'block',
          overflowX: 'auto',
          maxWidth: '100%',
          borderCollapse: 'collapse',
          margin: '0.6em 0',     // 表格上下間距
          '& th, & td': {
            border: '1px solid #ddd',
            padding: '6px 13px',   // 表格單元格內邊距
            maxWidth: '250px'
          }
        },
        '& blockquote': {
          borderLeft: '3px solid #ddd',
          margin: '0.6em 0',     // 引用塊上下間距
          padding: '0 1em',       // 引用塊左右內邊距
          color: '#666'           // 引用塊文字顏色
        },
        '& a': {
          color: '#0969da',       // 連結顏色
          textDecoration: 'none',  // 移除下劃線
          '&:hover': {
            textDecoration: 'underline' // 懸停時顯示下劃線
          }
        },
        '& h1, & h2, & h3, & h4, & h5, & h6': {
          margin: '0.4em 0 0.3em',   // 標題上下間距
          lineHeight: 1.2          // 標題行高
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
