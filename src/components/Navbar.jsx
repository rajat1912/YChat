import { signOut } from 'firebase/auth'
import React from 'react'
import { auth } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

export const Navbar = () => {
  const {currentUser} = useContext(AuthContext)
  const { dispatch } = useContext(ChatContext)

  const handleLogout = () => {
    dispatch({ type: "CLEAR_CHAT_DATA" }); // add this line to clear chat data
    signOut(auth) //firebase auth logout
  }; 
  return (
    <div className='navbar'>
        <span className='logo'>YChat</span>
        <div className='user'>
            <img src={currentUser.photoURL} alt='' />
            <span>{currentUser.displayName}</span>
            <button onClick={handleLogout}>logout</button>
        </div>
        </div>
  )
}
