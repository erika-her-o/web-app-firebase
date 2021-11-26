import "./App.css";
import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";

export default function App() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
  firestore.collection("tweets")
  .get()
  .then((snapshot) => {
    const tweets = snapshot.docs.map((doc) => {
      return {
        tweet: doc.data().tweet,
        autor: doc.data().autor,
        id: doc.id
      }
    })
    setTweets(tweets);
    });
  }, [])
 }



  return (
    <div className="App">
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


