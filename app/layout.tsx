import type { Metadata } from "next";

import type React from "react";
import { Toaster } from "@/components/ui/toaster";
import "./globals.css";
// import { AuthProvider } from "@/hooks/auth-provider";
import { Nunito, Poppins } from "next/font/google";
import ToastProvider from "@/hooks/toaster-provider";

import dayjs from "dayjs";
import "react-datepicker/dist/react-datepicker.css"; //styles for datepicker react-datepicker
import "dayjs/locale/es";
import Header from "@/components/website/Header";
dayjs.locale("es");

export const metadata: Metadata = {
  title: "Clínica Aguilar",
  description: "Website Clínica Aguilar",
};

const poppins_init = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "500", "600", "700", "800"],
});

const nunito_init = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <meta property="og:image" content="/public/images/logo.png" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="720" />

        <meta property="og:title" content="SIP CA" />
        <meta property="og:description" content="Sistema de Planillaje CA." />
      </head>
      <body className={`${poppins_init.variable} ${nunito_init.variable}`}>
        {/* <AuthProvider> */}
        <ToastProvider>{children}</ToastProvider>
        <Toaster />
        {/* </AuthProvider> */}
      </body>
    </html>
  );
}
