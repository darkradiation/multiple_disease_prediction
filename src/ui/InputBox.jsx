import styled from "styled-components";

const StyledInputBox = styled.div`
  width: 25rem;
  display: flex;
  flex-direction: column;
  padding: 0.5rem;
`;

const Label = styled.label`
  font-size: 1.3rem;
  font-weight: 600;
  padding: 0.2rem;
`;

const Error = styled.span`
  font-size: 1.4rem;
  color: var(--color-red-700);
`;

function InputBox({ label, error, children }) {
  return (
    <StyledInputBox>
      {label && <Label htmlFor={children.props.id}>{label}</Label>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledInputBox>
  );
}

export default InputBox;
