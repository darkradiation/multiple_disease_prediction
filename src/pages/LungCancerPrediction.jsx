import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import Select from "../ui/Select";
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
  gender: "male",
  age: "50",
  smoking: "yes",
  yellow_fingers: "no",
  anxiety: "no",
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
      Gender: formData.gender === "male" ? 1 : 0,
      Age: parseInt(formData.age, 10),
      Smoking: formData.smoking === "yes" ? 1 : 0,
      Yellow_Fingers: formData.yellow_fingers === "yes" ? 1 : 0,
      Anxiety: formData.anxiety === "yes" ? 1 : 0,
      Peer_Pressure: formData.peer_pressure === "yes" ? 1 : 0,
      Chronic_Disease: formData.chronic_lung_disease === "yes" ? 1 : 0,
      Fatigue: formData.fatigue === "yes" ? 1 : 0,
      Allergy: formData.allergy === "yes" ? 1 : 0,
      Wheezing: formData.wheezing === "yes" ? 1 : 0,
      Alcohol_Consuming: formData.alcohol_consuming === "yes" ? 1 : 0,
      Coughing: formData.coughing === "yes" ? 1 : 0,
      Shortness_Of_Breath: formData.shortness_of_breath === "yes" ? 1 : 0,
      Swallowing_Difficulty: formData.swallowing_difficulty === "yes" ? 1 : 0,
      Chest_Pain: formData.chest_pain === "yes" ? 1 : 0,
    };

    console.log(symptoms);
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
        <StyledImage src="/lung 2.jpg" alt="Lung Cancer Image" />
      </Row>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>Enter the following values</FormHeader>

        <InputBox label="Gender" error={errors.gender?.message}>
          <Select
            id="gender"
            {...register("gender", { required: "This field is required" })}
          >
            <option value="male">Male</option>
            <option value="female">Female</option>
          </Select>
        </InputBox>

        <InputBox label="Age" error={errors.age?.message}>
          <Input
            type="number"
            id="age"
            {...register("age", {
              required: "This field is required",
              validate: (value) => !isNaN(value) || "Age must be a number",
            })}
          />
        </InputBox>

        <InputBox label="Smoking (yes/no)" error={errors.smoking?.message}>
          <Select
            id="smoking"
            {...register("smoking", { required: "This field is required" })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox
          label="Yellow Fingers (yes/no)"
          error={errors.yellow_fingers?.message}
        >
          <Select
            id="yellow_fingers"
            {...register("yellow_fingers", {
              required: "This field is required",
            })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox label="Anxiety (yes/no)" error={errors.anxiety?.message}>
          <Select
            id="anxiety"
            {...register("anxiety", { required: "This field is required" })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox
          label="Peer Pressure (yes/no)"
          error={errors.peer_pressure?.message}
        >
          <Select
            id="peer_pressure"
            {...register("peer_pressure", {
              required: "This field is required",
            })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox
          label="Chronic Lung Disease (yes/no)"
          error={errors.chronic_lung_disease?.message}
        >
          <Select
            id="chronic_lung_disease"
            {...register("chronic_lung_disease", {
              required: "This field is required",
            })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox label="Fatigue (yes/no)" error={errors.fatigue?.message}>
          <Select
            id="fatigue"
            {...register("fatigue", { required: "This field is required" })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox label="Allergy (yes/no)" error={errors.allergy?.message}>
          <Select
            id="allergy"
            {...register("allergy", { required: "This field is required" })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox label="Wheezing (yes/no)" error={errors.wheezing?.message}>
          <Select
            id="wheezing"
            {...register("wheezing", { required: "This field is required" })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox
          label="Alcohol Consuming (yes/no)"
          error={errors.alcohol_consuming?.message}
        >
          <Select
            id="alcohol_consuming"
            {...register("alcohol_consuming", {
              required: "This field is required",
            })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox label="Coughing (yes/no)" error={errors.coughing?.message}>
          <Select
            id="coughing"
            {...register("coughing", { required: "This field is required" })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox
          label="Shortness of Breath (yes/no)"
          error={errors.shortness_of_breath?.message}
        >
          <Select
            id="shortness_of_breath"
            {...register("shortness_of_breath", {
              required: "This field is required",
            })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox
          label="Swallowing Difficulty (yes/no)"
          error={errors.swallowing_difficulty?.message}
        >
          <Select
            id="swallowing_difficulty"
            {...register("swallowing_difficulty", {
              required: "This field is required",
            })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
        </InputBox>

        <InputBox
          label="Chest Pain (yes/no)"
          error={errors.chest_pain?.message}
        >
          <Select
            id="chest_pain"
            {...register("chest_pain", { required: "This field is required" })}
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </Select>
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
