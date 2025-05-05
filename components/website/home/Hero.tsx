"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import Link from "next/link";
import clsx from "clsx";
import { motion } from "framer-motion";
import { HeroSlideType } from "@/types/home";

interface HeroSliderProps {
  slides: HeroSlideType[];
}

export default function HeroSlider({ slides }: HeroSliderProps) {
  return (
    <section className="relative font-nunito">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={{ delay: 6000 }}
        loop
        className="h-[50vh]"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div
              className="h-full bg-cover bg-center flex items-center relative"
              style={{ backgroundImage: `url(${slide?.background})` }}
            >
              <div
                className={clsx(
                  "container justify-center mx-auto px-4",
                  slide?.align === "right" ? "text-right" : "text-left"
                )}
              >
                <div
                  className={clsx(
                    "max-w-xl justify-center ",
                    slide?.align === "right"
                      ? "ml-auto mr-0 md:mr-12"
                      : "ml-0 md:ml-12"
                  )}
                >
                  <motion.h1
                    className="text-white text-4xl md:text-6xl mb-4 drop-shadow-lg text-center !font-bold font-nunito"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    {slide?.title}
                  </motion.h1>

                  {slide?.description && (
                    <motion.p
                      className="text-white text-lg md:text-2xl mb-6 drop-shadow-md font-nunito text-center"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2, duration: 0.6 }}
                    >
                      {slide?.description}
                    </motion.p>
                  )}

                  <motion.div
                    className="justify-center flex"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                  >
                    <Link
                      href={slide?.button?.url || "/"}
                      className="font-semibold inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-lg hover:bg-primary/90 transition"
                    >
                      {slide?.button?.text || "Conoce más"}
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
