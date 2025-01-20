import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictChronicKidney } from "../features/usePredictChronicKidney";
import PredictionResult from "../ui/PredictionResult";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function ChronicKidneyPrediction() {
  const defaultValues = {
    Bp: 80,
    Sg: 1.02,
    Al: 1,
    Su: 0,
    Rbc: 1,
    Bu: 44,
    Sc: 1.2,
    Sod: 138,
    Pot: 4.6,
    Hemo: 15.4,
    Wbcc: 7800,
    Rbcc: 5.2,
    Htn: 0,
  };

  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const { predictChronicKidney, isPredicting, response } =
    usePredictChronicKidney();

  function onSubmit(formData) {
    const symptoms = {
      Bp: parseFloat(formData.Bp),
      Sg: parseFloat(formData.Sg),
      Al: parseFloat(formData.Al),
      Su: parseFloat(formData.Su),
      Rbc: parseFloat(formData.Rbc),
      Bu: parseFloat(formData.Bu),
      Sc: parseFloat(formData.Sc),
      Sod: parseFloat(formData.Sod),
      Pot: parseFloat(formData.Pot),
      Hemo: parseFloat(formData.Hemo),
      Wbcc: parseFloat(formData.Wbcc),
      Rbcc: parseFloat(formData.Rbcc),
      Htn: parseFloat(formData.Htn),
    };

    console.log(symptoms);
    predictChronicKidney(symptoms, {
      onSuccess: () => {
        // Optionally reset the form or perform other actions
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Chronic Kidney Disease Prediction</Heading>
      </Row>
      <Row type="horizontal">
        <StyledImage src="/kidney 2.jpg" alt="Chronic Kidney Image" />
      </Row>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormHeader>Enter the following values</FormHeader>
        <InputBox label="Blood Pressure" error={errors?.Bp?.message}>
          <Input
            type="text"
            id="Bp"
            {...register("Bp", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Specific Gravity" error={errors?.Sg?.message}>
          <Input
            type="text"
            id="Sg"
            {...register("Sg", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Albumin" error={errors?.Al?.message}>
          <Input
            type="text"
            id="Al"
            {...register("Al", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Sugar" error={errors?.Su?.message}>
          <Input
            type="text"
            id="Su"
            {...register("Su", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Red Blood Cells" error={errors?.Rbc?.message}>
          <Input
            type="text"
            id="Rbc"
            {...register("Rbc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Blood Urea" error={errors?.Bu?.message}>
          <Input
            type="text"
            id="Bu"
            {...register("Bu", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Serum Creatinine" error={errors?.Sc?.message}>
          <Input
            type="text"
            id="Sc"
            {...register("Sc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Sodium" error={errors?.Sod?.message}>
          <Input
            type="text"
            id="Sod"
            {...register("Sod", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Potassium" error={errors?.Pot?.message}>
          <Input
            type="text"
            id="Pot"
            {...register("Pot", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Hemoglobin" error={errors?.Hemo?.message}>
          <Input
            type="text"
            id="Hemo"
            {...register("Hemo", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="White Blood Cell Count" error={errors?.Wbcc?.message}>
          <Input
            type="text"
            id="Wbcc"
            {...register("Wbcc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Red Blood Cell Count" error={errors?.Rbcc?.message}>
          <Input
            type="text"
            id="Rbcc"
            {...register("Rbcc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Hypertension" error={errors?.Htn?.message}>
          <Input
            type="text"
            id="Htn"
            {...register("Htn", { required: "This field is required" })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {!isPredicting && response && (
        <PredictionResult
          result={response.result}
          check="Chronic Kidney Disease"
        />
      )}
    </>
  );
}

export default ChronicKidneyPrediction;
