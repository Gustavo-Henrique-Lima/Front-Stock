import { Outlet } from 'react-router-dom';
import { Toaster } from 'sonner';

import { AppSidebar } from '../app_sidebar';

import { MobileHeader } from './MobileHeader';

import { SidebarProvider } from '@/components/ui/sidebar';

export function AppLayout() {
  return (
    <SidebarProvider>
      {/* Viewport inteira */}
      <div className="flex min-h-screen w-full bg-muted/40">
        {/* Sidebar */}
        <AppSidebar />

        {/* Coluna principal */}
        <div className="flex flex-1 flex-col overflow-hidden">
          {/* Header mobile */}
          <MobileHeader />

          {/* Área de conteúdo */}
          <main className="flex flex-1 flex-col overflow-hidden p-4 md:p-6">
            <Outlet />
          </main>
        </div>
      </div>
      <Toaster />
    </SidebarProvider>
  );
}
