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

  return (
    <>
      <div className="home">
        {localStorage.getItem("isLogged") === "true" ? (
          <>
            {loggedInUserName && <h2>Witaj, {loggedInUserName}!</h2>}
            <button onClick={handleLogout}>Wyloguj</button>
            <Link to="/new_post">Nowy post</Link>
          </>
        ) : (
          <div>
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
      ;
    </>
  );
};

export default Home;
