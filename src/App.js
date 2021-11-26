import "./App.css";
import React, { useEffect, useState } from "react";
import { firestore } from "./firebase";

function App() {
  const [message, setMessage] = useState([]);

  useEffect(() => {
  firestore.collection("tweets")
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
    console.log(doc.data());
    setMessage(doc.data());
    });
  }, [message])
 }

  )

  console.log(message);

  return (
    <div className="App">
      <div>
        <p>Esto es un texto</p>
        <p>{message.autor}</p>
        <p>{message.libro}</p>
      </div>
    </div>
  );
}

export default App;
