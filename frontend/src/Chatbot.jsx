import React, { useState } from "react";
import "./Chatbot.css"; // Import CSS file

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    // Add user message
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");
    setIsTyping(true);

    try {
      // Call backend
      //const res = await fetch("http://127.0.0.1:8000/chat", {
        const res = await fetch("https://chatbot-vanamitra.onrender.com/chat", {  
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();
      const botReply = data.reply;

      // Typing effect
      let index = 0;
      const typingInterval = setInterval(() => {
        setMessages((prev) => {
          const lastMsg = prev[prev.length - 1];
          if (lastMsg && lastMsg.sender === "bot") {
            // Update ongoing message
            return [
              ...prev.slice(0, -1),
              { sender: "bot", text: lastMsg.text + botReply[index] },
            ];
          } else {
            // Start new bot message
            return [...prev, { sender: "bot", text: botReply[index] }];
          }
        });
        index++;
        if (index >= botReply.length) {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 30); // typing speed (ms per character)

    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "⚠️ Error connecting to server." },
      ]);
      setIsTyping(false);
    }
  };

  return (
    <div className="chat-container">
      <h2 className="chat-title">Chatbot</h2>
      <div className="chat-box">
        {messages.map((msg, idx) => (
          <div key={idx} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">typing...</div>}
      </div>
      <div className="input-box">
        <input
          className="chat-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="send-btn">
          Send
        </button>
      </div>
    </div>
  );
}

export default Chatbot;
