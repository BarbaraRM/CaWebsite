import React, { useEffect, useState } from "react";
import { HomeSectionType } from "@/types/home";
import { v4 as uuidv4 } from "uuid";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { Button } from "@/components/ui/button";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { HeroForm, HeroPreview } from "../admin/editor/sectHeroHome";
import Modal from "../general/TailModal/TailModal";
import { Edit, Plus, Trash2 } from "lucide-react";
import {
  InformationForm,
  InformationPreviwew,
} from "../admin/editor/sectInformation";
import { ServicesForm, ServicesPreviwew } from "../admin/editor/sectServices";
import {
  BackgroundForm,
  BackgroundPreview,
} from "../admin/editor/sectBackground";
import { FeaturesForm, FeaturesPreview } from "../admin/editor/sectFeatures";
import { ImageInfoForm, ImageInfoPreview } from "../admin/editor/sectImageInfo";
import { DoctorsForm, DoctorsPreview } from "../admin/editor/sectDoctors";
import { CtaForm, CtaPreview } from "../admin/editor/sectCta";
import { HOME_FALLBACK_DATA } from "@/store/fallbackData";
import { useConfirm } from "@/hooks/useConfirm";
import { toast } from "react-toastify";
import { ConfirmSaveModal, SavedModal } from "../admin/editor/confirmSaveModal";
import BackdropSave from "../general/Backdrop/Backdrop";
import PreviewButton from "../admin/editor/previewButton";

const SECTION_TYPES: HomeSectionType[] = [
  "hero",
  "information",
  "services",
  "background",
  "features",
  "imageinfo",
  "doctors",
  "cta",
];

