import dynamic from "next/dynamic";

const DependenciasPage = dynamic(
  () => import("@/components/adminPages/DependenciasPage"),
  {
    ssr: false,
  }
);

export default function Page() {
  return <DependenciasPage />;
}
