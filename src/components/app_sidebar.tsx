import { Factory, Package, Boxes, BarChart3, LogOut } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from '@/components/ui/sidebar';

const navItems = [
  { title: 'Produtos', href: '/products', icon: Package },
  { title: 'Matéria-prima', href: '/raw-materials', icon: Boxes },
  { title: 'Produção', href: '/reports', icon: BarChart3 },
];

export function AppSidebar() {
  const { pathname } = useLocation();

  return (
    <Sidebar
      collapsible="offcanvas"
      className="border-r border-sidebar-border bg-sidebar text-sidebar-foreground"
    >
      {/* HEADER */}
      <SidebarHeader className="px-4 py-5">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <NavLink to="/products" className="gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
                  <Factory className="h-4 w-4" />
                </div>
                <div className="flex flex-col leading-tight">
                  <span className="text-sm font-semibold tracking-wide">InsuMax</span>
                  <span className="text-xs text-sidebar-muted">
                    Planejador de Recursos de Manufatura
                  </span>
                </div>
              </NavLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* CONTENT */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarGroupLabel className="px-3 text-xs uppercase tracking-widest text-sidebar-muted">
            Administração
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href;

                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      className={`
                        rounded-lg px-3 py-2 transition-colors
                        ${
                          isActive
                            ? 'bg-sidebar-active text-white'
                            : 'hover:bg-sidebar-active/60 text-sidebar-foreground'
                        }
                      `}
                    >
                      <NavLink to={item.href} className="flex items-center gap-3">
                        <item.icon className="h-4 w-4 opacity-80" />
                        <span className="text-sm">{item.title}</span>
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* FOOTER */}
      <SidebarFooter className="px-2 pb-4">
        <SidebarSeparator className="mb-3 bg-sidebar-border" />

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="
                rounded-lg px-3 py-2 text-sidebar-muted
                hover:bg-red-500/10 hover:text-red-400
              "
            >
              <LogOut className="h-4 w-4" />
              <span className="text-sm">Sair</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
