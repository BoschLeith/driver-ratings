import { Route, Routes } from 'react-router';

import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import Drivers from '@/pages/Drivers';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Races from '@/pages/Races';
import Teams from '@/pages/Teams';
import ProtectedRoutes from '@/routes/ProtectedRoutes';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="drivers" element={<Drivers />} />
            <Route path="races" element={<Races />} />
            <Route path="teams" element={<Teams />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
