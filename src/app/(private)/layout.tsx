import { AppSidebar } from "@/src/presentation/layouts/sidebar";

export default function PrivateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <AppSidebar>
      {children}
      </AppSidebar>
    </div>
  );
}