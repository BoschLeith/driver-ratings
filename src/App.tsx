import { Route, Routes } from 'react-router';

import ProtectedRoute from './components/ProtectedRoutes';
import Dashboard from './pages/Dashboard';
import Home from './pages/Home';
import Login from './pages/Login';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route
        path="dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default App;
