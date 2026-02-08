import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from './ProtectedRoute';

import { AppLayout } from '@/components/layout/AppLayout';
import LoginPage from '@/features/auth/pages/LoginPage';
import { MaterialsPage } from '@/pages/material_raw_page';
import NotFoundPage from '@/pages/not_found_page';
import { ProductionSimulationPage } from '@/pages/production_page';
import UnauthorizedPage from '@/pages/unauthorized_page';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/401" element={<UnauthorizedPage />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/products" element={<div>Products</div>} />
          <Route path="/raw-materials" element={<MaterialsPage />} />
          <Route path="/production" element={<ProductionSimulationPage />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
