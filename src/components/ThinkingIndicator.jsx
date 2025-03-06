import React from 'react';
import '../styles/thinking.css';

const ThinkingIndicator = () => {
  return (
    <div className="thinking-container">
      <span className="thinking-text">AI 正在思考</span>
      <div className="thinking-dot" />
      <div className="thinking-dot" />
      <div className="thinking-dot" />
    </div>
  );
};

export default ThinkingIndicator;
