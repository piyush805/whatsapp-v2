import React from 'react'
import Head from 'next/head';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import {auth, provider} from "../firebase";
import { signInWithPopup} from "firebase/auth";

function Login() {

  const signIn = () =>{
    signInWithPopup(auth, provider).catch(alert);
  }
  return (
    <Container>
      <Head>
        <title>Login</title>
      </Head>
      <LoginContainer>
        <Logo src="https://th.bing.com/th/id/R.3db05f40f9bfbfa4818e5f841359ac18?rik=i9uCGc2yoCWfNA&riu=http%3a%2f%2fspeedyclearance.uk%2fwp-content%2fuploads%2f2018%2f04%2fwhatsapp-icon.png&ehk=%2fGSNSk4y8vLd2qCiosXRI0WSYOth7SLdJewCXSxpcmY%3d&risl=&pid=ImgRaw&r=0" />
        <Button onClick = {signIn} variant = "outlined">Sign in with google</Button>
      </LoginContainer>
    </Container>
  )
}

export default Login

const Container = styled.div`
  display: grid;
  place-items: center;
  height:100vh;
  background-color:whitesmoke;
`;

const LoginContainer = styled.div`
  display:flex;
  flex-direction: column;
  padding: 100px;
  align-items: center;
  background-color: white;
  border-radius:5px;
  box-shadow: 0px 4px 14px -3px rgba(0,0,0,0.7);
`;

const Logo = styled.img`
  height:200px;
  width:200px;
  margin-bottom: 50px;
`;