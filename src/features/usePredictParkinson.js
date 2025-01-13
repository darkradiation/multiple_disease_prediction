import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import predictParkinson from "../services/apiParkinson";

export function usePredictParkinson() {
  const {
    mutate: predictParkinsonMutation,
    isLoading: isPredicting,
    data: response,
  } = useMutation({
    mutationFn: predictParkinson,
    onSuccess: (data) => {
      toast.success("Prediction successful");
      console.log("Prediction successful:", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { predictParkinson: predictParkinsonMutation, isPredicting, response };
}
