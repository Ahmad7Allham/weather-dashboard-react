import { useEffect, useState } from "react";
import { motion } from "framer-motion";

function App() {
  // Search input
  const [city, setCity] = useState("");

  // Weather data
  const [weather, setWeather] = useState(null);

  // Loading state
  const [loading, setLoading] = useState(false);

  // Error message
  const [error, setError] = useState("");

  // Dark mode
  const [darkMode, setDarkMode] = useState(false);

  // Fetch weather data
  const fetchWeather = async () => {
    if (!city.trim()) return;
    try {
      setLoading(true);
      setError("");
      const apiKey = "7f6436db7af94af48e783725262005";
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`,
      );
      const data = await response.json();
      // Handle API errors
      if (data.error) {
        setError(data.error.message);
        setWeather(null);
        return;
      }
      setWeather(data);
      // Save city
      localStorage.setItem("city", city);
    } catch (err) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  // Load saved city and theme
  useEffect(() => {
    const savedCity = localStorage.getItem("city");
    const savedTheme = localStorage.getItem("theme");
    if (savedCity) {
      setCity(savedCity);
    }
    if (savedTheme === "dark") {
      setDarkMode(true);
      document.documentElement.classList.add("dark");
    }
  }, []);

  // Handle dark mode
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div
      className="
      min-h-screen
      flex
      justify-center
      items-center
      p-4
      bg-slate-100
      dark:bg-slate-900
      transition
    "
    >
      <div
        className="
        w-full
        max-w-md
        sm:max-w-lg
        bg-white
        dark:bg-slate-800
        rounded-2xl
        shadow-xl
        p-6
        transition
      "
      >
        {/* Dark Mode Button */}
        <div className="flex justify-end mb-4">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="
              px-4
              py-2
              rounded-xl
              bg-slate-700
              hover:bg-slate-800
              dark:bg-yellow-400
              dark:text-black
              transition
              cursor-pointer
            "
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </div>
        {/* Title */}
        <h1
          className="
          text-3xl
          font-bold
          text-center
          text-slate-700
          dark:text-white
          mb-6
        "
        >
          Weather Dashboard
        </h1>
        {/* Search */}
        <div className="flex gap-2 mb-6">
          <input
            type="text"
            placeholder="Enter city..."
            value={city}
            onChange={(e) => setCity(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchWeather();
              }
            }}
            className="
              flex-1
              p-3
              rounded-xl
              border
              outline-none
              dark:bg-slate-700
              dark:text-white
              dark:border-slate-600
              focus:ring-2
              focus:ring-blue-400
              transition
            "
          />
          <button
            onClick={fetchWeather}
            className="
              px-5
              rounded-xl
              bg-slate-700
              hover:bg-slate-800
              text-white
              transition
              cursor-pointer
            "
          >
            Search
          </button>
        </div>
        {/* Loading */}
        {loading && (
          <p
            className="
            text-center
            text-slate-500
            mb-4
          "
          >
            Loading...
          </p>
        )}
        {/* Error */}
        {error && (
          <p
            className="
            text-center
            text-red-500
            mb-4
          "
          >
            {error}
          </p>
        )}
        {/* Weather Card */}
        {weather && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="
              bg-slate-100
              dark:bg-slate-700
              rounded-2xl
              p-6
              text-center
              shadow-md
            "
          >
            <h2
              className="
              text-2xl
              font-bold
              text-slate-700
              dark:text-white
              mb-2
            "
            >
              {weather.location.name}, {weather.location.country}
            </h2>
            <img
              src={weather.current.condition.icon}
              alt="weather"
              className="mx-auto"
            />
            <p
              className="
              text-5xl
              font-bold
              text-slate-800
              dark:text-white
              mb-2
            "
            >
              {weather.current.temp_c}°C
            </p>
            <p
              className="
              text-slate-500
              dark:text-slate-300
              text-lg
            "
            >
              {weather.current.condition.text}
            </p>
            {/* Weather Details */}
            <div
              className="
              grid
              grid-cols-3
              gap-3
              mt-6
            "
            >
              <div
                className="
                bg-white
                dark:bg-slate-800
                p-3
                rounded-xl
                shadow
              "
              >
                <p className="text-slate-500 text-sm">Humidity</p>
                <p
                  className="
                  font-bold
                  text-slate-700
                  dark:text-white
                "
                >
                  {weather.current.humidity}%
                </p>
              </div>
              <div
                className="
                bg-white
                dark:bg-slate-800
                p-3
                rounded-xl
                shadow
              "
              >
                <p className="text-slate-500 text-sm">Wind</p>
                <p
                  className="
                  font-bold
                  text-slate-700
                  dark:text-white
                "
                >
                  {weather.current.wind_kph} kph
                </p>
              </div>
              <div
                className="
                bg-white
                dark:bg-slate-800
                p-3
                rounded-xl
                shadow
              "
              >
                <p className="text-slate-500 text-sm">Feels Like</p>
                <p
                  className="
                  font-bold
                  text-slate-700
                  dark:text-white
                "
                >
                  {weather.current.feelslike_c}°C
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default App;
