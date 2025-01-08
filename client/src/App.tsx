// client/src/App.tsx
import axios from "axios";
import React, { useEffect, useState } from "react";

const App: React.FC = () => {
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get<{ message: string }>("/api");
        setMessage(response.data.message);
      } catch (err) {
        setError("Error fetching message");
        console.error(err);
      }
    };

    fetchMessage();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">
        Message from Express:
      </h1>
      <p className="mt-4 text-lg text-gray-600">{message}</p>
      {error && <p className="mt-2 text-red-500">{error}</p>}
    </div>
  );
};

export default App;
