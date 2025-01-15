import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictLiver } from "../features/usePredictLiver";
import PredictionResult from "../ui/PredictionResult";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function LiverPrediction() {
  const defaultValues = {
    sex: 1,
    age: 65,
    total_bilirubin: 0.7,
    direct_bilirubin: 0.1,
    alkaline_phosphatase: 187,
    alamine_aminotransferase: 16,
    aspartate_aminotransferase: 18,
    total_proteins: 6.8,
    albumin: 3.3,
    albumin_globulin_ratio: 0.9,
  };

  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const { predictLiver, isPredicting, response } = usePredictLiver();

  function onSubmit(formData) {
    const symptoms = {
      Sex: parseFloat(formData.sex),
      age: parseFloat(formData.age),
      Total_Bilirubin: parseFloat(formData.total_bilirubin),
      Direct_Bilirubin: parseFloat(formData.direct_bilirubin),
      Alkaline_Phosphotase: parseFloat(formData.alkaline_phosphatase),
      Alamine_Aminotransferase: parseFloat(formData.alamine_aminotransferase),
      Aspartate_Aminotransferase: parseFloat(
        formData.aspartate_aminotransferase
      ),
      Total_Protiens: parseFloat(formData.total_proteins),
      Albumin: parseFloat(formData.albumin),
      Albumin_and_Globulin_Ratio: parseFloat(formData.albumin_globulin_ratio),
    };

    predictLiver(symptoms, {
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
        <Heading as="h1">Liver Disease Prediction</Heading>
      </Row>
      <Row type="horizontal">
        <StyledImage src="/liver 2.webp" alt="Liver Image" />
        {/* <StyledImage src="/liver 3.jpg" alt="Liver Image" /> */}
      </Row>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormHeader>Enter the following values</FormHeader>
        <InputBox label="Gender (1=male,0=female)" error={errors?.sex?.message}>
          <Input
            type="number"
            id="sex"
            {...register("sex", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Age" error={errors?.age?.message}>
          <Input
            type="text"
            id="age"
            {...register("age", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Total Bilirubin"
          error={errors?.total_bilirubin?.message}
        >
          <Input
            type="text"
            id="total_bilirubin"
            {...register("total_bilirubin", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Direct Bilirubin"
          error={errors?.direct_bilirubin?.message}
        >
          <Input
            type="text"
            id="direct_bilirubin"
            {...register("direct_bilirubin", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Alkaline Phosphatase"
          error={errors?.alkaline_phosphatase?.message}
        >
          <Input
            type="text"
            id="alkaline_phosphatase"
            {...register("alkaline_phosphatase", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Alamine Aminotransferase"
          error={errors?.alamine_aminotransferase?.message}
        >
          <Input
            type="text"
            id="alamine_aminotransferase"
            {...register("alamine_aminotransferase", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Aspartate Aminotransferase"
          error={errors?.aspartate_aminotransferase?.message}
        >
          <Input
            type="text"
            id="aspartate_aminotransferase"
            {...register("aspartate_aminotransferase", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="Total Proteins"
          error={errors?.total_proteins?.message}
        >
          <Input
            type="text"
            id="total_proteins"
            {...register("total_proteins", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Albumin" error={errors?.albumin?.message}>
          <Input
            type="text"
            id="albumin"
            {...register("albumin", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="Albumin Globulin Ratio"
          error={errors?.albumin_globulin_ratio?.message}
        >
          <Input
            type="text"
            id="albumin_globulin_ratio"
            {...register("albumin_globulin_ratio", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {!isPredicting && response && (
        <PredictionResult result={response.result} check="Liver Disease" />
      )}
    </>
  );
}

export default LiverPrediction;
