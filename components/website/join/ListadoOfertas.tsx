import React from "react";
import { OfertaLaboral } from "@/types/oferta";
import { JobCard } from "./JobCard";

function ListadoOfertas({
  ofertas,
}: {
  ofertas?: OfertaLaboral[] | undefined;
}) {
  return (
    <div className="flex flex-col items-center px-5 py-12 md:py-24">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12 max-w-[1300px] w-full">
        {ofertas?.map((job: OfertaLaboral, index: number) => {
          return <JobCard key={`job-${job.id}-${index}`} job={job} />;
        })}
      </div>
    </div>
  );
}

export default ListadoOfertas;
