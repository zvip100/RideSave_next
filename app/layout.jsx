import "./globals.css";
import Navbar from "@/components/Navbar";
import ToastWrapper from "@/components/toastWrapper";

export const metadata = {
  title: "RideSave - Save Your Trips",
  description: "Manage your trips efficiently with RideSave",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="gradient-bg" />
        <Navbar />
        <ToastWrapper />
        {children}
      </body>
    </html>
  );
}
