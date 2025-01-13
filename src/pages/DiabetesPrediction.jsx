import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictDiabetes } from "../features/usePredictDiabetes";
import PredictionResult from "../ui/PredictionResult";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function DiabetesPrediction() {
  // Define default values for the form
  const defaultValues = {
    no_of_pregnancies: 0,
    glucose_level: 100,
    blood_pressure_value: 70,
    skinthickness_value: 20,
    insulin_value: 75,
    bmi_value: 25,
    diabetespedigreefunction_value: 0.5,
    age: 30,
  };

  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues, // Pass default values to useForm
  });
  const { errors } = formState;

  const { predictDiabetes, isPredicting, response } = usePredictDiabetes();

  // Handle form submission
  function onSubmit(formData) {
    const symptoms = {
      pregnancies: parseFloat(formData.no_of_pregnancies),
      glucose: parseFloat(formData.glucose_level),
      bloodPressure: parseFloat(formData.blood_pressure_value),
      skinThickness: parseFloat(formData.skinthickness_value),
      insulin: parseFloat(formData.insulin_value),
      bmi: parseFloat(formData.bmi_value),
      diabetesPedigreeFunction: parseFloat(
        formData.diabetespedigreefunction_value
      ),
      age: parseFloat(formData.age),
    };

    // Call the predictDiabetes function to send data to the API
    predictDiabetes(symptoms, {
      onSuccess: () => {
        // reset(); // Reset the form to default values after submission
      },
    });
  }

  function onError(errors) {
    console.log(errors);
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Diabetes Disease Prediction</Heading>
      </Row>
      <Row type="horizontal">
        <StyledImage src="/diabetes.jpg" alt="Diabetes Image" />
      </Row>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormHeader>Enter the following values</FormHeader>
        <InputBox
          label="Number of pregnancies"
          error={errors?.no_of_pregnancies?.message}
        >
          <Input
            type="number"
            id="no_of_pregnancies"
            {...register("no_of_pregnancies", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Glucose level" error={errors?.glucose_level?.message}>
          <Input
            type="text"
            id="glucose_level"
            {...register("glucose_level", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Blood pressure value"
          error={errors?.blood_pressure_value?.message}
        >
          <Input
            type="text"
            id="blood_pressure_value"
            {...register("blood_pressure_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Skinthickness value"
          error={errors?.skinthickness_value?.message}
        >
          <Input
            type="text"
            id="skinthickness_value"
            {...register("skinthickness_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Insulin value" error={errors?.insulin_value?.message}>
          <Input
            type="text"
            id="insulin_value"
            {...register("insulin_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="BMI value" error={errors?.bmi_value?.message}>
          <Input
            type="text"
            id="bmi_value"
            {...register("bmi_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Diabetespedigreefunction value"
          error={errors?.diabetespedigreefunction_value?.message}
        >
          <Input
            type="text"
            id="diabetespedigreefunction_value"
            {...register("diabetespedigreefunction_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Age" error={errors?.age?.message}>
          <Input
            type="number"
            id="age"
            {...register("age", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {!isPredicting && response && (
        <PredictionResult result={response.result} check="Diabetic" />
      )}
    </>
  );
}

export default DiabetesPrediction;
