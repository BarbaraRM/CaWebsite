import styled from "styled-components";

//Styled component para labels de inputs en formularios dentro de modales.
export const SectionTitle = styled.h2<{ error?: boolean; disabled?: boolean }>`
  color: ${(props) => (props.error ? "#dc2626" : "#2C353D")};
  opacity: ${(props) => (props.disabled ? "0.7" : "1")};
  margin-bottom: 8px;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 0.8;
`;