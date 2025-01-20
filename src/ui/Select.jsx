import styled from "styled-components";

const Select = styled.select`
  font-size: 1.5rem;
  padding: 0.9rem 0 0.9rem 1rem;
  border: 1px solid
    ${(props) =>
      props.type === "white"
        ? "var(--color-grey-100)"
        : "var(--color-grey-300)"};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  overflow: scroll;
`;

export default Select;
