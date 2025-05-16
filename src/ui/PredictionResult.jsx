import styled from "styled-components";
import { useEffect } from "react"; // Removed useState as advice state is now in the hook
import { useIsPositiveNote } from "../features/useIsPositiveNote"; // Adjust path if needed

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
  // font-size: 3.5rem;  
  font-size: 2rem; /* Adjusted for better fit */
  color: var(--color-grey-900);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const NoteText = styled.div`
  // font-size: 1.5rem;
  font-size: 1.2rem; /* Adjusted for better fit */
  color: var(--color-grey-900);
  font-style: italic;
  text-align: left;
  padding-left: 2rem;

  ul {
    list-style-type: disc;
    margin-top: 0.5rem;
    padding-left: 1.5rem;
  }
  li {
    margin-bottom: 0.3rem;
  }
  p {
    margin-bottom: 0.5rem;
  }
`;

function PredictionResult({ result, check }) {
  const { advice, isFetchingAdvice, adviceError, fetchAdviceForDisease } =
    useIsPositiveNote();

  let isPositive;
  if (check === "General Disease") {
    isPositive = result && result.trim() !== "";
  } else {
    isPositive = result === check;
  }

  useEffect(() => {
    if (isPositive && result) {
      fetchAdviceForDisease(result);
    }
    // If not positive or not general disease, the hook will reset advice internally
    // if fetchAdviceForDisease is called with null/empty diseaseName,
    // or you can explicitly reset if the hook doesn't handle it.
    // For simplicity, we'll rely on the hook's behavior for now.
  }, [result, isPositive, check, fetchAdviceForDisease]);

  const defaultPositiveNote =
    "Please consult a healthcare professional for further evaluation and advice.";
  const defaultNegativeNote = "Keep maintaining a healthy lifestyle.";

  return (
    <ResultContainer isPositive={isPositive}>
      <ResultText>{result}</ResultText>
      <NoteText>
        {isPositive ? (
          isFetchingAdvice ? (
            <p>Loading advice...</p>
          ) : adviceError ? (
            <p>Error loading advice: {adviceError}</p>
          ) : (
            <>
              {advice.about && (
                              <>
              <p><strong>About {result}:</strong></p>
                                <p>{advice.about}</p>
                              </>
              )}
              {advice.dos && advice.dos.length > 0 && (
                <>
                  <p>
                    <strong>Do&apos;s:</strong>
                  </p>
                  <ul>
                    {advice.dos.map((item, index) => (
                      <li key={`do-${index}`}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              {advice.donts && advice.donts.length > 0 && (
                <>
                  <p style={{ marginTop: "0.8rem" }}>
                    <strong>Don&apos;ts:</strong>
                  </p>
                  <ul>
                    {advice.donts.map((item, index) => (
                      <li key={`dont-${index}`}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
              <p
                style={{
                  marginTop: "1rem",
                  fontStyle: "normal",
                  fontWeight: "bold",
                }}
              >
                {defaultPositiveNote}
              </p>
            </>
          )
        ) : (
          <p>{isPositive ? defaultPositiveNote : defaultNegativeNote}</p>
        )}
      </NoteText>
    </ResultContainer>
  );
}

export default PredictionResult;
