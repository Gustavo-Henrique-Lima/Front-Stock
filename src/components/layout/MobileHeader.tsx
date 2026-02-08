import { SidebarTrigger } from '@/components/ui/sidebar';

export function MobileHeader() {
  return (
    <header className="flex items-center gap-3 border-b bg-background px-4 py-3 md:hidden">
      <SidebarTrigger />

      <span className="text-sm font-semibold">InsuMax</span>
    </header>
  );
}
