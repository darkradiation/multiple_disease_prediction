import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import predictLiver from "../services/apiLiver";

export function usePredictLiver() {
  const {
    mutate: predictLiverMutation,
    isLoading: isPredicting,
    data: response,
  } = useMutation({
    mutationFn: predictLiver,
    onSuccess: (data) => {
      toast.success("Prediction successful");
      console.log("Prediction successful:", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { predictLiver: predictLiverMutation, isPredicting, response };
}
