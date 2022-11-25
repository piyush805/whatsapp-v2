import styled from "styled-components";
import React from 'react';
import Avatar from '@mui/material/Avatar';
import getRecipientEmail from "../utils/getRecipientEmail";
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from "../firebase";
import { useCollection } from 'react-firebase-hooks/firestore';
import { query, where, collection } from "firebase/firestore"; // v9  
import  {useRouter} from "next/router";

function Chat({ id, users }) {
    
    const router = useRouter();
    const [user] = useAuthState(auth);
    const recipientEmail = getRecipientEmail(users, user);
    const recipientRef = db.collection("users").where("email", "==", recipientEmail)
    
    // const recipientRef = query(collection(db,"users"),where('email', '===', getRecipientEmail(users, user))) // v9
    const [recipientSnapshot] = useCollection(recipientRef);
    
    const enterChat = ()=>{
        router.push(`/chat/${id}`);
    }
    const recipient = recipientSnapshot?.docs?.[0]?.data();
    console.log("Chat.js recipient:");
    console.log(recipient);
    return (
        <Container onClick = {enterChat}>
            {recipient ? (
                <UserAvatar src = {recipient?.photoURL} />
            ) : (
                <UserAvatar>{recipientEmail[0]}</UserAvatar>)
            }
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat

const Container = styled.div`
    display: flex;
    align-items: center;
    font-size:14px;
    cursor: pointer;
    padding: 5px;
    word-break: break-word;
    :hover{
        background-color: #e9eaeb;
    }
`;

const UserAvatar = styled(Avatar)`
    margin: 3px;
    margin-right: 15px;
`;