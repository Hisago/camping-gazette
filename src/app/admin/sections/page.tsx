"use client";

import AdminLayout from "@/components/layouts/AdminLayout";
import AdminSectionsPage from "@/components/layouts/AdminSectionsPage";
import { useRouter } from "next/navigation";
import AdminNav from "@/components/AdminNav";

export default function AdminSections() {
  
  return (
    <AdminLayout>
      <div className="px-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-green-700">⚙️ Admin — Sections</h1>
          
        </div>

        {/* Navigation admin */}
        <AdminNav />

        <AdminSectionsPage />
      </div>
    </AdminLayout>
  );
}
