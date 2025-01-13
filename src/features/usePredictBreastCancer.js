import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import predictBreastCancer from "../services/apiBreastCancer";

export function usePredictBreastCancer() {
  const {
    mutate: predictBreastCancerMutation,
    isLoading: isPredicting,
    data: response,
  } = useMutation({
    mutationFn: predictBreastCancer,
    onSuccess: (data) => {
      toast.success("Prediction successful");
      console.log("Prediction successful:", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return {
    predictBreastCancer: predictBreastCancerMutation,
    isPredicting,
    response,
  };
}
