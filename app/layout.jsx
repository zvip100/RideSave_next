import './globals.css';

export const metadata = {
  title: 'RideSave - Trip Management',
  description: 'Manage your trips efficiently with RideSave',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="gradient-bg" />
        {children}
      </body>
    </html>
  );
}


