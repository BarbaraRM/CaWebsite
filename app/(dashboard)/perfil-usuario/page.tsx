// app/prefil-usuario/page.tsx
import dynamic from "next/dynamic";

const PageContent = dynamic(
  () => import("@/components/adminPages/PerfilPage"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <PageContent />;
}
