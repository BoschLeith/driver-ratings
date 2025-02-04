import { Route, Routes } from 'react-router';

import AdminLayout from '@/layouts/AdminLayout';
import Dashboard from '@/pages/Dashboard';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import ProtectedRoutes from '@/routes/ProtectedRoutes';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          {/* <Route path="races" element={<Races />} /> */}
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
