import styled from "styled-components";

//Styled component para labels de inputs en formularios dentro de modales.
export const FormLabel = styled.label<{ error?: boolean; disabled?: boolean }>`
  color: ${(props) => (props.error ? "#dc2626" : "#2C353D")};
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  margin-bottom: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 0.8;
`;

//Styled component para labels de inputs en formularios internos
export const SmallLabel = styled.label<{ error?: boolean; disabled?: boolean }>`
  color: ${(props) =>
    props.disabled
      ? "#2C353D !important"
      : props.error
      ? "#dc2626"
      : "#2C353D"};
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  margin-bottom: 4px;
  font-size: 0.85rem;
  font-weight: 600;
  line-height: 0.8;
`;

// Styled Component para el titulo de las cards en formularios
export const FormTitle = styled.p<{ disabled?: boolean, error?: boolean }>`
  margin-bottom: 1rem;
  font-size: 1rem;
  font-weight: 600;
  color: ${({ disabled,error }) => (disabled ? "#9CA3AF" : error? "#ff0000" :"#1F2937")}; /* Gris si está deshabilitado */
  fill: ${({ disabled,error }) => (disabled ? "#9CA3AF" : error? "#ff0000" :"#1F2937")}; /* Gris si está deshabilitado */
  display: flex;
  align-items: center;
  gap: 0.25rem;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "default")}; /* Cursor de no permitido si está deshabilitado */
`;

// Styled Component para el ícono de los titulos de las cards
export const FormIcon = styled.svg<{ disabled?: boolean }>`
  width: 1.1rem;
  height: 1.1rem;
  color: ${({ disabled }) => (disabled ? "#9CA3AF" : "currentColor")}; /* Gris si está deshabilitado */
`;

export const InputForm = styled.input`
  font-size: 0.75rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  padding: 3px 6px;

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;

export const SelectForm = styled.select`
  padding: 3px 6px; /* py-[3px] px-2 */
  font-size: 0.75rem;
  width: 100%;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  &:focus {
    border-color: #3b82f6;
    outline: none;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
  }
`;
