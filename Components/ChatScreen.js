import { Avatar, IconButton } from "@mui/material";
import MicIcon from '@mui/icons-material/Mic';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import { useRouter } from "next/router";
import { useAuthState } from "react-firebase-hooks/auth";
import styled from "styled-components";
import { db, auth } from "../firebase";
import MoreVert from "@mui/icons-material/MoreVert";
import { AttachFile } from "@mui/icons-material";
import { useCollection } from "react-firebase-hooks/firestore";
import React, { useState, useRef } from 'react';
import Message from "./Message";
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import getRecipientEmail from "../utils/getRecipientEmail";
import TimeAgo from "timeago-react";

function ChatScreen({ chat, messages }) {
    const [user] = useAuthState(auth);
    const router = useRouter();
    const endOfMessagesRef = useRef(null);
    const [input, setInput] = useState("")
    const [messagesSnapshot] = useCollection(
        db
            .collection("chats")
            .doc(router.query.id)
            .collection("messages")
            .orderBy("timestamp", "asc")
    );
    const [recipientSnapshot] = useCollection(db.collection("users").where("email", "==", getRecipientEmail(chat.users, user)))

    
    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
        })
    }
    const showMessages = () => {
        if (messagesSnapshot) {
            return messagesSnapshot.docs.map((message) => (
                <Message
                    key={message.id}
                    user={message.data().user}
                    message={{
                        ...message.data(),
                        timestamp: message.data().timestamp?.toDate().getTime(),
                    }}
                />
            ));
        } else {
            return JSON.parse(messages).map(message =>
                <Message key={message.id} user={message.user} message={message} />
            )
        }
        
    }

    const sendMessage = (e) => {
        e.preventDefault();

        db.collection("users").doc(user.uid).set({
            lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
        },
            { merge: true }
        );

        db.collection("chats").doc(router.query.id).collection("messages").add(
            {
                timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                message: input,
                user: user.email,
                photoURL: user.photoURL,
            });
        setInput("")
        scrollToBottom();
        
    };

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log("Chat Screenjs recipient");
    console.log(recipient)
    const recipientEmail = getRecipientEmail(chat.users, user);

    return (
        <Container>
            <Header>
                {recipient ? (
                    <Avatar src={recipient?.photoURL} />) : (
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}
                <HeaderInformation >
                    <h4> {recipientEmail.split("@")[0]}</h4>
                    {recipientSnapshot ?
                        (
                            <p> Last Seen: {" "}
                                {recipient?.lastSeen?.toDate() ?
                                    (<TimeAgo datetime={recipient?.lastSeen?.toDate()} />) : ("Unavailable")}
                            </p>
                        ) : (
                            <p>Loading Last Active...</p>
                        )
                    }

                </HeaderInformation>

                <HeaderIcons>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </HeaderIcons>
            </Header>
            <MessageContainer>
                {showMessages()}
                <EndofMessage ref={endOfMessagesRef} />
            </MessageContainer>

            <InputContainer>
                <InsertEmoticonIcon />
                <Input value={input} onChange={(e) => setInput(e.target.value)} />
                <button hidden disabled={!input} type="submit" onClick={sendMessage}>Send Message</button>
                <MicIcon />
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div``;

const Input = styled.input`
    flex:1;
    outline:0;
    border:1px solid #ece5dd;
    border-radius:10px;
    background-color:whitesmoke;
    padding:15px;
    margin-left:15px;
    margin-right:15px;
    font-size:13px;

`;

const InputContainer = styled.form`
    display:flex;
    align-items:center;
    padding:10px;
    position:sticky;
    bottom:0;
    background-color:white;
    z-index:100;

`;
const Header = styled.div`
    position: sticky;
    color:white;
    background-color: #128C7E;
    z-index: 100;
    top: 0;
    display: flex;
    padding: 11px;
    height: 70px;
    align-items: center;
    border-bottom: 1px solid whitesmoke;
`;

const HeaderInformation = styled.div`
    margin-left:15px;
    flex:1;
    color:white;
    >h4{
        margin-bottom:-5px;
    }
    >p{
        font-size:13px;
        padding-bottom:10px;
        
    }
`;
const EndofMessage = styled.div`
    margin-bottom:50px;
`;



const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
    padding:30px;
    background-color: #ece5dd;
    min-height:90vh;
    
`;