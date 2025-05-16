import styled from "styled-components";
import { useEffect } from "react";
import { useIsPositiveNote } from "../features/useIsPositiveNote";
import { useGetAIResult } from "../features/useGetAIResult";

const ResultContainer = styled.div`
  margin-top: 1rem;
  padding: 1.5rem;
  background-color: ${(props) => {
    // Handle null case for isPositive during initial load or error
    if (props.isPositive === true) return "var(--color-red-100)"; // Example for positive
    if (props.isPositive === false) return "var(--color-green-100)"; // Example for negative
    return "var(--color-grey-100)"; // Default or loading/error
  }};
  border: 1px solid var(--color-grey-200); /* Adjusted border color */
  border-radius: var(--border-radius-md);
  text-align: center;
`;

const ResultText = styled.p`
  font-size: 2rem; /* Adjusted for better fit */
  color: var(--color-grey-900);
  font-weight: bold;
  margin-bottom: 1rem;
`;

const NoteText = styled.div`
  font-size: 1.2rem; /* Adjusted for better fit */
  color: var(--color-grey-700); /* Slightly softer color */
  font-style: italic;
  text-align: left;
  padding-left: 1rem; /* Adjusted padding */

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
  strong {
    color: var(--color-grey-800); /* Darker strong text */
  }
`;

const LoadingText = styled.p`
  font-size: 1.5rem;
  color: var(--color-grey-700);
  text-align: center;
  padding: 2rem;
`;

const ErrorText = styled.p`
  font-size: 1.5rem;
  color: var(--color-red-700);
  text-align: center;
  padding: 2rem;
`;


function AIPredictionResult({ symptoms }) {
  const { advice, isFetchingAdvice, adviceError, fetchAdviceForDisease } =
    useIsPositiveNote();

  const {
    result,
    isPositive,
    isFetchingResult,
    resultError, fetchResultForSymptoms,  } = useGetAIResult();

  // 2. Use useEffect to call fetchResultForSymptoms when 'symptoms' change
  useEffect(() => {
    console.log("AIPredictionResult: Symptoms received:", symptoms);
    let hasSymptomInput = false;
    if (Array.isArray(symptoms) && symptoms.length > 0) {
        hasSymptomInput = true;
    } else if (typeof symptoms === 'string' && symptoms.trim() !== '') {
        hasSymptomInput = true;
    }

    if (hasSymptomInput) {
      console.log("AIPredictionResult: Calling fetchResultForSymptoms with:", symptoms);
      fetchResultForSymptoms(symptoms);
    } else {
      console.log("AIPredictionResult: No valid symptoms to fetch AI result.");
      // fetchAdviceForDisease(null); // or reset advice state directly
    }
  }, [symptoms, fetchResultForSymptoms]); // Dependencies

  // 3. Use useEffect to fetch advice *after* AI result is available and positive
  useEffect(() => {
    // Only fetch advice if AI diagnosis was successful (no error, not fetching)
    // and the result is positive and a disease name is present.
    if (isPositive === true && result && !isFetchingResult && !resultError) {
      console.log("AIPredictionResult: AI result is positive. Fetching advice for:", result);
      fetchAdviceForDisease(result);
    } else {      // Clear previous advice if conditions are no longer met (e.g., result becomes negative or error occurs)
      // The useIsPositiveNote hook resets advice when fetchAdviceForDisease(null) or empty string is called
      if (!result || isPositive !== true) {
        fetchAdviceForDisease(null); // Clears advice
      }
      console.log("AIPredictionResult: Not fetching advice. Conditions: isPositive:", isPositive, "result:", result, "isFetchingResult:", isFetchingResult, "resultError:", resultError);
    }
  }, [result, isPositive, fetchAdviceForDisease, isFetchingResult, resultError]);


  console.log("AIPredictionResult: Render state - isFetchingResult:", isFetchingResult, "result:", result, "isPositive:", isPositive, "resultError:", resultError);

  if (isFetchingResult) {
    return <LoadingText>🧠 Thinking... Analyzing symptoms...</LoadingText>;
  }

  if (resultError) {
    return <ErrorText>😥 Error fetching AI diagnosis: {resultError}</ErrorText>;
  }
  if (result === null && isPositive === null && ( (Array.isArray(symptoms) && symptoms.length > 0) || (typeof symptoms === 'string' && symptoms.trim() !== '') )) {
    // This state could occur if the API call is in progress (covered by isFetchingResult)
    // or if the API call completed but returned default nulls without an error.
    // The `useGetAIResult` hook's default is { result: null, isPositive: null }.
    // If the API call was successful but Gemini couldn't determine a result, it should ideally return
    // something like { result: "No specific condition identified", isPositive: false }.
    // So, this specific condition might indicate an issue or an unhandled API response format.
    // For now, let's assume if `result` is null and no error, it means no specific condition.
    // However, your hook sets `ERROR_AI_RESULT = { result: "Error fetching diagnosis", isPositive: null }`
    // and `API_KEY_MISSING_RESULT = { result: "API Key not configured", isPositive: null }`
    // which would be caught by `resultError` if these string results were intended as errors.
    // If `result` is genuinely null from API with no error, it needs specific handling.
    // For now, if `result` is null and no error, we treat it as no result to show.
    // Let's refine the condition for showing "No result" vs "No symptoms".
  }

  // If no symptoms were provided to the component, and thus no fetch was attempted.
  if ( (!Array.isArray(symptoms) || symptoms.length === 0) && (typeof symptoms !== 'string' || symptoms.trim() === '') ) {
    return <LoadingText>Please provide symptoms for analysis.</LoadingText>;
  }
  
  // If a fetch was attempted, but the result is still null (e.g., Gemini returned non-specific or empty)
  // and there's no error and it's not loading.
  if (result === null && !isFetchingResult && !resultError) {
    return <LoadingText>No specific diagnosis could be determined from the symptoms provided.</LoadingText>;
  }


  const defaultPositiveNote =
    "Please consult a healthcare professional for further evaluation and specific advice.";
  const defaultNegativeNote =
    "Symptoms do not strongly indicate a specific concern. Continue monitoring and consult a doctor if symptoms worsen or new ones appear. Keep maintaining a healthy lifestyle.";


  return (
    <ResultContainer isPositive={isPositive}>
      <ResultText>
        {result || (isPositive === false ? "No specific condition identified" : "Awaiting analysis...")}
      </ResultText>
      <NoteText>
        {isPositive === true ? ( // Strictly check for true
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
              {(advice.dos && advice.dos.length > 0) || (advice.donts && advice.donts.length > 0) ? (
                <>
                  {advice.dos && advice.dos.length > 0 && (
                    <>
                      <p>
                        <strong>Do's:</strong>
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
                        <strong>Don'ts:</strong>
                      </p>
                      <ul>
                        {advice.donts.map((item, index) => (
                          <li key={`dont-${index}`}>{item}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </>
              ) : (
                <p>No specific Do's and Don'ts available for this condition from the AI. Rely on professional medical advice.</p>
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
        ) : isPositive === false ? ( // Strictly check for false
          <p>{defaultNegativeNote}</p>
        ) : (
          // This case (isPositive is null and not fetching/error) might mean symptoms were vague
          // or API didn't return a clear positive/negative.
          <p>Awaiting clear AI analysis or symptoms might be too general for a specific note.</p>
        )}
      </NoteText>
    </ResultContainer>
  );
}

export default AIPredictionResult;