export default function HomeSectionsAdmin({
  sections,
  onChange,
}: {
  sections: any[];
  onChange: any;
}) {
  const { confirm, ConfirmModal } = useConfirm();

  const [localSections, setLocalSections] = useState(sections);
  const [selectedSection, setSelectedSection] = useState<any | null>(null);
  const [openModalForm, setOpenModalForm] = useState<boolean>(false);
  const [showConfirmModal, setShowConfirmModal] = useState<boolean>(false);
  const [showSaved, setShowSaved] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const [deletedSection, setDeletedSection] = useState<any | null>(null);
  const [deletedIndex, setDeletedIndex] = useState<number | null>(null);
  const [undoTimer, setUndoTimer] = useState<NodeJS.Timeout | null>(null);

  const addSection = (type: HomeSectionType) => {
    const newSection = {
      id: uuidv4(),
      type,
      props: {},
      visible: true,
    };
    const updated = [...localSections, newSection];
    setLocalSections(updated);
    onChange(updated);
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = localSections.findIndex((s) => s.id === active.id);
    const newIndex = localSections.findIndex((s) => s.id === over.id);
    const updated = arrayMove(localSections, oldIndex, newIndex);
    setLocalSections(updated);
    onChange(updated);
  };

  const handlePropsChange = (updatedProps: any) => {
    const updated = localSections.map((s) =>
      s.id === selectedSection.id ? { ...s, props: updatedProps } : s
    );
    setLocalSections(updated);
    onChange(updated);
    setSelectedSection((prev: any) => ({ ...prev, props: updatedProps }));
  };

  const handleUseFallback = async () => {
    const confirmed = await confirm(
      "¿Estás seguro de que deseas cargar la plantilla por defecto? Esto reemplazará las secciones actuales."
    );
    if (confirmed) {
      setLocalSections(HOME_FALLBACK_DATA.sections);
    }
  };

  const handleDeleteSection = async (sectionId: string) => {
    const confirmed = await confirm("¿Estás seguro de eliminar esta sección?");
    if (!confirmed) return;

    const index = localSections.findIndex((s) => s.id === sectionId);
    const sectionToDelete = localSections[index];
    if (!sectionToDelete) return;

    const updatedSections = localSections.filter((s) => s.id !== sectionId);
    setLocalSections(updatedSections);
    onChange(updatedSections);

    let deletedPermanently = true;

    const timeout = setTimeout(() => {
      if (deletedPermanently) {
        console.log("Sección eliminada definitivamente");
        // Aquí podrías hacer persistencia real si deseas
      }
    }, 6000);

    toast(
      (t: any) => (
        <div className="flex flex-col gap-1">
          <span className="font-medium">Sección eliminada</span>
          <button
            onClick={() => {
              clearTimeout(timeout);
              deletedPermanently = false;
              const restored = [...updatedSections];
              restored.splice(index, 0, sectionToDelete); // 🧩 Insertar en la misma posición
              setLocalSections(restored);
              onChange(restored);
              toast.dismiss(t.id);
              toast.info("Sección restaurada");
            }}
            className="text-sm text-blue-600 hover:underline"
          >
            Deshacer
          </button>
        </div>
      ),
      {
        autoClose: 6000,
        position: "bottom-left",
        closeOnClick: false,
        pauseOnHover: true,
        hideProgressBar: true,
        toastId: `delete-${sectionId}`,
      }
    );

    // 🔊 Sonido al eliminar
    // const audio = new Audio("/sounds/delete.mp3");
    // audio.play();
  };

  const handleSave = async () => {
    try {
      const res = await fetch("/api/admin-panel/home", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sections: localSections }),
      });

      const data = await res.json();
      if (data.success) {
        setShowSaved(true);
      } else {
        toast.error("Error al guardar");
      }
    } catch (error) {
      console.error(error);
      toast.error("Error al conectar con el servidor");
    } finally {
      setShowConfirmModal(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/home");
        const json = await res.json();
        if (json?.sections && Array.isArray(json.sections)) {
          setLocalSections(json.sections);
        } else {
          setLocalSections(HOME_FALLBACK_DATA.sections);
        }
      } catch (error) {
        console.error("Error loading home data", error);
        setLocalSections(HOME_FALLBACK_DATA.sections);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <BackdropSave message="Cargando contenido..." />;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full flex flex-row justify-between">
        <h1 className="text-2xl font-bold">
          Administrador de Secciones del Home
        </h1>
        <div className="flex flex-row gap-x-2">
          {localSections && (
            <PreviewButton data={{ sections: localSections }} />
          )}
          <button
            className="h-fit border border-gray-400 rounded-md px-3 py-1.5 flex flex-row gap-x-1 items-center text-sm"
            onClick={handleUseFallback}
          >
            Usar plantilla
          </button>
          <button
            onClick={() => setShowConfirmModal(true)}
            className="h-fit border bg-primary hover:bg-primary/50 text-dark border-gray-400 rounded-md px-3 py-1.5 flex flex-row gap-x-1 items-center text-sm"
          >
            Guardar cambios
          </button>
        </div>
      </div>

      <ConfirmModal />
      <ConfirmSaveModal
        isOpen={showConfirmModal}
        onClose={() => setShowConfirmModal(false)}
        onConfirm={handleSave}
      />
      <SavedModal isOpen={showSaved} onClose={() => setShowSaved(false)} />

      <div className="flex flex-wrap gap-3 mb-6">
        {SECTION_TYPES.map((type) => (
          <button
            key={type}
            onClick={() => addSection(type)}
            className="flex items-center gap-2 px-3 py-2 rounded-md bg-white shadow hover:bg-gray-100 border border-gray-300 text-sm text-gray-800 transition-all duration-150 ease-in-out"
          >
            <Plus className="w-4 h-4 text-primary" />
            <span className="capitalize">{type}</span>
          </button>
        ))}
      </div>
      {deletedSection && (
        <div className="fixed bottom-4 left-4 bg-white border border-gray-300 shadow-lg p-4 rounded-lg flex items-center gap-4 z-50">
          <p className="text-sm text-gray-800">Sección eliminada</p>
          <Button
            onClick={() => {
              if (undoTimer) clearTimeout(undoTimer);
              const updated = [...localSections];
              updated.splice(deletedIndex ?? 0, 0, deletedSection);
              setLocalSections(updated);
              onChange(updated);
              setDeletedSection(null);
              setDeletedIndex(null);
            }}
            className="text-sm"
          >
            Deshacer
          </Button>
        </div>
      )}

      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
        modifiers={[restrictToVerticalAxis]}
      >
        <SortableContext
          items={localSections.map((s) => s.id)}
          strategy={verticalListSortingStrategy}
        >
          {localSections.map((section) => (
            <DraggableSection
              key={section.id}
              id={section.id}
              section={section}
              onEdit={() => {
                setSelectedSection(section);
                setOpenModalForm(true);
              }}
              onDelete={() => handleDeleteSection(section?.id)}
            />
          ))}
        </SortableContext>
      </DndContext>
      {openModalForm && selectedSection && (
        <Modal
          isOpen={openModalForm}
          setOpen={() => {
            setOpenModalForm(false);
          }}
          title={`Editar sección: ${selectedSection?.type}`}
          onClose={() => setSelectedSection(null)}
          onSave={() => setSelectedSection(null)}
        >
          {selectedSection?.type === "hero" && (
            <HeroForm
              value={selectedSection.props}
              onChange={handlePropsChange}
            />
          )}
          {selectedSection?.type === "information" && (
            <InformationForm
              value={selectedSection.props}
              onChange={handlePropsChange}
            />
          )}
          {selectedSection?.type === "services" && (
            <ServicesForm
              value={selectedSection.props}
              onChange={handlePropsChange}
            />
          )}
          {selectedSection.type === "background" && (
            <BackgroundForm
              value={selectedSection.props}
              onChange={handlePropsChange}
            />
          )}
          {selectedSection.type === "features" && (
            <FeaturesForm
              value={selectedSection.props}
              onChange={handlePropsChange}
            />
          )}
          {selectedSection.type === "imageinfo" && (
            <ImageInfoForm
              value={selectedSection.props}
              onChange={handlePropsChange}
            />
          )}
          {selectedSection.type === "doctors" && (
            <DoctorsForm
              value={selectedSection.props}
              onChange={handlePropsChange}
            />
          )}
          {selectedSection.type === "cta" && (
            <CtaForm
              value={selectedSection.props}
              onChange={handlePropsChange}
            />
          )}
        </Modal>
      )}
    </div>
  );
}

