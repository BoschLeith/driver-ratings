import { Link } from 'react-router';

const Dashboard = () => {
  return (
    <>
      <h1>Dashboard</h1>
      <div className="container mx-auto">
        <Link className="btn" to={'/races'}>
          Races
        </Link>
      </div>
    </>
  );
};

export default Dashboard;
