import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast"; // Or your preferred toast library
import predictGeneralDisease from "../services/apiGeneralDisease"; 

export function usePredictGeneralDisease() {
  const {
    mutate: predictGeneralDiseaseMutation, // Renaming mutate function for clarity
    isLoading: isPredicting,
    data: response, // This will hold the API response { predicted_disease: "..." }
    error, // To access error details if needed
    reset, // Function to reset mutation state
  } = useMutation({
    mutationFn: predictGeneralDisease, // Pass the service function
    onSuccess: (data) => {
      toast.success(
        `Prediction successful: ${data.predicted_disease || "Unknown"}`
      );
      console.log("General disease prediction successful:", data);
    },
    onError: (err) => {
      // err.message should contain the error from the API or network
      toast.error(err.message || "Prediction failed. Please try again.");
      console.error("General disease prediction error:", err);
    },
  });

  return { predictGeneralDisease:predictGeneralDiseaseMutation, isPredicting, response, error, resetMutation: reset };
}