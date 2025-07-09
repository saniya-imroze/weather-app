import React from "react";

export default function Weather({ weather }) {
    const temperature = Math.round(weather.main.temp - 273.15);
    const icon = weather.weather[0].icon;
    const description = weather.weather[0].description;
  
    return (
      <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg text-center space-y-3 max-w-sm w-full">
        <h1 className="text-2xl font-bold">{weather.name}</h1>
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt={description}
          className="mx-auto"
        />
        <p className="text-xl">{description}</p>
        <p className="text-3xl font-bold">🌡 {temperature}°C</p>
        <p className="text-sm text-gray-600">
          Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s
        </p>
      </div>
    );
  }
  