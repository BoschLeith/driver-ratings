import axios from 'axios';
import { useEffect, useState } from 'react';

import RacesTable from '../components/RacesTable';
import { Race } from '../types/Race';

const Races = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const { data } = await axios.get('/api/races');
        setRaces(data.data);
      } catch (error) {
        setError('Error fetching races');
      }
    };
    fetchRaces();
  }, []);

  return (
    <>
      <h1>Races</h1>
      <div className="container mx-auto">
        <RacesTable races={races} error={error} />
      </div>
    </>
  );
};

export default Races;
