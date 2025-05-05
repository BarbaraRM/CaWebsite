"use client";
import React from "react";
import { motion } from "framer-motion";
import { BackgroundSectionType } from "@/types/home";

interface Props {
  data?: BackgroundSectionType;
}

interface ItemsType {
  icon: string;
  title?: string;
  content: string;
}

export const BackgroundSection = ({ data }: Props) => {
  return (
    <section className="flex flex-col relative min-h-[90dvh]">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div
          className="w-full h-full bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg/bg_maternidad.png')",
            filter: "brightness(0.7)",
          }}
        />
      </div>

      {/* Content */}
      <div className="justify-center flex-1 h-full flex flex-col relative z-10 px-4 py-16 md:py-32 lg:py-40 max-w-7xl mx-auto text-center text-white">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="font-poppins text-3xl md:text-5xl lg:text-6xl font-bold mb-6 lg:mb-12 2xl:mb-14 tracking-wide leading-normal"
        >
          {data?.title || "Your title here"}
        </motion.p>

        {data?.content && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-base md:text-xl xl:text-2xl max-w-3xl mx-auto mb-8 md:mb-16 !leading-relaxed font-light"
          >
            {data?.content}
          </motion.p>
        )}

        {/* Item List */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-y-4 md:gap-8 2xl:gap-x-10 md:mt-12 px-5">
          {data?.items?.map((item: ItemsType, index: number) => (
            <motion.div
              key={`bg-${item?.title}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
              viewport={{ once: false }}
              className="flex flex-row gap-x-3 xl:gap-x-4"
            >
              <div className="mb-4 self-center">
                {/* Puedes mantener o reemplazar este ícono según necesidad */}
                <svg
                  viewBox="0 0 50 51"
                  className="w-8 h-8 md:w-12 md:h-12"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_70_3237)">
                    <path
                      d="M50 25.4999V25.4874C50 18.0895 46.7792 11.4458 41.6646 6.877L41.6396 6.85617C41.5764 6.78807 41.5059 6.72727 41.4292 6.67492L41.425 6.67283C36.8825 2.68435 31.0409 0.49022 24.9958 0.502C18.6792 0.502 12.9125 2.84783 8.51667 6.71867L8.54376 6.69575C8.49077 6.73594 8.44192 6.7813 8.39792 6.83117C5.75527 9.17115 3.63999 12.048 2.19221 15.2672C0.744428 18.4864 -0.00280602 21.9764 7.91805e-06 25.5062C7.91805e-06 32.902 3.21667 39.5458 8.32709 44.1166L8.35209 44.1374C8.41827 44.2125 8.4923 44.2802 8.57292 44.3395L8.57709 44.3416C13.1184 48.3242 18.9556 50.5151 24.9958 50.5041C31.0643 50.5134 36.9265 48.3022 41.4771 44.2874L41.45 44.3103C44.1385 41.973 46.2935 39.0854 47.7693 35.843C49.2451 32.6006 50.0073 29.079 50.0042 25.5166V25.502L50 25.4999ZM40.7042 41.7603C39.4658 40.7586 38.1339 39.8781 36.7271 39.1312L36.5917 39.0645C37.8688 35.3833 38.6375 31.1395 38.7104 26.7249V26.6916H47.5875C47.2881 32.4028 44.8299 37.787 40.7104 41.7541L40.7042 41.7603ZM26.1917 38.6249C28.8646 38.7687 31.3625 39.3562 33.6667 40.3124L33.5167 40.2583C31.6708 44.4666 29.0729 47.3583 26.1917 47.9937V38.6249ZM26.1917 36.2416V26.6916H36.3333C36.2529 30.6463 35.5672 34.5653 34.3 38.3124L34.3813 38.0395C31.7947 36.9764 29.0437 36.3688 26.25 36.2437L26.1938 36.2416H26.1917ZM26.1917 24.3083V14.7582C29.0608 14.6273 31.8854 13.9992 34.5396 12.902L34.375 12.9624C35.5313 16.3353 36.2417 20.2228 36.3333 24.2645V24.3083H26.1917ZM26.1917 12.3749V3.01033C29.0729 3.64575 31.6708 6.52492 33.5167 10.7458C31.3625 11.6416 28.8646 12.227 26.2521 12.3728L26.1917 12.3749ZM32.1375 4.04158C34.5924 4.86041 36.8883 6.09504 38.925 7.69158L38.8771 7.65408C37.9542 8.37908 36.9188 9.06242 35.8271 9.65617L35.7104 9.7145C34.8283 7.63268 33.6154 5.70715 32.1188 4.01242L32.1375 4.03533V4.04158ZM23.8042 3.01658V12.3749C21.2344 12.2438 18.7061 11.6731 16.3292 10.6874L16.4792 10.7416C18.3333 6.53325 20.9271 3.64367 23.8083 3.00825L23.8042 3.01658ZM14.2875 9.70825C13.1582 9.10066 12.0822 8.39886 11.0708 7.61033L11.1208 7.64783C13.0982 6.09815 15.3223 4.89242 17.7 4.08117L17.8583 4.03325C16.4009 5.68207 15.2133 7.55098 14.3396 9.57075L14.2875 9.70825ZM23.8083 14.7562V24.3062H13.6667C13.7583 20.2207 14.4688 16.3332 15.7063 12.6874L15.625 12.9603C18.2105 14.0217 20.96 14.6286 23.7521 14.7541L23.8083 14.7562ZM23.8083 26.6895V36.2395C20.9392 36.3704 18.1147 36.9985 15.4604 38.0957L15.625 38.0353C14.4688 34.6645 13.7583 30.7749 13.6667 26.7332V26.6895H23.8083ZM23.8083 38.6228V47.9874C20.9271 47.352 18.3292 44.4728 16.4833 40.252C18.6375 39.3562 21.1354 38.7728 23.7479 38.627L23.8083 38.6228ZM17.8708 46.9562C15.4166 46.1397 13.1207 44.908 11.0833 43.3145L11.1333 43.352C12.0563 42.627 13.0917 41.9437 14.1833 41.3499L14.3 41.2916C15.1748 43.3743 16.3876 45.2981 17.8896 46.9853L17.8708 46.9645V46.9562ZM35.7125 41.2895C36.9208 41.9458 37.9563 42.627 38.9292 43.3874L38.8792 43.3499C36.9018 44.8996 34.6777 46.1053 32.3 46.9166L32.1417 46.9645C33.5991 45.3164 34.7867 43.4482 35.6604 41.4291L35.7125 41.2937V41.2895ZM47.5875 24.3083H38.7104C38.6466 19.9977 37.9027 15.7243 36.5063 11.6457L36.5917 11.9332C38.0633 11.1584 39.4566 10.243 40.7521 9.19992L40.7021 9.23742C44.8131 13.1896 47.2722 18.5537 47.5833 24.2478L47.5854 24.3062L47.5875 24.3083ZM9.29584 9.2395C10.4958 10.2145 11.8438 11.1082 13.2729 11.8687L13.4083 11.9353C12.1313 15.6166 11.3625 19.8603 11.2896 24.2749V24.3083H2.41042C2.70978 18.597 5.16803 13.2128 9.28751 9.24575L9.29584 9.2395ZM2.41251 26.6916H11.2896C11.3535 31.0021 12.0973 35.2755 13.4938 39.3541L13.4083 39.0666C11.8438 39.8978 10.4979 40.7916 9.24792 41.7999L9.29792 41.7624C5.18696 37.8103 2.72785 32.4461 2.41667 26.752L2.41459 26.6937L2.41251 26.6916Z"
                      fill="white"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_70_3237">
                      <rect
                        width="50"
                        height="50"
                        fill="white"
                        transform="translate(0 0.5)"
                      />
                    </clipPath>
                  </defs>
                </svg>
              </div>

              <div className="flex flex-col text-start self-start justify-start h-full">
                {item?.title && (
                  <p className="text-lg md:text-xl font-semibold md:mb-2">{item.title}</p>
                )}
                <p className="text-sm md:text-base leading-tight">{item.content}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
