"use client";

import Header from "../website/Header";
import Footer from "../website/Footer";
import { EmpresaInforType } from "@/types/home";
import Link from "next/link";
import {
  Stethoscope,
  Microscope,
  HeartPulse,
  Syringe,
  Baby,
  Ambulance,
  Clock,
  Phone,
  ChevronRight,
} from "lucide-react";
export default function Servicios({
  footerdata,
}: {
  footerdata: EmpresaInforType;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="min-h-screen">
        {/* Hero Section */}
        <section className="relative bg-third-950">
          <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://img.freepik.com/foto-gratis/joven-medico-guapo-tunica-medica-estetoscopio_1303-17818.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740')] bg-cover bg-center"></div>
          <div className="container mx-auto px-4 py-20 relative z-10">
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Servicios Médicos
              </h1>
              <p className="text-lg text-white/90 mb-8">
                En Clínica Aguilar ofrecemos una amplia gama de servicios
                médicos con profesionales altamente calificados y tecnología de
                vanguardia para cuidar de tu salud y la de tu familia.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/contacto"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Solicitar Cita
                </Link>
                <Link
                  href="#servicios"
                  className="bg-white hover:bg-gray-100 text-third-950 font-medium px-6 py-3 rounded-lg transition-colors"
                >
                  Ver Servicios
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Servicios Destacados */}
        <section id="servicios" className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 mb-4">
                Nuestros Servicios Médicos
              </h2>
              <p className="text-lg text-secondary-700 max-w-3xl mx-auto">
                Ofrecemos atención médica integral con un equipo de
                profesionales comprometidos con tu bienestar y salud.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Servicio 1: Radiología */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-48 bg-third-50 relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/foto-gratis/vista-lateral-medico-revisando-radiografia_23-2149601721.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                    alt="Servicio de Radiología"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-third-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">Radiología</h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary-700 mb-4">
                    Contamos con equipos de última generación para diagnósticos
                    precisos mediante imágenes médicas.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Rayos X digitales</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Tomografías computarizadas</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Ecografías 2D/3D/4D</span>
                    </li>
                  </ul>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
                  >
                    Solicitar información
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Servicio 2: Estudios Diagnósticos */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-48 bg-third-50 relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/foto-gratis/mujer-trabajando-laborator_23-2148824177.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                    alt="Estudios Diagnósticos"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-third-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">
                      Estudios Diagnósticos
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary-700 mb-4">
                    Realizamos estudios completos para un diagnóstico preciso y
                    oportuno de tu condición médica.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Laboratorio clínico</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Imagenología avanzada</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Estudios cardiológicos</span>
                    </li>
                  </ul>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
                  >
                    Solicitar información
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Servicio 3: Consultas Externas */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-48 bg-third-50 relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/foto-gratis/manos-doctora-irreconocible-escribiendo-forma-escribiendo-teclado-portatil_1098-20374.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                    alt="Consultas Externas"
                    
                    className="object-cover group-hover:scale-105 transition-transform duration-300 object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-third-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">
                      Consultas Externas
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary-700 mb-4">
                    Atención médica especializada para todas tus necesidades de
                    salud con profesionales de excelencia.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Medicina general</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Especialidades médicas</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Consultas pediátricas</span>
                    </li>
                  </ul>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
                  >
                    Solicitar información
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Servicio 4: Hospitalización */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-48 bg-third-50 relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/foto-gratis/medico-tiro-medio-revisando-al-paciente_23-2148934318.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                    alt="Hospitalización"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-third-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">
                      Hospitalización
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary-700 mb-4">
                    Instalaciones modernas y confortables para tu recuperación
                    con atención personalizada las 24 horas.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Habitaciones privadas</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Monitoreo constante</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Atención de enfermería 24/7</span>
                    </li>
                  </ul>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
                  >
                    Solicitar información
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Servicio 5: Quirófano y Cirugías */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-48 bg-third-50 relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/foto-gratis/vista-interior-sala-operaciones_1170-2254.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                    alt="Quirófano y Cirugías"
                    className="object-contain group-hover:scale-105 transition-transform duration-300 object-top"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-third-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">
                      Quirófano y Cirugías
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary-700 mb-4">
                    Quirófanos equipados con tecnología de punta para
                    procedimientos quirúrgicos seguros y efectivos.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Cirugías programadas</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Cirugías de emergencia</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Procedimientos mínimamente invasivos</span>
                    </li>
                  </ul>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
                  >
                    Solicitar información
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>

              {/* Servicio 6: Emergencia */}
              <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow overflow-hidden group">
                <div className="h-48 bg-third-50 relative overflow-hidden">
                  <img
                    src="https://img.freepik.com/foto-gratis/vista-interior-ambulancia-trabajadores-uniformados-servicios-emergencia-que-cuidan-al-paciente-camilla-pandemia-coronavirus_657921-1489.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                    alt="Emergencia"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-third-950/70 to-transparent"></div>
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-white text-xl font-bold">
                      Emergencia 24/7
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-secondary-700 mb-4">
                    Atención inmediata para situaciones de urgencia médica con
                    personal capacitado disponible las 24 horas.
                  </p>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Atención inmediata</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Servicio de ambulancia</span>
                    </li>
                    <li className="flex items-center text-secondary-800">
                      <ChevronRight className="h-5 w-5 text-primary-500 mr-2" />
                      <span>Equipamiento especializado</span>
                    </li>
                  </ul>
                  <Link
                    href="/contacto"
                    className="inline-flex items-center text-primary-500 font-medium hover:text-primary-600"
                  >
                    Solicitar información
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Especialidades */}
        <section className="py-16 bg-secondary-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 mb-4">
                Especialidades Médicas
              </h2>
              <p className="text-lg text-secondary-700 max-w-3xl mx-auto">
                Contamos con un equipo multidisciplinario de especialistas para
                brindarte la mejor atención en todas las áreas de la medicina.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {specialties.map((specialty, index) => (
                <div
                  key={index}
                  className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition-shadow text-center"
                >
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    {specialty.icon}
                  </div>
                  <h3 className="font-semibold text-secondary-900 mb-2">
                    {specialty.name}
                  </h3>
                  <p className="text-secondary-600 text-sm">
                    {specialty.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Sección de Maternidad y Neonatología */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 mb-6">
                  Maternidad y Neonatología
                </h2>
                <p className="text-lg text-secondary-700 mb-6">
                  Brindamos atención especializada para mamás y recién nacidos,
                  con un enfoque en la seguridad, comodidad y bienestar durante
                  todo el proceso.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Baby className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        Obstetricia
                      </h3>
                      <p className="text-secondary-700">
                        Control prenatal completo y atención durante el embarazo
                        con especialistas certificados.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <HeartPulse className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        Parto Humanizado
                      </h3>
                      <p className="text-secondary-700">
                        Experiencia de parto respetando tus decisiones y
                        necesidades en un ambiente seguro.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Baby className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        Neonatología
                      </h3>
                      <p className="text-secondary-700">
                        Cuidados especializados para recién nacidos con
                        equipamiento de última generación.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <img
                  src="https://img.freepik.com/foto-gratis/madre-feliz-recien-nacido-enfermera_23-2151940464.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                  alt="Maternidad y Neonatología"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Laboratorio e Imagenología */}
        <section className="py-16 bg-third-50">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <img
                  src="https://img.freepik.com/foto-gratis/doctor-preparando-al-paciente-tomografia-computarizada_23-2149367415.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                  alt="Laboratorio e Imagenología"
                  className="object-cover"
                />
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-3xl md:text-4xl font-bold text-secondary-950 mb-6">
                  Laboratorio e Imagenología
                </h2>
                <p className="text-lg text-secondary-700 mb-6">
                  Contamos con tecnología de vanguardia para realizar estudios
                  diagnósticos precisos que permiten a nuestros especialistas
                  ofrecerte el mejor tratamiento.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Microscope className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        Laboratorio Clínico
                      </h3>
                      <p className="text-secondary-700">
                        Análisis de sangre, orina y otros fluidos corporales con
                        resultados rápidos y precisos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Stethoscope className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        Rayos X Digital
                      </h3>
                      <p className="text-secondary-700">
                        Imágenes de alta resolución con menor radiación y
                        resultados inmediatos.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <HeartPulse className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        Tomografía Computarizada
                      </h3>
                      <p className="text-secondary-700">
                        Estudios detallados que permiten visualizar órganos,
                        huesos y tejidos con precisión.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-4 mt-1">
                      <Stethoscope className="h-5 w-5 text-primary-500" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-secondary-900 mb-1">
                        Ecografías
                      </h3>
                      <p className="text-secondary-700">
                        Estudios no invasivos para visualizar órganos internos,
                        embarazos y más.
                      </p>
                    </div>
                  </div>
                </div>
                <Link
                  href="/contacto"
                  className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-lg inline-block transition-colors"
                >
                  Agendar estudio
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Sección de Emergencia */}
        <section className="py-16 bg-third-950 text-white">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Servicio de Emergencia 24/7
                </h2>
                <p className="text-lg text-white/90 mb-6">
                  Estamos disponibles las 24 horas del día, los 7 días de la
                  semana para atender cualquier emergencia médica con rapidez y
                  profesionalismo.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-start">
                    <div className="bg-primary-500/20 p-2 rounded-full mr-4 mt-1">
                      <Ambulance className="h-5 w-5 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Servicio de Ambulancia
                      </h3>
                      <p className="text-white/80">
                        Traslado rápido y seguro con personal médico capacitado.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-500/20 p-2 rounded-full mr-4 mt-1">
                      <Clock className="h-5 w-5 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">Atención Inmediata</h3>
                      <p className="text-white/80">
                        Personal médico disponible para atender emergencias sin
                        demora.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-primary-500/20 p-2 rounded-full mr-4 mt-1">
                      <Syringe className="h-5 w-5 text-primary-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">
                        Equipamiento Especializado
                      </h3>
                      <p className="text-white/80">
                        Tecnología avanzada para atender cualquier tipo de
                        emergencia.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-primary-400 mr-3" />
                  <span className="text-xl font-bold">
                    Emergencias: (+593) 0958980367
                  </span>
                </div>
              </div>
              <div className="relative h-[400px] md:h-[500px] rounded-xl overflow-hidden">
                <img
                  src="https://img.freepik.com/foto-gratis/equipo-medicos-que-examinan-presion-arterial-paciente-observan-monitor-frecuencia-cardiaca-paciente-acostado-cama-urgencias_662251-480.jpg?ga=GA1.1.1340927718.1729821246&semt=ais_hybrid&w=740"
                  alt="Servicio de Emergencia"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </section>


        {/* CTA Section */}
        <section className="py-12 bg-primary-500">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
              Tu salud es nuestra prioridad
            </h2>
            <p className="text-white/90 text-lg mb-8 max-w-2xl mx-auto">
              En Clínica Aguilar estamos comprometidos con brindarte la mejor
              atención médica con calidez y profesionalismo.
            </p>
            <Link
              href="/contacto"
              className="bg-white hover:bg-gray-100 text-primary-600 font-medium px-8 py-3 rounded-lg inline-block transition-colors"
            >
              Agenda tu cita hoy
            </Link>
          </div>
        </section>
      </main>
      <Footer footerdata={footerdata} />
    </div>
  );
}

// Datos para la sección de especialidades
const specialties = [
  {
    name: "Ginecología y Obstetricia",
    description:
      "Cuidado integral para la salud femenina y atención durante el embarazo",
    icon: <Baby className="h-6 w-6 text-primary-500" />,
  },
  {
    name: "Pediatría",
    description:
      "Atención especializada para el cuidado y desarrollo de los niños",
    icon: <Baby className="h-6 w-6 text-primary-500" />,
  },
  {
    name: "Neurología",
    description: "Diagnóstico y tratamiento de trastornos del sistema nervioso",
    icon: <HeartPulse className="h-6 w-6 text-primary-500" />,
  },
  {
    name: "Traumatología",
    description:
      "Especialistas en lesiones y enfermedades del sistema músculo-esquelético",
    icon: <Stethoscope className="h-6 w-6 text-primary-500" />,
  },
  {
    name: "Cardiología",
    description: "Cuidado especializado para la salud del corazón",
    icon: <HeartPulse className="h-6 w-6 text-primary-500" />,
  },
  {
    name: "Gastroenterología",
    description: "Diagnóstico y tratamiento de enfermedades digestivas",
    icon: <Stethoscope className="h-6 w-6 text-primary-500" />,
  },
  {
    name: "Alergología",
    description:
      "Tratamiento de alergias y enfermedades del sistema inmunológico",
    icon: <Microscope className="h-6 w-6 text-primary-500" />,
  },
  {
    name: "Cirugía General",
    description: "Procedimientos quirúrgicos con tecnología avanzada",
    icon: <Syringe className="h-6 w-6 text-primary-500" />,
  },
];
