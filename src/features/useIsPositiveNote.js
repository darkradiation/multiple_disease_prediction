import { useState, useEffect, useCallback } from "react";
import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";
import { toast } from "react-hot-toast";

const API_KEY = "AIzaSyB24hoqud5aygF3Qrn7-QmA9RAsA2yneno"; // REPLACE THIS OR USE ENV VARIABLE

const genAI = new GoogleGenerativeAI(API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.0-flash",
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
    // candidateCount: 1, // default
    // stopSequences: ['...'],
    // maxOutputTokens: 200,
    temperature: 0.7,
  },
});

export function useIsPositiveNote() {
  const [advice, setAdvice] = useState({ about: "", dos: [], donts: [] });
  const [isFetchingAdvice, setIsFetchingAdvice] = useState(false);
  const [adviceError, setAdviceError] = useState(null);

  const fetchAdviceForDisease = useCallback(async (diseaseName) => {
    if (!diseaseName || diseaseName.trim() === "") {
      setAdvice({ dos: [], donts: [] });
      setAdviceError(null);
 setIsFetchingAdvice(false);
      return;
    }

    if (!API_KEY || API_KEY !== "AIzaSyB24hoqud5aygF3Qrn7-QmA9RAsA2yneno") {
      toast.error("Google API Key not configured for fetching advice.");
      setAdviceError("API Key not configured.");
      setAdvice({
        // Provide a fallback
 about: "",
        dos: ["Consult your doctor for specific advice."],
        donts: ["Avoid self-diagnosing or self-medicating."],
      });
      setIsFetchingAdvice(false);
      return;
    }

    setIsFetchingAdvice(true);
    setAdviceError(null);
    setAdvice({ dos: [], donts: [] }); // Reset previous advice
    const prompt =
 `Provide a short 2-line description (under the key "about"), 2 important 'Do's' (under the key "dos"), and 2 important 'Don'ts' (under the key "donts") for managing or dealing with ${diseaseName}. ` +
 `Format the response strictly as a JSON object with three keys: "about" (a string), "dos" (a list of 2 strings), and "donts" (a list of 2 strings). ` +
 `Example: {"about": "This is a description\\nline 2.", "dos": ["Do this...", "Do that..."], "donts": ["Don't do this...", "Don't do that..."]}`;


 // console.log("Sending prompt:", prompt);
    try {
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      // Attempt to parse the Gemini response as JSON
      // It might contain ```json ... ``` markdown, try to extract it
      let adviceJsonStr = responseText;
      const jsonMatch = responseText.match(/```json\s*([\s\S]*?)\s*```/);
      if (jsonMatch && jsonMatch[1]) {
        adviceJsonStr = jsonMatch[1];
      }

      try {
        const parsedAdvice = JSON.parse(adviceJsonStr);
        if (
          parsedAdvice &&
 typeof parsedAdvice.about === "string" &&
          Array.isArray(parsedAdvice.dos) &&
          Array.isArray(parsedAdvice.donts) &&
          parsedAdvice.dos.length > 0 &&
          parsedAdvice.donts.length > 0
        ) {
          setAdvice(parsedAdvice);
        } else {
          throw new Error("Parsed advice is not in the expected format.");
        }
      } catch (parseError) {
        console.error(
          "Error parsing Gemini response:",
          parseError,
          "\nRaw response:",
          responseText
        );
        setAdviceError(
          "Advice received from AI is not in the expected format."

        );
        // Set a generic fallback
        setAdvice({
          dos: [
            "Consult your doctor for specific advice regarding " +
              diseaseName +
              ".",
 ],
 about: "Information about " + diseaseName + " could not be loaded.",
          donts: ["Avoid self-medicating without professional guidance."],
        });
      }
    } catch (error) {
      console.error("Error fetching Do's and Don'ts from Gemini:", error);
      // Check for specific API errors if possible (e.g., from error.response)
      const message = error.message || "Could not load advice from AI.";
      setAdviceError(message);
      toast.error(`Failed to get advice: ${message}`);
      // Set a generic fallback

      setAdvice({
        dos: ["Consult your doctor for specific advice."],
        donts: ["Avoid self-medicating without professional guidance."],
      });
    } finally {
      setIsFetchingAdvice(false);
    }
  }, []); // Empty dependency array means this function is stable and doesn't change

  return { advice, isFetchingAdvice, adviceError, fetchAdviceForDisease };
}
