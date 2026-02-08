import { BrowserRouter } from 'react-router-dom';

import { QueryProvider } from './providers/QueryProvider';
import { AppRoutes } from './routes/AppRoutes';

import { AuthProvider } from '@/lib/auth-context';

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <QueryProvider>
          <AppRoutes />
        </QueryProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
