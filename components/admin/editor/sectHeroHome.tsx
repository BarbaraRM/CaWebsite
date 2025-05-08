import { HeroSlideType } from "@/types/home";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import HeroSlider from "@/components/website/home/Hero";

export const HeroPreview = ({
  data,
}: {
  data: { slides: HeroSlideType[] };
}) => {
  if (!data?.slides?.length)
    return <p className="text-gray-400 text-xs">No hay slides definidos.</p>;

  return (
    <div className="w-full flex flex-col">
      <HeroSlider slides={data?.slides? [data?.slides?.[0]]:[]} />
    </div>
  );
};

export const HeroForm = ({
  value,
  onChange,
}: {
  value: { slides: HeroSlideType[] };
  onChange: (val: any) => void;
}) => {
  const [slides, setSlides] = useState<HeroSlideType[]>(value.slides || []);

  const updateSlide = (index: number, updated: Partial<HeroSlideType>) => {
    const updatedSlides = [...slides];
    updatedSlides[index] = { ...updatedSlides[index], ...updated };
    setSlides(updatedSlides);
    onChange({ slides: updatedSlides });
  };

  return (
    <div className="flex flex-col gap-4">
      {slides.map((slide, i) => (
        <div key={i} className="border p-3 rounded-md bg-gray-50">
          <p className="text-sm font-semibold mb-2">Slide #{i + 1}</p>
          <Input
            placeholder="Título"
            value={slide.title}
            onChange={(e) => updateSlide(i, { title: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Descripción"
            value={slide.description}
            onChange={(e) => updateSlide(i, { description: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Imagen de fondo (URL)"
            value={slide.background}
            onChange={(e) => updateSlide(i, { background: e.target.value })}
            className="mb-2"
          />
          <Input
            placeholder="Texto del botón"
            value={slide.button?.text || ""}
            onChange={(e) =>
              updateSlide(i, {
                button: { ...slide.button, text: e.target.value },
              })
            }
            className="mb-2"
          />
          <Input
            placeholder="URL del botón"
            value={slide.button?.url || ""}
            onChange={(e) =>
              updateSlide(i, {
                button: { ...slide.button, url: e.target.value },
              })
            }
          />
        </div>
      ))}
      <Button
        type="button"
        onClick={() =>
          setSlides([
            ...slides,
            {
              title: "",
              description: "",
              background: "",
              button: { text: "", url: "" },
            },
          ])
        }
      >
        Agregar Slide
      </Button>
    </div>
  );
};
