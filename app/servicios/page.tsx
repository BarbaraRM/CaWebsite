import Servicios from "@/components/websitePages/Servicios";
import { FALLBACK_EMPRESAINFO } from "@/store/fallbackData";

export default async function Page() {
  const footerdata = FALLBACK_EMPRESAINFO;
  return <Servicios  footerdata={footerdata} />;
}
