import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import predictHepatitis from "../services/apiHepatitis";

export function usePredictHepatitis() {
  const {
    mutate: predictHepatitisMutation,
    isLoading: isPredicting,
    data: response,
  } = useMutation({
    mutationFn: predictHepatitis,
    onSuccess: (data) => {
      toast.success("Prediction successful");
      console.log("Prediction successful:", data);
    },
    onError: (err) => toast.error(err.message),
  });

  return { predictHepatitis: predictHepatitisMutation, isPredicting, response };
}
