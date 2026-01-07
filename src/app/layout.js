import "./globals.css";
import { LockerProvider } from "./lockerContext";

export const metadata = {
  title: {
    default: "LockerRoy",
    template: "%s | LockerRoy",
  },
  description: "LockerRoy smart locker experience",
  icons: {
    icon: "/img/roy.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LockerProvider>{children}</LockerProvider>
      </body>
    </html>
  );
}
