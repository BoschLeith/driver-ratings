import { FormEvent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api-client';
import { Race } from '@/types/Race';

interface RaceApiResponse {
  success: boolean;
  data?: Race;
  message?: string;
}

const EditRace = () => {
  const { raceId } = useParams();
  const [raceName, setRaceName] = useState('');
  const [raceDate, setRaceDate] = useState('');
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getRace = async () => {
      try {
        const { data } = await api.get<RaceApiResponse>(`/races/${raceId}`);
        if (data.success && data.data) {
          setRaceName(data.data.name);
          setRaceDate(data.data.date);
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

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.put(`/races/${raceId}`, { name: raceName, date: raceDate });
      navigate('/dashboard/races');
    } catch (error) {
      console.error('Error updating race:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Card>
        <CardHeader>Edit Race</CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="raceName">Name</Label>
                <Input
                  type="text"
                  id="raceName"
                  value={raceName}
                  onChange={(e) => setRaceName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="raceDate">Date</Label>
                <Input
                  type="date"
                  id="raceDate"
                  value={raceDate}
                  onChange={(e) => setRaceDate(e.target.value)}
                />
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => navigate('/dashboard/races')}
          >
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Save</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default EditRace;
