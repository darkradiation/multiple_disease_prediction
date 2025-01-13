import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import predictHeart from "../services/apiHeart";

export function usePredictHeart() {
  const {
    mutate: predictHeartMutation,
    isLoading: isPredicting,
    data: response,
  } = useMutation({
    mutationFn: predictHeart,
    onSuccess: (data) => {
      toast.success("Prediction successful");
      console.log("Prediction successful:", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { predictHeart: predictHeartMutation, isPredicting, response };
}
