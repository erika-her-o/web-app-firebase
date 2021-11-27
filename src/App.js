import "./App.css";
import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: ""
  });

  useEffect(() => {
    firestore
      .collection("tweets")
      .get()
      .then((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            tweet: doc.data().tweet,
            autor: doc.data().autor,
            id: doc.id
          };
        });
        setTweets(tweets);
      });
  }, []);

  const handleChange = (e) => {
    let newTweet = {
      ...tweet,
      [e.target.name]: e.target.value
    }

    setTweet(newTweet);
  }

  // console.log(tweet);
  
  const sendTweet = (e) => {
    e.preventDefault();
    
    let enviarTweet = firestore.collection("tweets").add(tweet);
    
    let solicitarDocumento = enviarTweet.then((docRef) => {
     
    return docRef.get();
    });
   
    solicitarDocumento.then((doc) => {
      let nuevoTweet = {
        tweet: doc.data().tweet,
        autor: doc.data().autor,
        id: doc.id
      };
      setTweets([nuevoTweet, ...tweets]);
    });
  };

 return (
  <div className="App">
    <form className="form">
      <textarea name="tweet" onChange={handleChange} value={tweet.tweet} rows="5" cols="30" placeholder= "Write something here"/>
      
      <div className="input-group"> 
        <input name="autor"  onChange={handleChange} value={tweet.autor} type="text" placeholder="Written by"/>
        <button onClick={sendTweet}>send tweet</button>
      </div>
    </form>

    <h1>Tweets:</h1>
    {tweets.map((tweet) => {
      return (
        <div key={tweet.id}>
          <h1>{tweet.tweet}</h1>
          <h4>por: {tweet.autor}</h4>
        </div>
      );
    })}
  </div>
);
}

