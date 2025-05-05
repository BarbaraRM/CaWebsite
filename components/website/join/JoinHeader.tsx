"use client";
import React from "react";

export const JoinHeaderTitle = () => {
  return (
    <section className="flex flex-col relative max-h-[700px] min-h-[400px] md:min-h-[575px]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: `url('/bg/bg-trabaja-con-nosotros.png')`,
          }}
        />
      </div>

      {/* Content */}
      <div className="justify-start flex-1 h-full flex flex-col relative z-10 px-4 py-12 md:py-20 max-w-7xl mx-auto text-center text-white">
        <div className="text-center mb-20">
          <h2 className="text-dark  text-sm md:text-xl font-semibold mb-2">
            HAZ CRECER TU CARRERA CON NOSOTROS.
          </h2>
          <h1 className="text-primary text-4xl md:text-5xl lg:text-6xl font-bold mb-12">
            Únete a nuestro Equipo
          </h1>
          <p className="mb-8 text-[#656575] max-w-4xl mx-auto text-base md:text-lg xl:text-2xl !leading-relaxed !tracking-wide font-nunito">
            Forma parte de un equipo comprometido con la salud y el bienestar.
            Buscamos talento en diversas áreas, ofreciendo un ambiente de
            crecimiento y trabajo en equipo.
          </p>
          <p className="text-[#2e2e2e] text-xl md:text-2xl font-medium">
            ¡Únete a nosotros y haz la diferencia!
          </p>
        </div>
      </div>
    </section>
  );
};
