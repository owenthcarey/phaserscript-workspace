import './global.css';

export const metadata = {
  title: 'Welcome to apps/web-next-test',
  description: 'Generated by create-nx-workspace',
};

// https://nextjs.org/learn/dashboard-app/creating-layouts-and-pages#root-layout
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}