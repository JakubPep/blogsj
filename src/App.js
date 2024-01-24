import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [apiData, setApiData] = useState([]);
  const [nazwaKom, setNazwaKom] = useState("");
  const [trescKom, setTrescKom] = useState("");

  
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/data")
      .then((response) => setApiData(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  const handleAddComment = (postID, nazwaKom, trescKom) => {
    axios
      .post("http://localhost:5000/api/comments", {
        postID,
        nazwaKom,
        trescKom,
      })
      .then((response) => {
        setApiData({ ...apiData, comments: response.data.comments });
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <div className="App">
      <h1>React z Express</h1>
      {apiData.users && (
        <div>
          <h2>Użytkownicy:</h2>
          <ul>
            {apiData.users.map((user) => (
              <li key={user.userID}>
                <strong>{user.nazwa}</strong> ({user.email})
              </li>
            ))}
          </ul>
        </div>
      )}
      {apiData.posts && (
        <div>
          <h2>Posty:</h2>
          <ul>
            {apiData.posts.map((post) => (
              <li key={post.postID}>
                <strong>{post.tytul}</strong> (Autor:{" "}
                {
                  apiData.users.find((user) => user.userID === post.userID)
                    .nazwa
                }
                )<p>{post.tresc}</p>
                <p>
                  Liczba wyświetleń: {post.wysw}, Polubienia: {post.polub}
                </p>
                <h3>Komentarze:</h3>
                <ul>
                  {apiData.comments
                    .filter((comment) => comment.postID === post.postID)
                    .map((comment) => (
                      <li key={comment.komID}>
                        <strong>{comment.nazwaKom}</strong>: {comment.trescKom}
                      </li>
                    ))}
                </ul>
                <div>
                  <input
                    type="text"
                    placeholder="Twoja nazwa"
                    onChange={(e) => setNazwaKom(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Treść komentarza"
                    onChange={(e) => setTrescKom(e.target.value)}
                  />
                  <button
                    onClick={() =>
                      handleAddComment(post.postID, nazwaKom, trescKom)
                    }
                  >
                    Dodaj komentarz
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
