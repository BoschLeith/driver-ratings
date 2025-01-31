import axios from 'axios';
import { useEffect, useState } from 'react';

interface Driver {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date | null;
}

interface ApiResponse {
  success: boolean;
  data: Driver[];
}

const App = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const response = await axios.get<ApiResponse>('/api/drivers');
        console.log(response.data);
        setDrivers(response.data.data);
      } catch (err) {
        setError('Error fetching drivers');
        console.error(err);
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <h1 className="text-2xl font-bold text-gray-800">List of Drivers:</h1>
      {error && <p className="mt-2 text-red-500">{error}</p>}
      <div className="mt-4 w-full max-w-3xl">
        <table className="w-full border border-gray-300">
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
                  {new Date(driver.createdAt).toLocaleString()}
                </td>
                <td className="border border-gray-300 p-2">
                  {driver.updatedAt
                    ? new Date(driver.updatedAt).toLocaleString()
                    : 'N/A'}
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
