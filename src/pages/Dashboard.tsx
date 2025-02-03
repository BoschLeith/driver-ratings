import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';

import { AppDispatch, RootState } from '../app/store';
import { logout } from '../features/auth/authSlice';

const Dashboard = () => {
  const accessToken = useSelector((state: RootState) =>
    state.auth.accessToken ? state.auth.accessToken : 'No Token'
  );
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Your access token: {accessToken}</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
