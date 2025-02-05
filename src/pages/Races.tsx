import { Loader2, Pencil, Trash } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import useFetchRaces from '@/hooks/useFetchRaces';

const Races = () => {
  const { races, loading, error } = useFetchRaces();

  if (loading)
    return (
      <div className="flex items-center justify-center space-x-2">
        <Loader2 className="animate-spin" />
        <span>Loading...</span>
      </div>
    );
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <div className="flex flex-col space-y-1.5 pb-6">
        <div className="text-xl font-semibold">Races</div>
      </div>
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
              <TableCell>{new Date(race.createdAt).toLocaleString()}</TableCell>
              <TableCell>
                {race.updatedAt
                  ? new Date(race.updatedAt).toLocaleString()
                  : 'N/A'}
              </TableCell>
              <TableCell className="flex justify-center space-x-4">
                <Button variant="outline" size="icon">
                  <Pencil />
                </Button>
                <Button variant="outline" size="icon">
                  <Trash />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default Races;
