import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictLungCancer } from "../features/usePredictLungCancer";
import PredictionResult from "../ui/PredictionResult";
import { toast } from "react-hot-toast";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

const defaultValues = {
  age: "50",
  smoking: "yes",
  yellow_fingers: "no",
  anxiety: "sometimes",
  peer_pressure: "no",
  chronic_lung_disease: "no",
  fatigue: "no",
  allergy: "no",
  wheezing: "no",
  alcohol_consuming: "no",
  coughing: "no",
  shortness_of_breath: "no",
  swallowing_difficulty: "no",
  chest_pain: "no",
};

function LungCancerPrediction() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const { predictLungCancer, isPredicting, response } = usePredictLungCancer();

  function onSubmit(formData) {
    const symptoms = {
      GENDER: formData.gender,
      AGE: formData.age,
      SMOKING: formData.smoking,
      YELLOW_FINGERS: formData.yellow_fingers,
      ANXIETY: formData.anxiety,
      PEER_PRESSURE: formData.peer_pressure,
      CHRONICDISEASE: formData.chronic_lung_disease,
      FATIGUE: formData.fatigue,
      ALLERGY: formData.allergy,
      WHEEZING: formData.wheezing,
      ALCOHOLCONSUMING: formData.alcohol_consuming,
      COUGHING: formData.coughing,
      SHORTNESSOFBREATH: formData.shortness_of_breath,
      SWALLOWINGDIFFICULTY: formData.swallowing_difficulty,
      CHESTPAIN: formData.chest_pain,
    };

    predictLungCancer(symptoms, {
      onSuccess: () => {
        toast.success("Prediction successful");
      },
      onError: (error) => {
        toast.error("Prediction failed. Please try again.");
      },
    });
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Lung Cancer Prediction</Heading>
      </Row>
      <Row type="horizontal">
        {/* <StyledImage src="/lung 1.jpg" alt="Lung Cancer Image" /> */}
        <StyledImage src="/lung 2.jpg" alt="Lung Cancer Image" />
        {/* <StyledImage src="/lung 3.jpg" alt="Lung Cancer Image" /> */}
      </Row>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>Enter the following values</FormHeader>

        <InputBox label="Age" error={errors.age?.message}>
          <Input
            type="text"
            id="age"
            {...register("age", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Smoking (yes/no)" error={errors.smoking?.message}>
          <Input
            type="text"
            id="smoking"
            {...register("smoking", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Yellow Fingers (yes/no)"
          error={errors.yellow_fingers?.message}
        >
          <Input
            type="text"
            id="yellow_fingers"
            {...register("yellow_fingers", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Anxiety (sometimes/often/none)"
          error={errors.anxiety?.message}
        >
          <Input
            type="text"
            id="anxiety"
            {...register("anxiety", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Peer Pressure (yes/no)"
          error={errors.peer_pressure?.message}
        >
          <Input
            type="text"
            id="peer_pressure"
            {...register("peer_pressure", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Chronic Lung Disease (yes/no)"
          error={errors.chronic_lung_disease?.message}
        >
          <Input
            type="text"
            id="chronic_lung_disease"
            {...register("chronic_lung_disease", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Fatigue (yes/no)" error={errors.fatigue?.message}>
          <Input
            type="text"
            id="fatigue"
            {...register("fatigue", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Allergy (yes/no)" error={errors.allergy?.message}>
          <Input
            type="text"
            id="allergy"
            {...register("allergy", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Wheezing (yes/no)" error={errors.wheezing?.message}>
          <Input
            type="text"
            id="wheezing"
            {...register("wheezing", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Alcohol Consuming (yes/no)"
          error={errors.alcohol_consuming?.message}
        >
          <Input
            type="text"
            id="alcohol_consuming"
            {...register("alcohol_consuming", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Coughing (yes/no)" error={errors.coughing?.message}>
          <Input
            type="text"
            id="coughing"
            {...register("coughing", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Shortness of Breath (yes/no)"
          error={errors.shortness_of_breath?.message}
        >
          <Input
            type="text"
            id="shortness_of_breath"
            {...register("shortness_of_breath", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Swallowing Difficulty (yes/no)"
          error={errors.swallowing_difficulty?.message}
        >
          <Input
            type="text"
            id="swallowing_difficulty"
            {...register("swallowing_difficulty", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Chest Pain (yes/no)"
          error={errors.chest_pain?.message}
        >
          <Input
            type="text"
            id="chest_pain"
            {...register("chest_pain", { required: "This field is required" })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {isPredicting && <p>Loading...</p>}
      {!isPredicting && response && (
        <PredictionResult result={response.result} check="Lung Cancer" />
      )}
    </>
  );
}

export default LungCancerPrediction;
