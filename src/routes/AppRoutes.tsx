import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';

import LoginPage from '@/features/auth/pages/LoginPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<div>Products</div>} />
        <Route path="/raw-materials" element={<div>Raw Materials</div>} />
        <Route path="/production" element={<div>Production</div>} />
      </Route>
    </Routes>
  );
}
