import React from 'react';
import styled from "styled-components";
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';

import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import ChatIcon from '@mui/icons-material/Chat';

import *  as EmailValidator from "email-validator";

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { signOut } from "firebase/auth";

import Chat from "./Chat"
import { auth, db } from "../firebase";
import {  collection, addDoc ,query, where } from "firebase/firestore";  

function Sidebar() {
    const [user] = useAuthState(auth);
   
    // const userChatRef = query(collection(db,'chats'),where('users', 'array-contains', user.email));
    const userChatRef = db.collection('chats').where('users', 'array-contains', user.email);

    const [chatsSnapshot] = useCollection(userChatRef);

    const chatAlreadyExists = (recipientEmail) => 
        !!chatsSnapshot?.docs.find(
            (chat) =>
                chat.data().users.find((user) => user === recipientEmail)?.length > 0
        );

    const createChat = () => {
        const input = prompt(
            "Enter name email address for the user you widh to have chat with"
            );

        if (!input) return null;

        if (EmailValidator.validate(input)
            && !chatAlreadyExists(input)
            && input !== user.email) {
            //we need to add the DB chat collection if the chat doesnt exist and is valid 
            db.collection('chats').add({
                users: [user.email, input],
            });
        }
    };


    return (
        <Container>
            <Header>
                <UserAvatar src={user.photoURL} onClick={() => signOut(auth)} />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </IconsContainer>
            </Header>
            <Search>
                <SearchIcon />
                <SearchInput placeholder="Search in chats" />
            </Search>
            <SidebarButton onClick = {createChat} >Start a new chat</SidebarButton>
            {/* List of chats */}
            {chatsSnapshot?.docs.map((chat) => (
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}

        </Container>
    )
}

export default Sidebar

const Container = styled.div`
    flex:0.45;
    border-right:1px solid whitesmoke;
    height:100vh;
    min-width:250px;
    max-width:350px;
    overflow-y:scroll;
    ::-webkit-scrollbar{
        display:none;
    }
    -ms-overflow-style:none;
    scrollbar-width:none;

`;

const SearchInput = styled.input`
    outline-width:0;
    border:none;
    flex:1;
    
`;

const Search = styled.div`
    display:flex;
    align-items:center;
    padding:10px;
    border-radius: 2px;

`;
const SidebarButton = styled(Button)`
    width: 100%;
    border-top:1px solid whitesmoke;
    border-bottom:1px solid whitesmoke;
    &&&{
        color:black;
    :hover{
        background-color: whitesmoke;
    }}
`;
const Header = styled.div`
    display: flex;
    position:  sticky;
    top: 0;
    background-color: white;
    z-index: 1;
    justify-content: space-between;
    align-items: center;
    padding:10px;
    height:60px;
    border:1px solid whitesmoke;
`;


const UserAvatar = styled(Avatar)`
    cursor:pointer;

    :hover{
        opacity:0.8;
    }
`;

const IconsContainer = styled.div``;