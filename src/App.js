import React, { useState, useEffect } from "react";
import {
  FormControl,
  Input,
  IconButton,
} from "@material-ui/core";
import "./App.css";
import Message from "./components/message/Message";
import db from "./firebase";
import firebase from "firebase";
import FlipMove from "react-flip-move";
import SendIcon from "@material-ui/icons/Send";

const App = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState("");

  useEffect(() => {
    // if we have a variable in input , it tuns every time input changes

    // const name = prompt('enter your name')
    setUsername(prompt("Please enter your name"));
  }, []);

  useEffect(() => {
    db.collection("messages")
      .orderBy("timestamp", "desc")
      .onSnapshot((snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({ id: doc.id, message: doc.data() }))
        );
      });
  }, []);

  const sendMessage = (event) => {
    event.preventDefault();
    db.collection("messages").add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="App">
      <img
        className="logo"
        src="https://facebookbrand.com/wp-content/uploads/2018/09/Header-e1538151782912.png?w=200&h=200"
        alt="messenger"
      />
      <h1>Messenger</h1>
      <h2>Welcome {username} </h2>

      <form className="app__form">
        <FormControl className='app__formControl'>
          <Input
          className='app__input'
            type="text"
            value={input}
            placeholder='Enter a message ...'
            onChange={(event) => setInput(event.target.value)}
          />

          <IconButton
            disabled={!input}
            variant="contained"
            color="primary"
            type="submit"
            onClick={sendMessage}
            className='app__iconButton'
          >
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {messages.map(({ id, message }) => (
          <Message key={id} username={username} message={message} />
        ))}
      </FlipMove>
    </div>
  );
};

export default App;
