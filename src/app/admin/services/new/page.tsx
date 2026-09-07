import { AdminShell } from "@/components/admin/AdminShell";
import { ServiceAdminForm } from "@/components/admin/ServiceForm";

export default function NewServicePage() {
  return (
    <AdminShell title="New Service">
      <ServiceAdminForm />
    </AdminShell>
  );
}
