import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router';

import DatePicker from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import api from '@/lib/api-client';

const CreateRace = () => {
  const [raceName, setRaceName] = useState('');
  const [raceDate, setRaceDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/races', { name: raceName, date: raceDate });
      navigate('/dashboard/races');
    } catch (error) {
      console.error('Error creating race:', error);
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Create Race</CardTitle>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="raceName">Name</Label>
                <Input
                  className="w-[280px]"
                  type="text"
                  id="raceName"
                  value={raceName}
                  onChange={(e) => setRaceName(e.target.value)}
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="raceDate">Date</Label>
                <DatePicker
                  selectedDate={raceDate}
                  setSelectedDate={setRaceDate}
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
          <Button onClick={handleSubmit}>Create</Button>
        </CardFooter>
      </Card>
    </>
  );
};

export default CreateRace;
