import axios from "axios";
import { useEffect, useState } from "react";

interface Driver {
  id: number;
  name: string;
  created_at: string;
  updated_at: string | null;
}

const App = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get<Driver[]>("/api/drivers");
        setDrivers(response.data);
      } catch (err) {
        setError("Error fetching drivers");
        console.error(err);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">List of Drivers:</h1>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      <div className="mt-4 w-full max-w-3xl">
        <table className="border border-gray-300 w-full">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">ID</th>
              <th className="border border-gray-300 p-2">Name</th>
              <th className="border border-gray-300 p-2">Created At</th>
              <th className="border border-gray-300 p-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map((driver) => (
              <tr key={driver.id}>
                <td className="border border-gray-300 p-2">{driver.id}</td>
                <td className="border border-gray-300 p-2">{driver.name}</td>
                <td className="border border-gray-300 p-2">
                  {new Date(driver.created_at).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {driver.updated_at
                    ? new Date(driver.updated_at).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
