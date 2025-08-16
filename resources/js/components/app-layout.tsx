import { AppShell } from '@/components/app-shell';
import { AppHeader } from '@/components/app-header';
import { AppSidebar } from '@/components/app-sidebar';
import { AppContent } from '@/components/app-content';
import { type BreadcrumbItem } from '@/types';
import { SidebarInset } from '@/components/ui/sidebar';

interface AppLayoutProps {
    children: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <AppShell variant="sidebar">
            <AppSidebar />
            <SidebarInset>
                <AppHeader breadcrumbs={breadcrumbs} />
                <AppContent variant="sidebar">
                    {children}
                </AppContent>
            </SidebarInset>
        </AppShell>
    );
}