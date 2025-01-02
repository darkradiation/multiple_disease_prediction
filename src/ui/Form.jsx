import styled, { css } from "styled-components";

const Form = styled.form`
  padding: 2.4rem 4rem;
  width: 100%;

  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 2.4rem;

  & > button {
    grid-column: 1/2; /* Occupy the first column */
    grid-row: auto / span 1; /* Occupy the last row */
    /* padding-top: 2rem; */
  }
`;

export default Form;
