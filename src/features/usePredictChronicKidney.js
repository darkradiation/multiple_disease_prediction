import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import predictChronicKidney from "../services/apiChronicKidney";

export function usePredictChronicKidney() {
  const {
    mutate: predictChronicKidneyMutation,
    isLoading: isPredicting,
    data: response,
  } = useMutation({
    mutationFn: predictChronicKidney,
    onSuccess: (data) => {
      toast.success("Prediction successful");
      console.log("Prediction successful:", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    predictChronicKidney: predictChronicKidneyMutation,
    isPredicting,
    response,
  };
}
