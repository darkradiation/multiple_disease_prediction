import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictHepatitis } from "../features/usePredictHepatitis";
import PredictionResult from "../ui/PredictionResult";
import Select from "../ui/Select";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function HepatitisPrediction() {
  const defaultValues = {
    Age: 32,
    Sex: 1,
    ALB: 4.0,
    ALP: 69,
    ALT: 27,
    AST: 59,
    BIL: 1.0,
    CHE: 6.5,
    CHOL: 5.3,
    CREA: 0.9,
    GGT: 22,
    PROT: 74,
  };

  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const { predictHepatitis, isPredicting, response } = usePredictHepatitis();

  function onSubmit(formData) {
    const symptoms = {
      Age: parseFloat(formData.Age),
      Sex: parseFloat(formData.Sex),
      ALB: parseFloat(formData.ALB),
      ALP: parseFloat(formData.ALP),
      ALT: parseFloat(formData.ALT),
      AST: parseFloat(formData.AST),
      BIL: parseFloat(formData.BIL),
      CHE: parseFloat(formData.CHE),
      CHOL: parseFloat(formData.CHOL),
      CREA: parseFloat(formData.CREA),
      GGT: parseFloat(formData.GGT),
      PROT: parseFloat(formData.PROT),
    };

    predictHepatitis(symptoms, {
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
        <Heading as="h1">Hepatitis Disease Prediction</Heading>
      </Row>
      <Row type="horizontal">
        {/* <StyledImage src="/hepatitis 1.jpg" alt="Hepatitis Image" /> */}
        <StyledImage src="/hepatitis 2.jpg" alt="Hepatitis Image" />
      </Row>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormHeader>Enter the following values</FormHeader>

        <InputBox label="Age" error={errors?.Age?.message}>
          <Input
            type="text"
            id="Age"
            {...register("Age", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Gender" error={errors?.Sex?.message}>
          <Select
            id="Sex"
            {...register("Sex", { required: "This field is required" })}
          >
            <option value="1">Male</option>
            <option value="0">Female</option>
          </Select>
        </InputBox>

        <InputBox label="Albumin (ALB)" error={errors?.ALB?.message}>
          <Input
            type="text"
            id="ALB"
            {...register("ALB", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Alkaline Phosphatase (ALP)"
          error={errors?.ALP?.message}
        >
          <Input
            type="text"
            id="ALP"
            {...register("ALP", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Alanine Aminotransferase (ALT)"
          error={errors?.ALT?.message}
        >
          <Input
            type="text"
            id="ALT"
            {...register("ALT", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Aspartate Aminotransferase (AST)"
          error={errors?.AST?.message}
        >
          <Input
            type="text"
            id="AST"
            {...register("AST", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Bilirubin (BIL)" error={errors?.BIL?.message}>
          <Input
            type="text"
            id="BIL"
            {...register("BIL", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Cholinesterase (CHE)" error={errors?.CHE?.message}>
          <Input
            type="text"
            id="CHE"
            {...register("CHE", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Cholesterol (CHOL)" error={errors?.CHOL?.message}>
          <Input
            type="text"
            id="CHOL"
            {...register("CHOL", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Creatinine (CREA)" error={errors?.CREA?.message}>
          <Input
            type="text"
            id="CREA"
            {...register("CREA", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Gamma-Glutamyl Transferase"
          error={errors?.GGT?.message}
        >
          <Input
            type="text"
            id="GGT"
            {...register("GGT", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Proteins (PROT)" error={errors?.PROT?.message}>
          <Input
            type="text"
            id="PROT"
            {...register("PROT", { required: "This field is required" })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {!isPredicting && response && (
        <PredictionResult result={response.result} check="Hepatitis" />
      )}
    </>
  );
}

export default HepatitisPrediction;
