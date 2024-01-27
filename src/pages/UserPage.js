import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { useParams } from "react-router-dom";
import axios from "axios";

const UserPage = () => {
  const { userID } = useParams();
  const { data, setData, fetchData } = useData();
  const { posts, users, comments } = data;

  const userName = users.find(
    (user) => user.userID === parseInt(userID)
  )?.nazwa;

  const [nazwaKom, setNazwaKom] = useState("");
  const [trescKom, setTrescKom] = useState("");

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

      // Aktualizuj stan danych po dodaniu nowego komentarza
      setData((prevData) => ({
        ...prevData,
        comments: [...prevData.comments, response.data],
      }));

      fetchData();

      // Czyść pola formularza po dodaniu komentarza
      setNazwaKom("");
      setTrescKom("");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <h2>Posty użytkownika {userName}</h2>
      {posts
        .filter((post) => post.userID === parseInt(userID))
        .map((post) => (
          <div key={post.postID}>
            <h3>
              <strong>{post.tytul}</strong>
            </h3>
            <p>{post.tresc}</p>
            <p>Polubienia: {post.polub}</p>
            <p>
              Komentarze <strong>(
              {
                comments.filter((comment) => comment.postID === post.postID)
                  .length
              })</strong>
            </p>
            <ul>
              {comments
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
                value={nazwaKom}
                onChange={(e) => setNazwaKom(e.target.value)}
              />
              <input
                type="text"
                placeholder="Treść komentarza"
                value={trescKom}
                onChange={(e) => setTrescKom(e.target.value)}
              />
              <button onClick={() => handleAddComment(post.postID)}>
                Dodaj komentarz
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default UserPage;
