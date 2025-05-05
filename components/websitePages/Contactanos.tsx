import { EmpresaInforType } from "@/types/website/home";
import ContactFormSimple from "../website/contacto/Contact-form-simple";
import ContactInfo from "../website/contacto/Contact-info";
import Footer from "../website/Footer";
import Header from "../website/Header";

export const metadata = {
  title: "Contacto | Clínica Aguilar",
  description:
    "Ponte en contacto con nosotros para cualquier consulta o cita médica.",
};

export default function ContactPage({
  footerdata,
}: {
  footerdata: EmpresaInforType;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="min-h-screen bg-[#f9f9f9] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Contáctanos
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos aquí para ayudarte. Completa el formulario a continuación
              y nos pondremos en contacto contigo lo antes posible.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <ContactInfo contactInfo={footerdata} />
            <ContactFormSimple />
          </div>
        </div>
      </main>
      <Footer footerdata={footerdata} />
    </div>
  );
}
