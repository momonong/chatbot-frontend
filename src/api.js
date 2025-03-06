/**
 * 將來可以在此封裝與後端的 API 呼叫
 */
export const sendMessageToAI = async (message) => {
    // 範例：使用 fetch 呼叫後端 API
    // const response = await fetch('/api/chat', { 
    //   method: 'POST', 
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ message }) 
    // });
    // const data = await response.json();
    // return data.reply;
    return `AI 回覆：${message}`; // 暫時回傳模擬回覆
  };
  