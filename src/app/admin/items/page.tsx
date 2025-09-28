"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import AdminItemsPage from "@/components/layouts/AdminItemsPage";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/AdminNav";

export default function AdminItems() {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/");
  };

  return (
    <AdminLayout>
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-700">📝 Admin — Contenus</h1>

        </div>

        {/* Navigation admin */}
        <AdminNav />

        <AdminItemsPage />
      </div>
    </AdminLayout>
  );
}
