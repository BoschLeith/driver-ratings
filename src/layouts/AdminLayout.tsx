import { useDispatch } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';

import { AppDispatch } from '../app/store';
import { logout } from '../features/auth/authSlice';

const AdminLayout = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <>
      <div className="navbar">
        <div className="navbar-start">
          <a className="btn btn-ghost text-xl">Admin</a>
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={handleLogout}>
            Logout
          </a>
        </div>
      </div>
      <Outlet />
    </>
  );
};

export default AdminLayout;
