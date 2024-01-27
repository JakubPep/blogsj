import React, { useState } from "react";
import axios from "axios";

const NewPost = () => {
  const [tytul, setTytul] = useState("");
  const [tresc, setTresc] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newPost = {
        tytul,
        tresc,
        userID: localStorage.getItem("userID"), // Pobieramy userID z localstorage
      };

      const response = await axios.post(
        "http://localhost:5000/api/posts",
        newPost
      );

      console.log(response.data); // Opcjonalne - wyświetlenie danych zwróconych przez serwer po dodaniu postu

      // Czyszczenie pól formularza po dodaniu postu
      setTytul("");
      setTresc("");
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
