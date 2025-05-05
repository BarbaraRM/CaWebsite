export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-2">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#F29200]"></div>
        <p className="text-sm text-muted-foreground">Cargando...</p>
      </div>
    </div>
  );
}
