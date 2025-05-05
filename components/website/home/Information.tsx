"use client";

import { InformationSectionType } from "@/types/home";
import { HeartHandshake } from "lucide-react";
import { sanitizeSvg } from "@/utils/sanitizeSvg";

interface Props {
  information: InformationSectionType;
}

export default function InformationSection({ information }: Props) {
  return (
    <section className="min-h-[42vh] bg-white p-3 md:p-6 gap-y-3 md:gap-y-10 flex flex-col justify-center items-center">
      <div className="max-w-[1000px]">
        <p className="text-2xl font-nunito leading-normal tracking-wide font-light text-center">
          {information?.content || ""}
        </p>
      </div>

      <div className="max-w-[900px] w-full flex flex-col md:flex-row md:flex-wrap items-center justify-center gap-x-2 md:gap-x-10">
        {information?.items?.map((item: any, index: number) => {
          const sanitizedIcon = item?.icon ? sanitizeSvg(item.icon) : "";

          return (
            <div
              key={`ind-${index}`}
              className="flex flex-row w-fit items-center px-3 gap-x-2"
            >
              {/* Si hay SVG limpio, lo usamos. Si no, fallback al ícono por defecto */}
              {sanitizedIcon ? (
                <div
                  className="w-[42px] h-[42px]"
                  dangerouslySetInnerHTML={{ __html: sanitizedIcon }}
                />
              ) : (
                <HeartHandshake className="text-primary w-[24px] h-[24px]" />
              )}

              <div className="flex-1 text-sm md:text-base">
                <p className="whitespace-pre-line text-left leading-tight">
                  {item?.text || "Your text here"}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
