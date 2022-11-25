import styled from "styled-components";
import React from 'react'
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";
import moment from "moment";

function Message({ user, message }) {

    const [userLoggedIn] = useAuthState(auth);

    const TypeOfMessage = user === userLoggedIn.email ? Sender : Reciever;

    return (
        <Container>
            <TypeOfMessage> <span style={{  paddingRight: "50px" }}>{message.message}</span>
                <TimeStamp style={{ display: "inline" }}>
                    {message.timestamp ? moment(message.timestamp).format("LT") : "..."}
                </TimeStamp >
            </TypeOfMessage>

        </Container>
    )
}

export default Message

const Container = styled.div``;


const MessageElement = styled.p`
    width: fit-content;
    font-size:13px;
    padding: 10px;
    padding-bottom: 15px;
    border-radius: 13px;
    margin: 5px;
    margin-bottom: 0;
    min-width: 100px;
    max-width: 70%;
    position: relative;
    text-align: left;
    border-bottom: 1px solid #cccccc;
    `;

const Sender = styled(MessageElement)`
    margin-left:auto;
    background-color:#dcf8c6;  
    border-top-right-radius:0px;
`;

const Reciever = styled(MessageElement)`
    text-align:left;
    background-color:white;  
    border-top-left-radius:0px;
`;

const TimeStamp = styled.span`
    color:gray;
    padding:10px;
    font-size:10px;
    margin-bottom:0px;
    position:absolute;
    bottom:0;
    text-align:right;
    right:0;
`;