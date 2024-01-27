const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

// Nowa tabela 'Uzytkownicy'
const users = [
  { userID: 1, nazwa: "Kuba", haslo: "admin", email: "kuba@example.com" },
  {
    userID: 2,
    nazwa: "Paulina",
    haslo: "admin2",
    email: "paulina@example.com",
  },
];

const posts = [
  {
    postID: 1,
    userID: 1,
    tytul: "Podróż do Grecji",
    tresc:
      "Odwiedzając Grecję, wchodzisz na ziemię mitów i bogów. Błękit Egejskiego morza, białe domy Santorini, i smak souvlaków tworzą niezapomnianą podróż. Zabytki, jak Partenon w Atenach, przypominają o bogatej historii. Lokalna kuchnia zachwyca, a gościnność Greków sprawia, że czujesz się jak w domu. Grecja to nie tylko podróż, to magiczne doświadczenie. #Grecja #Podróż #Odkrywanie",
    data: "",
    polub: 40,
  },
  {
    postID: 2,
    userID: 2,
    tytul: "Maraton w Olimpii - Bieg przez historię",
    tresc:
      "Wziąłem udział w maratonie w Olimpii, miejscu narodzin igrzysk olimpijskich. Biegając przez starożytne aleje, poczułem ducha historycznego współzawodnictwa. Niezapomniane doświadczenie!",
    data: "",
    polub: 50,
  },
];

const comments = [
  {
    komID: 1,
    postID: 1,
    nazwaKom: "Podroznik_123",
    trescKom:
      "Grecja to naprawdę magiczne miejsce! Mam nadzieję, że kiedyś też się tam wybiorę. Twój wpis zainspirował mnie do planowania podróży.",
  },
  {
    komID: 2,
    postID: 2,
    nazwaKom: "Sportowiec_567",
    trescKom:
      "Brawo za udział w maratonie w Olimpii! To musiało być niesamowite przeżycie. Jakie są Twoje plany na kolejne sportowe wyzwania?",
  },
];

app.get("/", (req, res) => {
  res.json({ message: "Hello World" });
});

app.get("/api/data", (req, res) => {
  res.json({ users, posts, comments });
});

app.post("/api/data", (req, res) => {
  const newData = req.body.newData;
  data.push(newData);
  res.json({ message: "Dane zostały dodane", data });
});

app.post("/api/users", (req, res) => {
  const newUser = req.body.newUser;

  const existingUser = users.find((user) => user.email === newUser.email);

  if (existingUser) {
    // Jeżeli użytkownik już istnieje, zwracamy błąd
    console.error("Użytkownik o podanym adresie e-mail już istnieje");
    return res
      .status(400)
      .json({ message: "Użytkownik o podanym adresie e-mail już istnieje" });
  }

  users.push(newUser);
  res.json({ message: "Użytkownik został dodany", users });
});

app.post("/api/comments", (req, res) => {
  const newComment = {
    komID: comments.length + 1,
    postID: req.body.postID,
    nazwaKom: req.body.nazwaKom,
    trescKom: req.body.trescKom,
  };
  comments.push(newComment);
  res.json({ message: "Komentarz został dodany", comments });
});

//logowanie
app.post("/api/login", (req, res) => {
  const { email, haslo } = req.body;

  // Weryfikacja danych logowania na podstawie danych użytkowników w bazie danych
  const user = users.find(
    (user) => user.email === email && user.haslo === haslo
  );

  if (user) {
    // Logowanie poprawne
    res.status(200).send({ success: true, message: "Logowanie poprawne" });
  } else {
    // Logowanie nieudane
    res.status(401).send({ success: false, message: "Błędne dane logowania" });
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
