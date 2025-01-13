import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import predictDiabetes from "../services/apiDiabetes";

export function usePredictDiabetes() {
  const {
    mutate: predictDiabetesMutation,
    isLoading: isPredicting,
    data: response,
  } = useMutation({
    mutationFn: predictDiabetes,
    onSuccess: (data) => {
      toast.success("Prediction successful");
      console.log("Prediction successful:", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { predictDiabetes: predictDiabetesMutation, isPredicting, response };
}
