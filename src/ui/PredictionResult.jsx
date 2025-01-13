import styled from "styled-components";

const ResultContainer = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: ${(props) =>
    props.isPositive ? "var(--color-red-500)" : "var(--color-green-500)"};
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  text-align: center;
`;

const ResultText = styled.p`
  font-size: 3.5rem;
  color: var(--color-grey-900);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const NoteText = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-900);
  font-style: italic;
`;

function PredictionResult({ result, check }) {
  const isPositive = result === check;
  const note = isPositive
    ? "Please consult a healthcare professional for further evaluation and advice."
    : "Keep maintaining a healthy lifestyle to stay diabetes-free!";

  return (
    <ResultContainer isPositive={isPositive}>
      {/* <ResultHeading>Prediction Result:</ResultHeading> */}
      <ResultText isPositive={isPositive}>{result}</ResultText>
      <NoteText>{note}</NoteText>
    </ResultContainer>
  );
}

export default PredictionResult;
