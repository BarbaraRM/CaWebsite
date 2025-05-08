import React, { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalProps {
  title?: string;
  icon?: ReactNode;
  children: ReactNode;
  onSave?: Function;
  onClose?: Function;
  showActions?: boolean;
  isOpen: boolean;
  setOpen: any;
  zIndex?: number;
  maxWidth?: number;
  formId?: string;
  saveDisabled?: boolean;
  saveText?: string;
  cancelText?: string;
  useSubmit?: boolean;
}

const Modal: React.FC<ModalProps> = ({
  title,
  icon,
  children,
  onSave,
  onClose,
  showActions = true,
  isOpen,
  setOpen,
  zIndex = 1,
  maxWidth = 600,
  formId,
  saveDisabled = false,
  saveText = "Save",
  cancelText = "Cancel",
  useSubmit
}) => {
  if (!isOpen) return null;

  const handleSave = (e: any) => {
    e?.preventDefault();
    if (onSave) onSave();
  };

  const handleClose = () => {
    setOpen(false);
    if (onClose) onClose();
  };

  return ReactDOM.createPortal(
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
      style={{ zIndex: zIndex * 100 }}
    >
      <div
        className="relative bg-white rounded-lg shadow-lg w-[90dvw] overflow-hidden flex flex-col h-fit max-h-[90dvh] "
        style={{ maxWidth: `${maxWidth}px` }}
      >
        {/* Cerrar modal */}
        <button
          onClick={handleClose}
          className="absolute rounded-full top-2 right-2 text-gray-700 hover:text-gray-500 text-xl p-1 hover:bg-gray-100 hover:border hover:border-gray-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Modal Header */}
        <div className="px-6 pb-2 pt-6 flex flex-row items-center font-poppins">
          {icon}
          <h2 className="text-lg font-semibold text-gray-700">{title}</h2>
        </div>

        {/* Modal Body */}
        <div className="px-4 py-1 flex flex-col flex-1 overflow-auto">{children}</div>

        {/* Modal Actions */}
        {showActions && (
          <div className="mt-1 flex justify-end gap-2 px-6 pt-2 pb-4">
            <button
              className="px-4 py-2 text-sm font-semibold text-gray-600 bg-gray-200 rounded hover:bg-gray-300"
              onClick={handleClose}
            >
              {cancelText}
            </button>
            {(onSave || formId) && (
              <button
                className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed"
                onClick={!useSubmit ? handleSave : undefined}
                form={formId}
                disabled={saveDisabled}
                type={formId ? "submit" : "button"}
              >
                {saveText}
              </button>
            )}
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};

export default Modal;
