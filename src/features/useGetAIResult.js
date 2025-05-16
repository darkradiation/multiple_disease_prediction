// useGetAIResult.js
import { useState, useCallback } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { toast } from "react-hot-toast";

// IMPORTANT: REPLACE THIS WITH YOUR ACTUAL API KEY OR USE AN ENVIRONMENT VARIABLE
// Storing API keys directly in code is NOT recommended for production.
const API_KEY = "AIzaSyB24hoqud5aygF3Qrn7-QmA9RAsA2yneno"; // REPLACE THIS OR USE ENV VARIABLE

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-latest", // Using a more recent model, adjust if needed
  safetySettings: [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ],
  generationConfig: {
    temperature: 0.6, // Slightly lower for more deterministic diagnostic-like output
    // responseMimeType: "application/json", // Enable if your model version supports it for direct JSON output
  },
});

const DEFAULT_AI_RESULT = { result: null, isPositive: null };
const ERROR_AI_RESULT = { result: "Error fetching diagnosis", isPositive: null };
const API_KEY_MISSING_RESULT = { result: "API Key not configured", isPositive: null };


export function useGetAIResult() {
  const [aiResponse, setAiResponse] = useState(DEFAULT_AI_RESULT);
  const [isFetchingResult, setIsFetchingResult] = useState(false);
  const [resultError, setResultError] = useState(null);

  const fetchResultForSymptoms = useCallback(async (symptoms) => {
    let symptomsString = "";
    if (Array.isArray(symptoms)) {
      symptomsString = symptoms.join(", ");
    } else if (typeof symptoms === "string") {
      symptomsString = symptoms;
    }

    if (!symptomsString || symptomsString.trim() === "") {
      setAiResponse(DEFAULT_AI_RESULT);
      setResultError(null);
      setIsFetchingResult(false);
      return;
    }

    // Basic check for the placeholder API key.
    // In a real app, you'd have a more robust way to check if the key is a placeholder or actually missing.
    if (!API_KEY) { // Check against your placeholder
      toast.error("Google API Key not configured for AI diagnosis.");
      setResultError("API Key not configured.");
      setAiResponse(API_KEY_MISSING_RESULT);
      setIsFetchingResult(false);
      return;
    }

    setIsFetchingResult(true);
    setResultError(null);
    setAiResponse(DEFAULT_AI_RESULT); // Reset previous result

    const prompt =
      `Based on the following symptoms: "${symptomsString}", ` +
      `what is a likely medical condition? If a condition is identified, is this considered a positive finding (i.e., a potential issue found)? ` +
      `Format the response strictly as a JSON object with two keys: "result" (a string, e.g., "Common Cold", "Flu", "No specific condition identified", or the most likely condition) and "isPositive" (a boolean, true if a condition is likely or identified, false if no specific condition is identified or symptoms are very mild/general). ` +
      `Example for a positive finding: {"result": "Migraine", "isPositive": true}. ` +
      `Example for a negative/non-specific finding: {"result": "No specific condition identified", "isPositive": false}. ` +
      `Example for very mild symptoms: {"result": "Symptoms indicate mild fatigue, not a specific illness", "isPositive": false}. ` +
      `If symptoms are too vague, return something like: {"result": "Symptoms too vague for diagnosis", "isPositive": false}.`;

    try {
      const generationResult = await model.generateContent(prompt);
      const responseText = generationResult.response.text();

      let jsonResponseStr = responseText;
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        jsonResponseStr = jsonMatch[1];
      }

      try {
        const parsedResponse = JSON.parse(jsonResponseStr);
        if (
          parsedResponse &&
          typeof parsedResponse.result === "string" &&
          typeof parsedResponse.isPositive === "boolean"
        ) {
          setAiResponse(parsedResponse);
        } else {
          throw new Error(
            "Parsed AI response is not in the expected format (result: string, isPositive: boolean)."
          );
        }
      } catch (parseError) {
        console.error(
          "Error parsing Gemini response for diagnosis:",
          parseError,
          "\nRaw response:",
          responseText
        );
        setResultError(
          "AI response for diagnosis is not in the expected format."
        );
        setAiResponse(ERROR_AI_RESULT);
      }
    } catch (error) {
      console.error("Error fetching diagnosis from Gemini:", error);
      const message =
        error.message || "Could not get diagnosis from AI.";
      setResultError(message);
      toast.error(`Failed to get diagnosis: ${message}`);
      setAiResponse(ERROR_AI_RESULT);
    } finally {
      setIsFetchingResult(false);
    }
  }, []); // No dependencies, this function is stable

  return {
    result: aiResponse.result,
    isPositive: aiResponse.isPositive,
    isFetchingResult,
    resultError,
    fetchResultForSymptoms,
  };
}