// app/(dashboard)/admin/medicos/page.tsx
import dynamic from "next/dynamic";

const MedicosPage = dynamic(() => import('@/components/adminPages/MedicosPage'), {
  ssr: false,
});

export default function Page() {
  return <MedicosPage />;
}
