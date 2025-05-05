// hooks/useAutoSave.ts
import { useState, useEffect, useRef } from "react";
import _ from "lodash";

interface AutoSaveProps<T> {
  data: T | undefined;
  isEditing: boolean;
  storageKey: string;
  onSave: (data: T) => Promise<boolean>;
  delay?: number;
  onRestore?: (restoredData: T) => void;
  compareKey?: keyof T;
  autoRestore?: boolean;
}

const useAutoSave = <T,>({
  data,
  isEditing,
  storageKey,
  onSave,
  delay = 5000,
  onRestore,
  compareKey,
  autoRestore = false,
}: AutoSaveProps<T>) => {
  const [lastSavedData, setLastSavedData] = useState<T | undefined>(_.cloneDeep(data));
  const [isSaved, setIsSaved] = useState(false);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [showRestoreNotification, setShowRestoreNotification] = useState(false);
  const [showConflictModal, setShowConflictModal] = useState(false);
  const [differences, setDifferences] = useState<Partial<T> | null>(null);

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isClient = typeof window !== "undefined";

  useEffect(() => {
    if (!isClient || !data) return;

    const localDataString = localStorage.getItem(storageKey);
    if (localDataString) {
      const localData: T = JSON.parse(localDataString);
      const hasDifferences = !_.isEqual(localData, data);

      if (hasDifferences) {
        let restore = autoRestore;

        if (compareKey && data[compareKey] && localData[compareKey]) {
          const baseDate = new Date(String(data[compareKey]));
          const localDate = new Date(String(localData[compareKey]));

          if (baseDate > localDate) {
            setDifferences(
              _.reduce(
                localData,
                (diff, value, key) => {
                  if (!_.isEqual(value, (data as any)[key])) {
                    (diff as any)[key] = value;
                  }
                  return diff;
                },
                {} as Partial<T>
              )
            );
            setShowConflictModal(true);
            restore = false;
          }
        }

        if (restore && onRestore) {
          onRestore(localData);
          setShowRestoreNotification(true);
          setTimeout(() => setShowRestoreNotification(false), 4000);
        }
      }
    }
  }, [data, isClient]);

  useEffect(() => {
    if (!isClient || !isEditing || data === undefined) return;

    const hasChanges = !_.isEqual(data, lastSavedData);

    if (hasChanges) {
      localStorage.setItem(storageKey, JSON.stringify(data));
      setHasUnsavedChanges(true);
      setIsSaved(false);

      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        guardarDatos();
      }, delay);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [data, isEditing, isClient]);

  const guardarDatos = async () => {
    if (!isClient || !isEditing || data === undefined) return;

    try {
      await onSave(data);
      localStorage.removeItem(storageKey);

      setLastSavedData(_.cloneDeep(data));
      setIsSaved(true);
      setHasUnsavedChanges(false);

      setTimeout(() => setIsSaved(false), 3000);
    } catch (error) {
      console.error("Error al guardar los datos", error);
    }
  };

  const guardarDatosManual = async () => {
    if (!isClient || data === undefined) return false;

    try {
      await onSave(data);
      localStorage.removeItem(storageKey);
      setLastSavedData(_.cloneDeep(data));
      setIsSaved(true);
      setHasUnsavedChanges(false);
      setTimeout(() => setIsSaved(false), 3000);
      return true;
    } catch (error) {
      console.error("Error al guardar los datos", error);
      return false;
    }
  };

  return {
    guardarDatos,
    guardarDatosManual,
    isSaved,
    hasUnsavedChanges,
    showRestoreNotification,
    showConflictModal,
    setShowConflictModal,
    differences,
  };
};

export default useAutoSave;
