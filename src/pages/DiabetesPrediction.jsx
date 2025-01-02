import styled from "styled-components";
import { useForm } from "react-hook-form";

import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function DiabetesPrediction() {
  const { register, handleSubmit, reset, formState } = useForm();
  const { errors } = formState;

  function onSubmit(data) {
    console.log(data);
  }
  function onError(errors) {
    console.log(errors);
  }
  // function handleCloseForm() {
  //   onCloseModal();
  // }

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
            type="text"
            id="no_of_pregnancies"
            // disabled={}
            {...register("no_of_pregnancies", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Glucose level" error={errors?.glucose_level?.message}>
          <Input
            type="text"
            id="glucose_level"
            // disabled={}
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
            // disabled={}
            {...register("blood_pressure_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Scckinthickness value"
          error={errors?.scckinthickness_value?.message}
        >
          <Input
            type="text"
            id="scckinthickness_value"
            // disabled={}
            {...register("scckinthickness_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Insulin value" error={errors?.insulin_value?.message}>
          <Input
            type="text"
            id="insulin_value"
            // disabled={}
            {...register("insulin_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="BMI value" error={errors?.bmi_value?.message}>
          <Input
            type="text"
            id="bmi_value"
            // disabled={}
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
            // disabled={}
            {...register("diabetespedigreefunction_value", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Age" error={errors?.age?.message}>
          <Input
            type="text"
            id="age"
            // disabled={}
            {...register("age", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <Button>See Results</Button>
      </Form>
    </>
  );
}
export default DiabetesPrediction;
