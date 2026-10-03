import React, { useState } from 'react';
import { X, Send, ChevronLeft, Search, CheckCheck } from 'lucide-react';
import { sound } from '../utils/sound';

export default function DirectMessagesDrawer({
  chats,
  currentUser,
  onClose
}) {
  const [activeChatId, setActiveChatId] = useState(chats[0]?.id || null);
  const [conversations, setConversations] = useState(chats);
  const [inputMsg, setInputMsg] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const activeChat = conversations.find((c) => c.id === activeChatId);

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMsg.trim() || !activeChat) return;

    sound.playPop();
    const newMsg = {
      id: `m_${Date.now()}`,
      sender: currentUser.username,
      text: inputMsg.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setConversations((prev) =>
      prev.map((c) => {
        if (c.id === activeChatId) {
          return {
            ...c,
            lastMessage: newMsg.text,
            messages: [...c.messages, newMsg]
          };
        }
        return c;
      })
    );

    const sentText = inputMsg.trim();
    setInputMsg('');

    // Simulate auto-reply
    setIsTyping(true);
    setTimeout(() => {
      sound.playNotify();
      setIsTyping(false);

      const replies = [
        `Totally agree! That looks amazing 🙌`,
        `Haha love it! Let's catch up this weekend.`,
        `Thanks for sharing! I was just looking at that photo.`,
        `Awesome vibes! Keep posting these amazing shots! 📸`
      ];
      const randomReply = replies[Math.floor(Math.random() * replies.length)];

      const replyMsg = {
        id: `m_reply_${Date.now()}`,
        sender: activeChat.user.username,
        text: randomReply,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setConversations((prev) =>
        prev.map((c) => {
          if (c.id === activeChatId) {
            return {
              ...c,
              lastMessage: replyMsg.text,
              messages: [...c.messages, replyMsg]
            };
          }
          return c;
        })
      );
    }, 1200);
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="messages-drawer animate-slide-up" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="messages-drawer-header">
          {activeChat && (
            <div className="active-chat-user-header">
              <button
                className="chat-back-btn"
                onClick={() => setActiveChatId(null)}
                title="Back to all chats"
              >
                <ChevronLeft size={20} />
              </button>
              <img
                src={activeChat.user.avatar}
                alt={activeChat.user.name}
                className="chat-user-thumb"
              />
              <div className="chat-user-title-box">
                <span className="chat-user-title-name">{activeChat.user.name}</span>
                <span className="chat-user-status">
                  {activeChat.user.isOnline ? 'Active now' : 'Active 2h ago'}
                </span>
              </div>
            </div>
          )}

          {!activeChat && <h3>Messages</h3>}

          <button className="modal-close-btn" onClick={onClose} title="Close">
            <X size={20} />
          </button>
        </div>

        {/* Body: Chat List OR Active Chat Conversation */}
        <div className="messages-drawer-body">
          {/* Conversation view */}
          {activeChat ? (
            <div className="chat-conversation-pane">
              <div className="chat-messages-scroll">
                {activeChat.messages.map((m) => {
                  const isMine = m.sender === currentUser.username;
                  return (
                    <div
                      key={m.id}
                      className={`chat-bubble-row ${isMine ? 'mine' : 'theirs'}`}
                    >
                      {!isMine && (
                        <img
                          src={activeChat.user.avatar}
                          alt={activeChat.user.username}
                          className="chat-message-avatar"
                        />
                      )}
                      <div className="chat-bubble">
                        <p className="chat-text">{m.text}</p>
                        <span className="chat-timestamp">{m.time}</span>
                      </div>
                    </div>
                  );
                })}

                {isTyping && (
                  <div className="chat-bubble-row theirs">
                    <img
                      src={activeChat.user.avatar}
                      alt={activeChat.user.username}
                      className="chat-message-avatar"
                    />
                    <div className="typing-indicator-bubble">
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                      <span className="typing-dot" />
                    </div>
                  </div>
                )}
              </div>

              {/* Chat Input Bar */}
              <form className="chat-input-bar" onSubmit={handleSendMessage}>
                <input
                  type="text"
                  placeholder="Message..."
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  className="chat-text-input"
                  autoFocus
                />
                <button
                  type="submit"
                  className="chat-send-submit-btn"
                  disabled={!inputMsg.trim()}
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          ) : (
            /* Chats List */
            <div className="chats-list-scroll">
              {conversations.map((c) => (
                <div
                  key={c.id}
                  className="chat-list-item"
                  onClick={() => {
                    sound.playPop();
                    setActiveChatId(c.id);
                  }}
                  role="button"
                >
                  <div className="chat-list-avatar-wrap">
                    <img src={c.user.avatar} alt={c.user.name} />
                    {c.user.isOnline && <span className="online-indicator-dot" />}
                  </div>

                  <div className="chat-list-info">
                    <div className="chat-list-row-top">
                      <span className="chat-list-name">{c.user.name}</span>
                      <span className="chat-list-time">{c.time}</span>
                    </div>
                    <p className="chat-list-last-msg">{c.lastMessage}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