function DraggableSection({
  id,
  section,
  onEdit,
  onDelete,
}: {
  id: string;
  section: any;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div className="flex flex-row gap-x-2 ">
      <div className="flex flex-col gap-y-3 mt-2">
        <button
          onClick={onEdit}
          title="Editar Seccion"
          className="w-fit h-fit border border-orange-600 p-1 rounded-full hover:bg-orange-100 "
        >
          <Edit className="w-5 h-5 text-primary " />
        </button>
        <button
          title="Eliminar Seccion"
          onClick={onDelete}
          className="bg-red-50 w-fit h-fit border border-red-600 p-1 rounded-full hover:bg-red-100 "
        >
          <Trash2 className="w-5 h-5 text-red-500 " />
        </button>
      </div>

      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className="min-h-[100px] flex-1 border border-gray-300 rounded-lg p-4 bg-white shadow-md cursor-move relative"
      >
        <div className="mb-2">
          <p className="text-sm font-semibold">Sección: {section.type}</p>
        </div>
        {section.type === "hero" && <HeroPreview data={section.props} />}
        {section.type === "information" && (
          <InformationPreviwew data={section.props} />
        )}
        {section.type === "services" && (
          <ServicesPreviwew data={section.props} />
        )}
        {section.type === "background" && (
          <BackgroundPreview data={section.props} />
        )}
        {section.type === "features" && (
          <FeaturesPreview data={section.props} />
        )}
        {section.type === "imageinfo" && (
          <ImageInfoPreview data={section.props} />
        )}
        {section.type === "doctors" && <DoctorsPreview data={section.props} />}
        {section.type === "cta" && <CtaPreview data={section.props} />}
      </div>
    </div>
  );
}
