import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import api from '@/lib/api-client';
import { Race } from '@/types/Race';

interface RaceApiResponse {
  success: boolean;
  data?: Race;
  message?: string;
}

const ViewRace = () => {
  const { raceId } = useParams();
  const [race, setRace] = useState<Race>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getRace = async () => {
      try {
        const { data } = await api.get<RaceApiResponse>(`/races/${raceId}`);
        if (data.success && data.data) {
          setRace(data.data);
        } else {
          setError(new Error(data.message || 'Failed to fetch race'));
        }
      } catch (err) {
        setError(
          err instanceof Error ? err : new Error('An unknown error occurred')
        );
      } finally {
        setLoading(false);
      }
    };

    getRace();
  }, [raceId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Race Details</CardTitle>
      </CardHeader>
      <CardContent>
        {race ? (
          <div className="space-y-2">
            <p>ID: {race.id}</p>
            <p>Name: {race.name}</p>
            <p>
              Date:{' '}
              {DateTime.fromISO(race.date, { zone: 'utc' })
                .toUTC()
                .toFormat('EEE MMM dd yyyy')}
            </p>
            <p>
              Created:{' '}
              {DateTime.fromJSDate(new Date(race.createdAt)).toFormat(
                'MMM d, yyyy, h:mm:ss a'
              )}
            </p>
            <p>
              Last Updated:{' '}
              {race.updatedAt
                ? DateTime.fromJSDate(new Date(race.updatedAt)).toFormat(
                    'MMM d, yyyy, h:mm:ss a'
                  )
                : 'N/A'}
            </p>
          </div>
        ) : (
          <div>No race data available</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ViewRace;
