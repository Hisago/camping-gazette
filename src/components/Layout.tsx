import ServerNavbar from "@/components/ServerNavbar";

// components/Layout.tsx
import Navbar from "@/components/NavbarClient";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
    </div>
  );
}
