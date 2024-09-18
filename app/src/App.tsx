import React, { useState, useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import './App.css';

type Message = {
  user: string;
  message: string;
};


function App() {
  const [username, setUsername] = useState('');
  const [logged, setLogged] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    socket.current = io('http://localhost:3000');
    socket.current.on('message', (message: string) => {
      let newMessage: Message = JSON.parse(message);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    return () => {
      socket.current?.disconnect();
    };
  }, []);

  const sendMessage = () => {
    if (newMessage.trim() !== '') {
      let sendNewMessage = JSON.stringify({ user: username, message: newMessage });
      socket.current?.emit('message', sendNewMessage);
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
      { !logged ? 
      <>
        <h1>Pisscord</h1>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <button onClick={() => setLogged(true)}>Login</button>
      </> 
      :
      <>
        <h1>Pisscord</h1>
        <div className="chat-window">
          <ul>
            {messages.map((message, index) => (
              <li key={index}>{message.user}: {message.message}</li>
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
      }
    </>
  );
}

export default App;