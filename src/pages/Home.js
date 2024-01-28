import React, { useState, useEffect } from "react";
import { useData } from "../context/DataContext";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/home.css";

const Home = () => {
  const { data, setData, fetchData } = useData();
  const { users, posts, comments } = data;
  const [nazwaKom, setNazwaKom] = useState("");
  const [trescKom, setTrescKom] = useState("");
  const [loggedInUserName, setLoggedInUserName] = useState("");

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      const userID = localStorage.getItem("userID");
      const loggedInUser = users.find(
        (user) => user.userID === parseInt(userID)
      );
      setLoggedInUserName(loggedInUser?.nazwa);
      localStorage.setItem("loggedInUserName", loggedInUser?.nazwa);
    }
  }, [users]);

  useEffect(() => {
    if (localStorage.getItem("isLogged") === "true") {
      const userID = localStorage.getItem("userID");
      const loggedInUser = users.find(
        (user) => user.userID === parseInt(userID)
      );
      setLoggedInUserName(loggedInUser?.nazwa);
    }
  }, [posts]);

  const handleAddComment = async (postID) => {
    try {
      const newComment = {
        postID,
        nazwaKom,
        trescKom,
      };

      const response = await axios.post(
        "http://localhost:5000/api/comments",
        newComment
      );
      // Aktualizuje stan danych po dodaniu nowego komentarza
      setData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, response.data],
      }));

      fetchData();

      // Czyści pola formularza po dodaniu komentarza
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleLogout = () => {
    localStorage.setItem("isLogged", false);
    window.location.reload();
    localStorage.setItem("loggedInUserName", "");
  };

  const handleLike = async (postID) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/posts/${postID}/like`
      );

      fetchData();
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  return (
    <>
      <div className="home">
        {localStorage.getItem("isLogged") === "true" ? (
          <>
            {loggedInUserName && <h2>Witaj, {loggedInUserName}!</h2>}
            <div className="home-action-btns">
              <Link to="/new_post" className="new-post-btn">
                Nowy post
              </Link>
              <button onClick={handleLogout}>Wyloguj</button>
            </div>
          </>
        ) : (
          <div className="log-reg-buttons">
            <Link to="/login">Zaloguj</Link>
            <Link to="/register">Zarejestruj</Link>
          </div>
        )}
        <h1>Super ekstra blogas</h1>
        {posts && (
          <div>
            <h2>Posty użytkowników</h2>
            <ul>
              {posts.map((post) => (
                <li key={post.postID}>
                  <h3>
                    <strong>{post.tytul}</strong>
                  </h3>{" "}
                  <span>
                    (Autor:{" "}
                    <Link to={`/user/${post.userID}`}>
                      {users.find((user) => user.userID === post.userID)
                        ?.nazwa || "Nieznany"}
                    </Link>
                    )
                  </span>
                  <p>{post.tresc}</p>
                  <p>Polubienia: {post.polub}</p>
                  <button onClick={() => handleLike(post.postID)}>Polub</button>
                  <h3>Komentarze:</h3>
                  <ul>
                    {comments
                      .filter((comment) => comment.postID === post.postID)
                      .map((comment) => (
                        <li key={comment.komID}>
                          <strong>{comment.nazwaKom}</strong>:{" "}
                          {comment.trescKom}
                        </li>
                      ))}
                  </ul>
                  <div className="new-comment">
                    <input
                      type="text"
                      placeholder="Twoja nazwa"
                      onChange={(e) => setNazwaKom(e.target.value)}
                    />
                    <textarea
                      className="new-comment-text"
                      type="textarea"
                      placeholder="Treść komentarza"
                      rows="6"
                      cols="50"
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
      ;
    </>
  );
};

export default Home;
