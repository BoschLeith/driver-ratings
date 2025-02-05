import { Link, Outlet, useLocation } from 'react-router';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Separator } from '@/components/ui/separator';
import { SidebarTrigger } from '@/components/ui/sidebar';

const Dashboard = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x: string) => x);

  const generateBreadcrumbName = (segment: string) => {
    return (
      segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, ' ')
    );
  };

  return (
    <>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <Breadcrumb>
          <BreadcrumbList>
            {pathnames.length > 0 ? (
              pathnames.map((value: string, index: number) => {
                const pathname = `/${pathnames.slice(0, index + 1).join('/')}`;
                const breadcrumbName = generateBreadcrumbName(value);

                return (
                  <BreadcrumbItem key={pathname}>
                    <Link to={pathname}>{breadcrumbName}</Link>
                    {index < pathnames.length - 1 && <BreadcrumbSeparator />}
                  </BreadcrumbItem>
                );
              })
            ) : (
              <BreadcrumbItem>
                <BreadcrumbPage>Dashboard</BreadcrumbPage>
              </BreadcrumbItem>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </header>
      <main className="p-4">
        <Outlet />
      </main>
    </>
  );
};

export default Dashboard;
