// app/empresa/page.tsx
import dynamic from "next/dynamic";

const PageContent = dynamic(
  () => import("@/components/adminPages/EmpresaPage"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <PageContent />;
}
