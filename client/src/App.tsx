import { useEffect, useState } from 'react'
import './App.css'
import * as io from 'socket.io-client'
const socket = io.connect("http://localhost:3500")
function App() {
  const [message, SetMessage] = useState('')
  const [showMessage, setShowMessage] = useState('')
  const [room, setRoom] = useState('')

  const sendMsg = () => {
    socket.emit("sendMessage", { message,room })
  }

  useEffect(() => {
    socket.on("receiveSms", (data) => {
      setShowMessage(data.message)
      console.log(data)
    })
  }, [socket])
const joinRoom=() => {
  socket.emit("joinRoom", room)
}
  return (
    <>
        <input type="text" onChange={(e)=>setRoom(e.target.value)} name="" id="" />
        <button onClick={joinRoom}>join room</button>
      <input type="text" placeholder='msg' onChange={(e)=>SetMessage(e.target.value)} />
      <button onClick={sendMsg}>send </button>
      <h1>sms</h1>
      <div>{showMessage}</div>
    </>
  )
}

export default App
