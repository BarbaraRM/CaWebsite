// app/page.tsx
import ContactPage from "@/components/websitePages/Contactanos";
import { FALLBACK_EMPRESAINFO } from "@/store/fallbackData";


export default async function Home() {
  const footerdata = FALLBACK_EMPRESAINFO;
  return <ContactPage footerdata={footerdata} />;
}
