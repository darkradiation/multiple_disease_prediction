import { useMutation } from "@tanstack/react-query";
import { predictLungCancer } from "../services/apiLungCancer";

export function usePredictLungCancer() {
  const {
    mutate: predictLungCancerMutation,
    isLoading: isPredicting,
    data: response,
  } = useMutation({
    mutationFn: predictLungCancer,
    onSuccess: (data) => {
      console.log("Prediction successful:", data);
    },
    onError: (error) => {
      console.error("Prediction failed:", error);
    },
  });

  return {
    predictLungCancer: predictLungCancerMutation,
    isPredicting,
    response,
  };
}
