import React, { useState } from "react";
import axios from "axios";

const Register = () => {
    const [formData, setFormData] = useState({
        nazwa: "",
        email: "",
        haslo: "",
        powtorzHaslo: "",
    });
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Sprawdzenie, czy has³a siê zgadzaj¹
        if (formData.haslo !== formData.powtorzHaslo) {
            setErrorMessage("Podane has³a nie s¹ zgodne");
            return;
        }

        try {
            const response = await axios.post("http://localhost:5000/api/users", {
                newUser: formData,
            });

            // W przypadku sukcesu, zresetuj formularz i wyœwietl komunikat o sukcesie
            console.log(response.data.message);
            setFormData({
                nazwa: "",
                email: "",
                haslo: "",
                powtorzHaslo: "",
            });
            setErrorMessage("");
            window.location.href = "/";
        } catch (error) {
            // Obs³uga b³êdów, np. gdy u¿ytkownik ju¿ istnieje
            if (error.response && error.response.status === 400) {
                setErrorMessage(error.response.data.message);
            } else {
                console.error("B³¹d:", error);
            }
        }
    };

    return (
        <div>
            <h2>Rejestracja</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nazwa u¿ytkownika:</label>
                    <input
                        type="text"
                        name="nazwa"
                        value={formData.nazwa}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Has³o:</label>
                    <input
                        type="password"
                        name="haslo"
                        value={formData.haslo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div>
                    <label>Powtórz has³o:</label>
                    <input
                        type="password"
                        name="powtorzHaslo"
                        value={formData.powtorzHaslo}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit">Zarejestruj</button>
            </form>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default Register;
