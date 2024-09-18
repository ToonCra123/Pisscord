import React, { useState, /*useEffect, useRef*/ } from 'react';
import './App.css';

type MessageData = {
  author: string,
  message: string
};

function App() {
  const [messages, setMessages] = useState<string[]>([]);
  const [newMessage, setNewMessage] = useState('');
  // const ws = useRef<WebSocket | null>(null);

  /*useEffect(() => {
    ws.current = new WebSocket('ws://your-websocket-server-url');
    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [...prevMessages, event.data]);
    };
    return () => {
      ws.current?.close();
    };
  }, []);*/

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      //ws.current?.send(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      setNewMessage('');
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <>
      <h1>Pisscord</h1>
      <div className="chat-window">
        <ul>
          {messages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message"
      />
      <button onClick={sendMessage}>Send</button>
    </>
  );
}

export default App;