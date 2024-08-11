export const metadata = {
  title: 'Dashborad',
};

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <h1>Dashboard HEADER</h1>
      <body>{children}</body>
    </html>
  );
}
