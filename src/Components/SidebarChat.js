import React, { useEffect, useState } from 'react'
import './SidebarChat.css'
import db from "../firebase"
import { Link } from "react-router-dom"

import { Avatar } from "@material-ui/core"

function SidebarChat({ id, name, addNewChat }) {
    //React hook load code when component runs

    const[seed, setSeed] = useState("");
    const[messages, setMessages] = useState("");

    //Puts in last message on the SidebarChat
    useEffect(() => {
        if (id) {
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp', 'desc')
            .onSnapshot(snapshot => (
                setMessages(snapshot.docs.map((doc) =>
                doc.data()
                ))
            ))
        }
    }, [id])

    //Makes random number, for unique Avatar
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    },[]);

    //Creates new chat room
    const createChat = () => {
        const roomName = prompt("Please enter name for chat room.");

        if(roomName) {
            //Database Firestore 
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }

    return !addNewChat ? (
            <Link to={`/rooms/${id}`}>
            <div className='sidebarChat'>
                <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} className="sidebarChat__avatar"></Avatar>
                <div className="sidebarChat__info">
                    <h2>{name}</h2>
                    <p>{messages[0]?.message}</p>
                </div>
            </div>
            </Link>
            ) : (
            <div onClick={createChat} className="sidebarChat">
                <h2>Add new chat</h2>
            </div>
    );
}

export default SidebarChat