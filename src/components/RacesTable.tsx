import { Race } from '../types/Race.ts';

interface RacesTableProps {
  races: Race[];
  error?: string | null;
}

const RacesTable = ({ races, error }: RacesTableProps) => {
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Races</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Created At</th>
            <th>Updated At</th>
          </tr>
        </thead>
        <tbody>
          {races.map((race) => (
            <tr key={race.id}>
              <td>{race.id}</td>
              <td>{race.name}</td>
              <td>{new Date(race.date).toDateString()}</td>
              <td>{new Date(race.createdAt).toLocaleString()}</td>
              <td>
                {race.updatedAt
                  ? new Date(race.updatedAt).toLocaleString()
                  : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RacesTable;
