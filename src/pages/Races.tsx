import { Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import api from '@/lib/api-client';
import { Race } from '@/types/Race';

interface RacesApiResponse {
  success: boolean;
  data?: Race[];
  message?: string;
}

const Races = () => {
  const [races, setRaces] = useState<Race[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getRaces = async () => {
      try {
        const { data } = await api.get<RacesApiResponse>('/races');
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

    getRaces();
  }, []);

  const handleDelete = async (raceId: number) => {
    try {
      await api.delete(`/races/${raceId}`);
      setRaces((prevRaces) => prevRaces.filter((race) => race.id !== raceId));
    } catch (error) {
      console.error('Error deleting race:', error);
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
        <CardHeader className="flex-row items-center justify-between space-y-0">
          <CardTitle>Races</CardTitle>
          <Button>
            <Link to={'create'}>Add Race</Link>
          </Button>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Updated At</TableHead>
                <TableHead className="text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {races.map((race) => (
                <TableRow key={race.id}>
                  <TableCell>{race.id}</TableCell>
                  <TableCell>{race.name}</TableCell>
                  <TableCell>{new Date(race.date).toDateString()}</TableCell>
                  <TableCell>
                    {new Date(race.createdAt).toLocaleString()}
                  </TableCell>
                  <TableCell>
                    {race.updatedAt
                      ? new Date(race.updatedAt).toLocaleString()
                      : 'N/A'}
                  </TableCell>
                  <TableCell className="flex justify-center space-x-4">
                    <Button variant="outline" size="icon">
                      <Link to={`${race.id}/edit`}>
                        <Pencil />
                      </Link>
                    </Button>
                    <Dialog>
                      <DialogTrigger>
                        <Button variant="outline" size="icon">
                          <Trash />
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Delete Confirmation</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete {race.name}?
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button
                              type="button"
                              variant="destructive"
                              onClick={() => handleDelete(race.id)}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
};

export default Races;
