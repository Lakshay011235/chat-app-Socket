import React, { useEffect, useMemo, useState } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
function Chat({socket, username, room}) {
    const [currentMessage, setCurrentMessage] = useState("");
    const [messageList, setMessageList] = useState([]);

    const sendMessage = async() => {
        if (currentMessage !== ""){
            const messageData  = {
                room: room,
                author: username,
                message: currentMessage,
                time: new Date(Date.now()).getTime(),
            }
            setCurrentMessage("");
            await socket.emit("send_message", messageData);
            setMessageList((list) => [...list, messageData]);
        }
    }

    useMemo(() => {
        socket.on("receive_message", (data) => {
            setMessageList((list) => [...list, data]);
        });
    }, [socket]);

  return (
    <div className='chat-window'>
      <div className="chat-header">
        <p className="chat-title">Live Chat</p>
      </div>
      <div className="chat-body">
            <ScrollToBottom className='message-container'>
        {messageList.map((messageContent) => {
            return (
                <div className='message' id={username === messageContent.author ? "you" : "other"}>
                    <div id={messageContent.time}>
                        <div className='message-content'>
                            <p>{messageContent.message}</p>
                        </div>
                        <div className='message-meta'>
                            <p id="time">{new Date(messageContent.time).getHours()}:{new Date(messageContent.time).getMinutes()}</p>
                            <p id='author'>{messageContent.author}</p>
                        </div>
                    </div>
                </div>
            )
        })}
            </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input 
            className="chat-input" 
            value={currentMessage}
            type="text" 
            placeholder="Type a message" 
            onChange={(e) => {
                setCurrentMessage(e.target.value);
            }}
            onKeyDown={(e) => {
                e.key === "Enter" && sendMessage();
            }}    
        />
        <button className="chat-button" onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  )
}

export default Chat
