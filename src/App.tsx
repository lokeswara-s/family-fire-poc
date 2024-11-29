import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Goals } from './pages/Goals';
import { Investments } from './pages/Investments';
import { InvestmentDetail } from './pages/InvestmentDetail';
import { Profile } from './pages/Profile';
import { Settings } from './pages/Settings';
import { MainLayout } from './components/Layout/MainLayout';

function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/goals" element={<Goals />} />
          <Route path="/investments" element={<Investments />} />
          <Route path="/investments/:type" element={<InvestmentDetail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;