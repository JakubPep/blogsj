import React, { useState } from "react";
import { useData } from "../context/DataContext";
import axios from "axios";

const Home = () => {
  const { data, setData, fetchData } = useData();
  const { users, posts, comments } = data;
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
      window.location.reload();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="Home">
        <h1>Super ektra blogas</h1>
        {posts && (
          <div>
            <h2>Posty użytkowników</h2>
            <ul>
              {posts.map((post) => (
                <li key={post.postID}>
                  <h3><strong>{post.tytul}</strong></h3> <span>(Autor:{" "}
                  {users.find((user) => user.userID === post.userID).nazwa})</span>
                  <p>{post.tresc}</p>
                  <p>
                    Liczba wyświetleń: {post.wysw}, Polubienia: {post.polub}
                  </p>
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
