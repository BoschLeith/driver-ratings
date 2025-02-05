import axios from 'axios';
import { useEffect, useState } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Driver } from '@/types/Driver';

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
    <div className="p-6">
      <div className="flex flex-col space-y-1.5 pb-6">
        <div className="text-center text-xl font-semibold">HOME</div>
      </div>
      <div className="flex flex-col space-y-1.5 pb-6">
        <div className="text-xl font-semibold">Drivers</div>
      </div>
      {error && <div>{error}</div>}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {drivers.map((driver) => (
            <TableRow key={driver.id}>
              <TableCell>{driver.id}</TableCell>
              <TableCell>{driver.name}</TableCell>
              <TableCell>
                {new Date(driver.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {driver.updatedAt
                  ? new Date(driver.updatedAt).toLocaleString()
                  : 'N/A'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default Home;
