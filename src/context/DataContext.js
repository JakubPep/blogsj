import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

// Tworzymy kontekst danych
const DataContext = createContext();

// Wstępne ustawienie wartości kontekstu
const initialDataState = {
  users: [],
  posts: [],
  comments: [],
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(initialDataState);
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    fetchData(); // Pobierz dane z serwera przy pierwszym renderowaniu komponentu
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/data");
      setData(response.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{ data, setData, fetchData, isLogged, setIsLogged }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
