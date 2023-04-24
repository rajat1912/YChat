import { doc, onSnapshot } from 'firebase/firestore'
import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

export const Chats = () => {

    const [chats, setChats] = useState([])

    const { currentUser } = useContext(AuthContext)
    const { dispatch } = useContext(ChatContext)
   
    function formatDate(lastMessageDate) {
        if (!lastMessageDate) {
          
          return 'Loading...';
        } else {
            const messageDate = lastMessageDate.toDate();
          const today = new Date();
          if (
            messageDate.getDate() === today.getDate() &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear()
          ) {
            return messageDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
          } else if (
            messageDate.getDate() === today.getDate() - 1 &&
            messageDate.getMonth() === today.getMonth() &&
            messageDate.getFullYear() === today.getFullYear()
          ) {
            return 'Yesterday';
          } else {
            return messageDate.toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' });
          }
        }
    }
 
    
      
    useEffect(() => {
        const getChats = () => {
            const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
                setChats(doc.data())
            });
            return () => {
                unsub();
            }
        }
        currentUser.uid && getChats();
    }, [currentUser.uid])
    const handleSelect = (u) => {
        dispatch({type:"CHANGE_USER",payload: u})
    }
    return (
        <div className='chats'>
            {Object.entries(chats)?.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
                <div 
                className='userChat' 
                key={chat[0]} 
                onClick={() => handleSelect(chat[1].userInfo)}
                >
                    <img src={chat[1].userInfo.photoURL} alt='' />
                    <div className='userChatInfo'>
                        <span>{chat[1].userInfo.displayName}</span>
                        <p>{chat[1].lastMessage?.text}</p>
                        <p className='lastTime' >{formatDate(chat[1].date)}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}
