import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';

import LoginPage from '@/features/auth/pages/LoginPage';
import NotFoundPage from '@/pages/NotFoundPage';
import ServerErrorPage from '@/pages/ServerErrorPage';
import UnauthorizedPage from '@/pages/UnauthorizedPage';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/401" element={<UnauthorizedPage />} />
      <Route path="/500" element={<ServerErrorPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/products" element={<div>Products</div>} />
        <Route path="/raw-materials" element={<div>Raw Materials</div>} />
        <Route path="/production" element={<div>Production</div>} />
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
