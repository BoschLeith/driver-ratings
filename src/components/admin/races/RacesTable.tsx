import useFetchRaces from '@/hooks/useFetchRaces';

const RacesTable = () => {
  const { races, loading, error } = useFetchRaces();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Date</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
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
              <td>
                <button className="btn">Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RacesTable;
