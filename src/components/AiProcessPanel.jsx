import React from 'react';
import { Box, Typography } from '@mui/material';

const AiProcessPanel = ({ aiProcess, aiThinking }) => {
  // 如果想在 AI 思考時顯示「正在思考...」，可以加個判斷
  // 或直接依照 aiProcess 狀態動態渲染
  return (
    <Box
      sx={{
        flex: 1,
        overflowY: 'auto',
        backgroundColor: '#f5f5f5',
        p: 1,
        borderRadius: 1,
      }}
    >
      {aiThinking && aiProcess.length === 0 && (
        <Typography variant="body2">AI 正在思考...</Typography>
      )}

      {aiProcess.map((step, index) => (
        <Typography key={index} variant="body2" sx={{ mb: 1 }}>
          {step}
        </Typography>
      ))}
    </Box>
  );
};

export default AiProcessPanel;
