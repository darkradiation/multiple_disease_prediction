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
import Select from "../ui/Select";

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

    console.log(symptoms);
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
        {/* <StyledImage src="/heart 1.jpeg" alt="Heart Disease Image" /> */}
        <StyledImage src="/heart 2.webp" alt="Heart Disease Image" />
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

        <InputBox label="Gender" error={errors?.sex?.message}>
          <Select
            id="sex"
            {...register("sex", { required: "This field is required" })}
          >
            <option value="1">Male</option>
            <option value="0">Female</option>
          </Select>
        </InputBox>

        <InputBox label="Chest Pain Type" error={errors?.cp?.message}>
          <Select
            id="cp"
            {...register("cp", { required: "This field is required" })}
          >
            <option value="1">typical angina</option>
            <option value="2">atypical angina</option>
            <option value="3">non-anginal</option>
            <option value="4">asymptomatic</option>
          </Select>
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

        <InputBox label="Fasting Blood Sugar" error={errors?.fbs?.message}>
          <Select
            id="fbs"
            {...register("fbs", { required: "This field is required" })}
          >
            <option value="1">greater than 120mg/dl</option>
            <option value="0">less than 120mg/dl</option>
          </Select>
        </InputBox>

        <InputBox label="Resting ECG levels" error={errors?.restecg?.message}>
          <Select
            id="restecg"
            {...register("restecg", { required: "This field is required" })}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
          </Select>
        </InputBox>

        <InputBox label="Thalach Levels" error={errors?.thalach?.message}>
          <Input
            type="number"
            id="thalach"
            {...register("thalach", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Exercise-Induced Angina"
          error={errors?.exang?.message}
        >
          <Select
            id="exang"
            {...register("exang", { required: "This field is required" })}
          >
            <option value="1">Yes</option>
            <option value="0">No</option>
          </Select>
        </InputBox>

        <InputBox label="Old Peak History" error={errors?.oldpeak?.message}>
          <Input
            type="number"
            id="oldpeak"
            {...register("oldpeak", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Slope of the Peak " error={errors?.slope?.message}>
          <Select
            id="slope"
            {...register("slope", { required: "This field is required" })}
          >
            <option value="1">Up-sloping</option>
            <option value="2">Flat</option>
            <option value="3">Down-sloping</option>
          </Select>
        </InputBox>

        <InputBox label="Thalassemia " error={errors?.thal?.message}>
          <Select
            id="thal"
            {...register("thal", { required: "This field is required" })}
          >
            <option value="1">Normal</option>
            <option value="2">Fixed Defect</option>
            <option value="3">Reversible Defect</option>
          </Select>
        </InputBox>

        <InputBox
          label="Number of Major Vessels Colored by Fluoroscopy"
          error={errors?.ca?.message}
        >
          <Select
            id="ca"
            {...register("ca", { required: "This field is required" })}
          >
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </Select>
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
