import { Route, Routes } from 'react-router';

import AdminLayout from '@/layouts/AdminLayout';
import CreateRace from '@/pages/CreateRace';
import Dashboard from '@/pages/Dashboard';
import Drivers from '@/pages/Drivers';
import EditRace from '@/pages/EditRace';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Races from '@/pages/Races';
import Teams from '@/pages/Teams';
import ProtectedRoutes from '@/routes/ProtectedRoutes';
import ViewRace from './pages/ViewRace';

const App = () => {
  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="login" element={<Login />} />
      <Route element={<ProtectedRoutes />}>
        <Route element={<AdminLayout />}>
          <Route path="dashboard">
            <Route index element={<Dashboard />} />
            <Route path="drivers" element={<Drivers />} />
            <Route path="races">
              <Route index element={<Races />} />
              <Route path=":raceId/edit" element={<EditRace />} />
              <Route path="create" element={<CreateRace />} />
              <Route path=":raceId" element={<ViewRace />} />
            </Route>
            <Route path="teams" element={<Teams />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
