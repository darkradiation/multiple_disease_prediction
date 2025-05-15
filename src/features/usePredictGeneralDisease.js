import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { predictGeneralDisease as predictGeneralDiseaseService } from "../services/apiGeneralDisease";

export function usePredictGeneralDisease() {
  const {
    mutate: predictGeneralDiseaseMutation, // Renaming mutate function for clarity
    isLoading: isPredicting,
    data: response, // This will hold the API response { result: "..." }
    error, // To access error details if needed
    reset, // Function to reset mutation state
  } = useMutation({
    mutationFn: predictGeneralDiseaseService, // Pass the service function
    onSuccess: (data) => {
      // data here is what predictGeneralDiseaseService returns: { result: "Disease Name" }
      toast.success(
        `Prediction successful: ${data.result || "Unknown disease"}` // Access data.result
      );
      console.log("General disease prediction successful:", data);
    },
    onError: (err) => {
      // err.message should contain the error from the API or network
      toast.error(err.message || "Prediction failed. Please try again.");
      console.error("General disease prediction error:", err);
    },
  });

  return {
    predictGeneralDisease: predictGeneralDiseaseMutation,
    isPredicting,
    response, // This will contain { result: "..." } upon success
    error,
    resetMutation: reset,
  };
}
