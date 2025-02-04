import { Route, Routes } from 'react-router';

import Dashboard from '../components/admin/Dashboard';
import Races from '../components/admin/races/RacesTable';
import Login from '../components/auth/Login';
import AdminLayout from '../components/layouts/AdminLayout';
import Home from '../components/pages/Home';
import ProtectedRoutes from './ProtectedRoutes';

const AppRoutes = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="races" element={<Races />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
