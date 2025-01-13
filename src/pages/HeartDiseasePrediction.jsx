import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictHeart } from "../features/usePredictHeart";
import PredictionResult from "../ui/PredictionResult";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function HeartPrediction() {
  const defaultValues = {
    age: 50,
    sex: 1,
    cp: 1,
    trestbps: 120,
    chol: 200,
    fbs: 0,
    restecg: 0,
    thalach: 150,
    exang: 0,
    oldpeak: 1.0,
    slope: 1,
    ca: 0,
    thal: 1,
  };

  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const { predictHeart, isPredicting, response } = usePredictHeart();

  function onSubmit(formData) {
    const symptoms = {
      age: parseFloat(formData.age),
      sex: parseFloat(formData.sex),
      cp: parseFloat(formData.cp),
      trestbps: parseFloat(formData.trestbps),
      chol: parseFloat(formData.chol),
      fbs: parseFloat(formData.fbs),
      restecg: parseFloat(formData.restecg),
      thalach: parseFloat(formData.thalach),
      exang: parseFloat(formData.exang),
      oldpeak: parseFloat(formData.oldpeak),
      slope: parseFloat(formData.slope),
      ca: parseFloat(formData.ca),
      thal: parseFloat(formData.thal),
    };

    predictHeart(symptoms, {
      onSuccess: () => {
        // Optionally reset the form or show a success message
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Heart Disease Prediction</Heading>
      </Row>
      <Row type="horizontal">
        <StyledImage src="/heart.jpg" alt="Heart Disease Image" />
      </Row>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormHeader>Enter the following values</FormHeader>

        <InputBox label="Age" error={errors?.age?.message}>
          <Input
            type="number"
            id="age"
            {...register("age", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Sex (1=male,0=female)" error={errors?.sex?.message}>
          <Input
            type="number"
            id="sex"
            {...register("sex", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Chest Pain Type (1,2,3,4)" error={errors?.cp?.message}>
          <Input
            type="number"
            id="cp"
            {...register("cp", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Resting Blood Pressure"
          error={errors?.trestbps?.message}
        >
          <Input
            type="number"
            id="trestbps"
            {...register("trestbps", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Serum Cholesterol" error={errors?.chol?.message}>
          <Input
            type="number"
            id="chol"
            {...register("chol", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Maximum Heart Rate Achieved"
          error={errors?.thalach?.message}
        >
          <Input
            type="number"
            id="thalach"
            {...register("thalach", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Fasting Blood Sugar (>120mg/dl ? 1 : else 0)"
          error={errors?.fbs?.message}
        >
          <Input
            type="number"
            id="fbs"
            {...register("fbs", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Resting Electrocardiographic Results (0,1,2)"
          error={errors?.restecg?.message}
        >
          <Input
            type="number"
            id="restecg"
            {...register("restecg", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Exercise-Induced Angina (1=yes,0=no)"
          error={errors?.exang?.message}
        >
          <Input
            type="number"
            id="exang"
            {...register("exang", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Slope of the Peak Exercise ST Segment (1,2,3)"
          error={errors?.slope?.message}
        >
          <Input
            type="number"
            id="slope"
            {...register("slope", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Number of Major Vessels Colored by Fluoroscopy (0-3)"
          error={errors?.ca?.message}
        >
          <Input
            type="number"
            id="ca"
            {...register("ca", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Thalassemia (1=normal,2=fixed defect,3=reversible defect)"
          error={errors?.thal?.message}
        >
          <Input
            type="number"
            id="thal"
            {...register("thal", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="ST Depression Induced by Exercise"
          error={errors?.oldpeak?.message}
        >
          <Input
            type="number"
            id="oldpeak"
            {...register("oldpeak", { required: "This field is required" })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {!isPredicting && response && (
        <PredictionResult result={response.result} check="Heart Disease" />
      )}
    </>
  );
}

export default HeartPrediction;
