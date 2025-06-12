import styled from "styled-components";

const StyledCheckbox = styled.div`
  display: flex;
  gap: 1.6rem;
  align-items: center;
  padding-left: 20px;

  & input[type="checkbox"] {
    height: 2.4rem;
    width: 2.4rem;
    outline-offset: 2px;
    accent-color: var(--color-brand-600);
  }
`;

function CheckBox({ checked, onChange }) {
  return (
    <StyledCheckbox>
      <input type="checkbox" id="aiPrediction" checked={checked} onChange={onChange} />
      <label htmlFor="aiPrediction">Allow AI Prediction</label>
    </StyledCheckbox>
  );
}

export default CheckBox;
