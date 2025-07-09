# weather-app
Weather app - To Learn API and Get to know how you can get started. Simple Application to Learn API Integration with Next.js and Open Weather API.

<img width="1470" alt="Screenshot 2025-07-10 at 12 42 05 AM" src="https://github.com/user-attachments/assets/809a858a-a772-4541-820c-29ef07fec23f" />

✅ Prerequisites
Make sure you have:

Node.js installed

A free API key from https://openweathermap.org

Basic knowledge of JavaScript and React

🔧 Step 1: Create a Next.js Project
bash
Copy
Edit
npx create-next-app@latest weather-app
cd weather-app
🎨 Step 2: Set Up Tailwind CSS (optional but recommended)
bash
Copy
Edit
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
Edit tailwind.config.js:

js
Copy
Edit
content: [
  "./app/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
]
Edit app/globals.css:

css
Copy
Edit
@tailwind base;
@tailwind components;
@tailwind utilities;
🌐 Step 3: Get Your API Key
Go to https://openweathermap.org/api

Sign in and generate your API key

🔑 Step 4: Store API Key Securely
Create a .env.local file in your project root:

ini
Copy
Edit
NEXT_PUBLIC_WEATHER_API_KEY=your_api_key_here
Never hardcode API keys directly in your code!

🧱 Step 5: Create WeatherCard Component
Create a new file: components/WeatherCard.js

jsx
Copy
Edit
'use client';

export default function WeatherCard({ weather }) {
  const tempC = Math.round(weather.main.temp - 273.15);
  const icon = weather.weather[0].icon;
  const desc = weather.weather[0].description;

  return (
    <div className="p-6 rounded-xl bg-white/10 backdrop-blur border border-white/20 text-white text-center shadow-lg space-y-2">
      <h2 className="text-2xl font-bold">{weather.name}</h2>
      <img src={`https://openweathermap.org/img/wn/${icon}@2x.png`} alt={desc} className="mx-auto" />
      <p className="capitalize">{desc}</p>
      <p className="text-3xl font-bold">{tempC}°C</p>
      <p className="text-sm">Humidity: {weather.main.humidity}% | Wind: {weather.wind.speed} m/s</p>
    </div>
  );
}
🏠 Step 6: Build the Main Page
Edit app/page.js (Next.js App Router version):

jsx
Copy
Edit
'use client';

import { useState, useEffect } from 'react';
import WeatherCard from '../components/WeatherCard';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_WEATHER_API_KEY;

  const getWeatherByCity = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`);
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
          const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
          const data = await res.json();
          setWeather(data);
        } catch {
          setError("Failed to fetch weather");
        } finally {
          setLoading(false);
        }
      },
      () => {
        setError("Location permission denied");
        setLoading(false);
      }
    );
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white p-6 flex items-center justify-center">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-4xl font-bold text-center">🌦 Weather App</h1>

        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Enter city"
            className="flex-1 px-4 py-2 rounded border border-white bg-transparent placeholder-white text-white"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={getWeatherByCity} className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 border border-blue-500">
            Search
          </button>
        </div>

        <button onClick={getWeatherByLocation} className="w-full px-4 py-2 rounded bg-gray-700 hover:bg-gray-800 border border-gray-500">
          📍 Use My Location
        </button>

        {loading && <p className="text-center">Loading...</p>}
        {error && <p className="text-center text-red-400">{error}</p>}
        {weather && <WeatherCard weather={weather} />}
      </div>
    </main>
  );
}
🚀 Step 7: Deploy on Vercel
Push your code to GitHub

Go to https://vercel.com

Import the GitHub repo

During setup, add environment variable:

Name	Value
NEXT_PUBLIC_WEATHER_API_KEY	Your OpenWeather API Key

Click Deploy

✅ Your app is live on https://your-app-name.vercel.app
