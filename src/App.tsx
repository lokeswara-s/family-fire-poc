import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import IndividualGoals from './pages/IndividualGoals';
import FamilyGoals from './pages/FamilyGoals';
import Investments from './pages/Investments';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="individual-goals" element={<IndividualGoals />} />
          <Route path="family-goals" element={<FamilyGoals />} />
          <Route path="investments" element={<Investments />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;