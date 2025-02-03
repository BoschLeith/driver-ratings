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

const Home = () => {
  const [drivers, setDrivers] = useState<Driver[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { data } = await axios.get<ApiResponse>('/api/drivers');
        setDrivers(data.data);
      } catch (err) {
        setError('Error fetching drivers');
      }
    };
    fetchDrivers();
  }, []);

  return (
    <div>
      <h1>List of Drivers:</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {drivers.map((driver) => (
            <tr key={driver.id}>
              <td>{driver.id}</td>
              <td>{driver.name}</td>
              <td>{new Date(driver.createdAt).toLocaleString()}</td>
              <td>
                {driver.updatedAt
                  ? new Date(driver.updatedAt).toLocaleString()
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
