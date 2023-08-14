import './App.css';
import io from 'socket.io-client';
import { useState } from 'react';
import Chat from './Chat';
const socket = io.connect("http://localhost:3001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = (data) => {
    if (username !== "" && room !== "") {
      setShowChat(true);
      socket.emit("join_room", room);
      // console.log(`User with ID: ${socket.id}\t joined Room: ${room}`);
    }
  };
  return (
    <div className="App">
      {!showChat ? 
        (
        <div className="joinChatContainer">
          <h3 className="headings">Join a Chat</h3>
          <input 
            type="text" 
            placeholder='John...'
            onChange={(e) => {
              setUsername(e.target.value)
              }}
            />
          <input 
            type="text" 
            placeholder='Room ID.' 
            onChange={(e) => {
              setRoom(e.target.value)
              }}
            />
          <button onClick={joinRoom}>Join a room</button>
        </div> 
        )
        : 
        (
        <Chat socket={socket} username={username} room={room} />
        )
      }
      
    </div>
  );
}

export default App;
