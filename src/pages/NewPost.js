import React, { useState } from "react";
import axios from "axios";

const NewPost = () => {
  const [tytul, setTytul] = useState("");
  const [tresc, setTresc] = useState("");

  const loggedInUserName = localStorage.getItem("loggedInUserName");
  const loggedInUser = localStorage.getItem("userID");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        tytul,
        tresc,
        nazwa: loggedInUserName,
        userID: parseInt(loggedInUser), // Pobieramy userID z localstorage
      };

      const response = await axios.post(
        "http://localhost:5000/api/posts",
        newPost
      );

      console.log(response);

      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  return (
    <div>
      <h2>Nowy post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tytuł:</label>
          <input
            type="text"
            value={tytul}
            onChange={(e) => setTytul(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Treść:</label>
          <textarea
            value={tresc}
            onChange={(e) => setTresc(e.target.value)}
            required
          />
        </div>
        <button type="submit">Dodaj post</button>
      </form>
    </div>
  );
};

export default NewPost;
