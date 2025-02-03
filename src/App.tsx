import { Route, Routes } from 'react-router';

import ProtectedRoutes from './components/ProtectedRoutes';
import AdminLayout from './layouts/AdminLayout';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route path="dashboard" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
