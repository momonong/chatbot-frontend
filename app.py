import streamlit as st
import time

# 初始化聊天紀錄
if 'chat_history' not in st.session_state:
    st.session_state.chat_history = []

def add_message(sender: str, message: str):
    st.session_state.chat_history.append({"sender": sender, "message": message})

def display_chat_history():
    for chat in st.session_state.chat_history:
        if chat["sender"] == "user":
            st.markdown(f"<div style='text-align: right; padding: 5px; background-color: #DCF8C6; border-radius: 10px; display: inline-block;'>{chat['message']}</div>", unsafe_allow_html=True)
        else:
            st.markdown(f"<div style='text-align: left; padding: 5px; background-color: #FFF; border: 1px solid #CCC; border-radius: 10px; display: inline-block;'>{chat['message']}</div>", unsafe_allow_html=True)
        st.markdown("<br>", unsafe_allow_html=True)

st.set_page_config(page_title="聊天機器人介面", page_icon="💬")
st.title("聊天機器人介面")

display_chat_history()

# 使用 placeholder 建立輸入框
input_placeholder = st.empty()
user_input = input_placeholder.text_input("請輸入訊息", key="input_message")

if st.button("發送"):
    if user_input:
        add_message("user", user_input)
        # 這裡暫時使用 echo 回應
        bot_response = f"你說: {user_input}"
        add_message("bot", bot_response)
        # 重新建立輸入框來模擬清除效果
        input_placeholder.empty()
        # 給個小延遲讓頁面更新
        time.sleep(0.1)
        input_placeholder.text_input("請輸入訊息", key="input_message_new")
