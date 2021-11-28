import "./App.css";
import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";
import heart from "./icons/heart.svg"

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: ""
  });

  useEffect(() => {
    const cancelarSuscripcion = firestore.collection("tweets").onSnapshot((snapshot) => {
        const tweets = snapshot.docs.map((doc) => {
          return {
            tweet: doc.data().tweet,
            autor: doc.data().autor,
            id: doc.id,
            likes: doc.data().likes
          };
        });
        setTweets(tweets);
      });
      return () => cancelarSuscripcion();
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
    // enviamos el tweet a la colección
    firestore.collection("tweets").add(tweet);
  };

  const deleteTweet = (id) => {
    // borramos el tweet en firebase
    firestore.doc(`tweets/${id}`).delete();
  };

  const likeTweet = (id, likes) => {
    if (!likes) likes = 0;
    // actualizamos el tweet en firebase
    firestore.doc(`tweets/${id}`).update({ likes: likes + 1 });
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

    <div className="container-tweet">
      <h1>Tweets:</h1>
      {tweets.map((tweet) => {
        return (
          <div  className="message" key={tweet.id}>
            <h1>{tweet.tweet}
                <span onClick={() => deleteTweet(tweet.id)} className="delete">X</span>
            </h1>
            <h4>por: {tweet.autor}</h4>
            {/* <span>{tweet.likes}</span> */}
            <span onClick={() => likeTweet(tweet.id)} className="likes"> 
              <img height="13px" src={heart}/>
              <span>{tweet.likes ? tweet.likes : 0}</span>
            </span>
          </div>
        );
      })}
    </div>
  </div>
);
}

