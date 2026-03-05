import { LoadUserProvider } from "@/main/providers/load-user.provider";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/presentation/shared/components/ui/sidebar";
import { AppSidebar } from "@/presentation/shared/layouts/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <LoadUserProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 px-4 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </SidebarInset>
      </LoadUserProvider>
    </SidebarProvider>
  );
}