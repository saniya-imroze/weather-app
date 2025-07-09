"use client";

import { useState, useEffect } from "react";
import Weather from "@/src/components/Weather";

export default function Home() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = "59a30b45b80b2937d2ed0f05ada9c5ed";

  const getWeatherByCity = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!res.ok) throw new Error("City not found");
      const data = await res.json();
      setWeather(data);
    } catch (err) {
      setError(err.message);
      setWeather(null);
    } finally {
      setLoading(false);
    }
  };

  const getWeatherByLocation = () => {
    setLoading(true);
    setError(null);
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        try {
          const res = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`
          );
          const data = await res.json();
          setWeather(data);
        } catch (err) {
          setError("Failed to fetch weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Geolocation permission denied.");
        setLoading(false);
      }
    );
  };

  useEffect(() => {
    getWeatherByLocation();
  }, []);

  return (
    <main className="relative min-h-screen w-full overflow-hidden bg-slate-950 px-4 py-10 flex items-center justify-center">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-0" />

      {/* Weather Card */}
      <div className="relative z-10 max-w-md w-full bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-8 space-y-6 text-white">
        <h1 className="text-3xl font-bold text-center drop-shadow">
          🌦 Weather App
        </h1>

        {/* Input Section */}
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            placeholder="Enter city"
            className="flex-1 px-4 py-2 rounded-lg text-white bg-transparent border border-white placeholder-white focus:outline-none focus:ring-2 focus:ring-white shadow"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <button
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700"
            onClick={getWeatherByCity}
          >
            Search
          </button>
        </div>

        {/* Location Button */}
        <button
          className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-800"
          onClick={getWeatherByLocation}
        >
          📍 Use My Location
        </button>

        {/* Status Messages */}
        {loading && <p className="text-center">Loading weather...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}

        {/* Weather Output */}
        {weather && <Weather weather={weather} />}
      </div>
    </main>
  );
}
