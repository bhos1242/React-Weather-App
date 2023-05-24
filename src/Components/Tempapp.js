import React, { useEffect, useState } from "react";
import "./css/style.css";

const Tempapp = () => {
  const [city, setCity] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a23ed96b2e3169a12c54f93f1ff93465`;
        const response = await fetch(url);
        if (response.ok) {
          const data = await response.json();
          setCity(data);
        } else {
          console.log("Error:", response.status);
          setCity(null);
        }
      } catch (error) {
        console.log("Error:", error);
        setCity(null);
      }
    };

    if (search) {
      fetchWeatherData();
    }
  }, [search]);

  return (
    <>
      <div className="box">
        <h1 className="title">Weather Update</h1>
        <div className="inputData">
          <input
            type="search"
            className="inputField"
            placeholder="Enter city name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {city && (
          <div className="info">
            <h2 className="location">
              <i className="fa-solid fa-street-view"></i>
              {city.name}
            </h2>
            <h1 className="temp">{Math.round(city.main.temp - 273.15)}°C</h1>
            <h3 className="tempmin_max">
              Min: {Math.round(city.main.temp_min - 273.15)}°C || Max:{" "}
              {Math.round(city.main.temp_max - 273.15)}°C
            </h3>
          </div>
        )}

        {!city && search && (
          <p className="error">No weather data found for the entered city.</p>
        )}
      </div>
    </>
  );
};

export default Tempapp;
