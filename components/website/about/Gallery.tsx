interface FixedColumnsGalleryProps {
  list: string[];
  columns?: number;
  bgColor?: string;
}

function distributeInColumns(list: string[], columns: number): string[][] {
  const result: string[][] = Array.from({ length: columns }, () => []);
  list.forEach((item, i) => {
    result[i % columns].push(item);
  });
  return result;
}

const heightPattern = {
  0: ["h-64", "h-[120px]", "h-80"],
  1: ["h-[120px]", "h-80", "h-64"],
  2: ["h-80", "h-64", "h-[120px]"],
  3: ["h-64", "h-[120px]", "h-80"],
  4: ["h-[120px]", "h-80", "h-64"],
  5: ["h-80", "h-64", "h-[120px]"],
};

export default function FixedColumnsGallery({
  list,
  columns = 5,
  bgColor = "bg-white",
}: FixedColumnsGalleryProps) {
  const columnData = distributeInColumns(list, columns);

  return (
    <div
      className={`mb-5 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-5 md:grid-cols-${columns} gap-4`}
    >
      {columnData.map((col, colIdx) => (
        <div key={colIdx} className="flex flex-col gap-4">
          {col.map((src, imgIdx) => {
            const heightClass = heightPattern?.[colIdx]?.[imgIdx % heightPattern?.[colIdx]?.length];
            return (
              <div
                key={imgIdx}
                className={`w-full ${heightClass} ${bgColor} overflow-hidden rounded-lg`}
              >
                <img
                  src={src}
                  alt={`img-${colIdx}-${imgIdx}`}
                  className="w-full h-full object-cover object-center"
                />
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}
