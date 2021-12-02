import "./App.css";
import React, { useEffect, useState } from 'react';
import { firestore, loginConGoogle, auth, logout } from './firebase';
import heart from './icons/heart.svg';

export default function App() {
  const [tweets, setTweets] = useState([]);
  const [tweet, setTweet] = useState({
    tweet: "",
    autor: ""
  });
  const [ user, setUser] = useState(null);

  useEffect(() => {
    const desuscribir = firestore
      .collection("tweets")
      .onSnapshot((snapshot) => {
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

    auth.onAuthStateChanged((user) => {
      setUser(user);
      console.log(user);
    });
    return () => desuscribir();
  }, []);

  const handleChange = (e) => {
    let newTweet = {
      ...tweet,
      [e.target.name]: e.target.value
    };

    setTweet(newTweet);
  };

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
    {user ? (
        <>
          <div className="user-profile">
            <img className="user-profile-pic" src={user.photoURL} alt="" />
            <p>¡Hola {user.displayName}!</p>
            <button onClick={logout}>Log out</button>
          </div>
        </>
      ) : (
        <button className="login-btn" onClick={loginConGoogle}>
          Login con google
        </button>
      )}
    <div className="post flex">
      <form className="form">
      <textarea
          name="tweet" onChange={handleChange} value={tweet.tweet} cols="30" rows="5" placeholder="escribe un tweet..."/>
        <div className="input-group">
          <input name="autor" onChange={handleChange} value={tweet.autor} type="text" placeholder="persona autora"/>
          <button onClick={sendTweet}>Enviar tweet</button>
        </div>
      </form>
    </div>
    
    <div className="container-tweet-global flex">
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
                <img src={heart} alt=""/>
                <span>{tweet.likes ? tweet.likes : 0}</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
    
  </div>
);
}

