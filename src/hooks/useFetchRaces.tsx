import { useEffect, useState } from 'react';

import api from '@/lib/api-client';
import { Race } from '@/types/Race';

interface FetchRacesResponse {
  success: boolean;
  data?: Race[];
  message?: string;
}

const useFetchRaces = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchRaces = async () => {
      try {
        const { data } = await api.get<FetchRacesResponse>('/races');
        if (data.success) {
          setRaces(data.data || []);
        } else {
          setError(new Error(data.message || 'Failed to fetch races'));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('An unknown error occurred')
        );
      } finally {
        setLoading(false);
      }
    };

    fetchRaces();
  }, []);

  return { races, loading, error };
};

export default useFetchRaces;
