import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictBreastCancer } from "../features/usePredictBreastCancer";
import PredictionResult from "../ui/PredictionResult";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function BreastCancerPrediction() {
  const defaultValues = {
    radius_mean: 17.99,
    texture_mean: 10.38,
    perimeter_mean: 122.8,
    area_mean: 1001.0,
    smoothness_mean: 0.1184,
    compactness_mean: 0.2776,
    concavity_mean: 0.3001,
    concave_points_mean: 0.1471,
    symmetry_mean: 0.2419,
    fractal_dimension_mean: 0.07871,
    radius_se: 1.095,
    texture_se: 0.9053,
    perimeter_se: 8.589,
    area_se: 153.4,
    smoothness_se: 0.006399,
    compactness_se: 0.04904,
    concavity_se: 0.05373,
    concave_points_se: 0.01587,
    symmetry_se: 0.03003,
    fractal_dimension_se: 0.006193,
    radius_worst: 25.38,
    texture_worst: 17.33,
    perimeter_worst: 184.6,
    area_worst: 2019.0,
    smoothness_worst: 0.1622,
    compactness_worst: 0.6656,
    concavity_worst: 0.7119,
    concave_points_worst: 0.2654,
    symmetry_worst: 0.4601,
    fractal_dimension_worst: 0.1189,
  };

  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const { predictBreastCancer, isPredicting, response } =
    usePredictBreastCancer();

  function onSubmit(formData) {
    const symptoms = {
      radius_mean: parseFloat(formData.radius_mean),
      texture_mean: parseFloat(formData.texture_mean),
      perimeter_mean: parseFloat(formData.perimeter_mean),
      area_mean: parseFloat(formData.area_mean),
      smoothness_mean: parseFloat(formData.smoothness_mean),
      compactness_mean: parseFloat(formData.compactness_mean),
      concavity_mean: parseFloat(formData.concavity_mean),
      concave_points_mean: parseFloat(formData.concave_points_mean),
      symmetry_mean: parseFloat(formData.symmetry_mean),
      fractal_dimension_mean: parseFloat(formData.fractal_dimension_mean),
      radius_se: parseFloat(formData.radius_se),
      texture_se: parseFloat(formData.texture_se),
      perimeter_se: parseFloat(formData.perimeter_se),
      area_se: parseFloat(formData.area_se),
      smoothness_se: parseFloat(formData.smoothness_se),
      compactness_se: parseFloat(formData.compactness_se),
      concavity_se: parseFloat(formData.concavity_se),
      concave_points_se: parseFloat(formData.concave_points_se),
      symmetry_se: parseFloat(formData.symmetry_se),
      fractal_dimension_se: parseFloat(formData.fractal_dimension_se),
      radius_worst: parseFloat(formData.radius_worst),
      texture_worst: parseFloat(formData.texture_worst),
      perimeter_worst: parseFloat(formData.perimeter_worst),
      area_worst: parseFloat(formData.area_worst),
      smoothness_worst: parseFloat(formData.smoothness_worst),
      compactness_worst: parseFloat(formData.compactness_worst),
      concavity_worst: parseFloat(formData.concavity_worst),
      concave_points_worst: parseFloat(formData.concave_points_worst),
      symmetry_worst: parseFloat(formData.symmetry_worst),
      fractal_dimension_worst: parseFloat(formData.fractal_dimension_worst),
    };

    predictBreastCancer(symptoms, {
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
        <Heading as="h1">Breast Cancer Prediction</Heading>
      </Row>
      <Row type="horizontal">
        <StyledImage src="/breast cancer 1.jpeg" alt="Breast Cancer Image" />
      </Row>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormHeader>Enter the following values</FormHeader>
        {/* Mean Features */}
        {/* <h3>Mean Features</h3> */}
        <InputBox label="Radius Mean" error={errors?.radius_mean?.message}>
          <Input
            type="text"
            id="radius_mean"
            {...register("radius_mean", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Texture Mean" error={errors?.texture_mean?.message}>
          <Input
            type="text"
            id="texture_mean"
            {...register("texture_mean", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Perimeter Mean"
          error={errors?.perimeter_mean?.message}
        >
          <Input
            type="text"
            id="perimeter_mean"
            {...register("perimeter_mean", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox label="Area Mean" error={errors?.area_mean?.message}>
          <Input
            type="text"
            id="area_mean"
            {...register("area_mean", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox
          label="Smoothness Mean"
          error={errors?.smoothness_mean?.message}
        >
          <Input
            type="text"
            id="smoothness_mean"
            {...register("smoothness_mean", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Compactness Mean"
          error={errors?.compactness_mean?.message}
        >
          <Input
            type="text"
            id="compactness_mean"
            {...register("compactness_mean", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Concavity Mean"
          error={errors?.concavity_mean?.message}
        >
          <Input
            type="text"
            id="concavity_mean"
            {...register("concavity_mean", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Concave Points Mean"
          error={errors?.concave_points_mean?.message}
        >
          <Input
            type="text"
            id="concave_points_mean"
            {...register("concave_points_mean", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox label="Symmetry Mean" error={errors?.symmetry_mean?.message}>
          <Input
            type="text"
            id="symmetry_mean"
            {...register("symmetry_mean", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Fractal Dimension Mean"
          error={errors?.fractal_dimension_mean?.message}
        >
          <Input
            type="text"
            id="fractal_dimension_mean"
            {...register("fractal_dimension_mean", {
              required: "This field is required",
            })}
          />
        </InputBox>

        {/* SE Features */}
        {/* <h3>SE Features</h3> */}
        <InputBox label="Radius SE" error={errors?.radius_se?.message}>
          <Input
            type="text"
            id="radius_se"
            {...register("radius_se", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Texture SE" error={errors?.texture_se?.message}>
          <Input
            type="text"
            id="texture_se"
            {...register("texture_se", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Perimeter SE" error={errors?.perimeter_se?.message}>
          <Input
            type="text"
            id="perimeter_se"
            {...register("perimeter_se", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox label="Area SE" error={errors?.area_se?.message}>
          <Input
            type="text"
            id="area_se"
            {...register("area_se", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Smoothness SE" error={errors?.smoothness_se?.message}>
          <Input
            type="text"
            id="smoothness_se"
            {...register("smoothness_se", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Compactness SE"
          error={errors?.compactness_se?.message}
        >
          <Input
            type="text"
            id="compactness_se"
            {...register("compactness_se", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox label="Concavity SE" error={errors?.concavity_se?.message}>
          <Input
            type="text"
            id="concavity_se"
            {...register("concavity_se", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Concave Points SE"
          error={errors?.concave_points_se?.message}
        >
          <Input
            type="text"
            id="concave_points_se"
            {...register("concave_points_se", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox label="Symmetry SE" error={errors?.symmetry_se?.message}>
          <Input
            type="text"
            id="symmetry_se"
            {...register("symmetry_se", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox
          label="Fractal Dimension SE"
          error={errors?.fractal_dimension_se?.message}
        >
          <Input
            type="text"
            id="fractal_dimension_se"
            {...register("fractal_dimension_se", {
              required: "This field is required",
            })}
          />
        </InputBox>

        {/* Worst Features */}
        {/* <h3>Worst Features</h3> */}
        <InputBox label="Radius Worst" error={errors?.radius_worst?.message}>
          <Input
            type="text"
            id="radius_worst"
            {...register("radius_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox label="Texture Worst" error={errors?.texture_worst?.message}>
          <Input
            type="text"
            id="texture_worst"
            {...register("texture_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Perimeter Worst"
          error={errors?.perimeter_worst?.message}
        >
          <Input
            type="text"
            id="perimeter_worst"
            {...register("perimeter_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox label="Area Worst" error={errors?.area_worst?.message}>
          <Input
            type="text"
            id="area_worst"
            {...register("area_worst", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox
          label="Smoothness Worst"
          error={errors?.smoothness_worst?.message}
        >
          <Input
            type="text"
            id="smoothness_worst"
            {...register("smoothness_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Compactness Worst"
          error={errors?.compactness_worst?.message}
        >
          <Input
            type="text"
            id="compactness_worst"
            {...register("compactness_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Concavity Worst"
          error={errors?.concavity_worst?.message}
        >
          <Input
            type="text"
            id="concavity_worst"
            {...register("concavity_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Concave Points Worst"
          error={errors?.concave_points_worst?.message}
        >
          <Input
            type="text"
            id="concave_points_worst"
            {...register("concave_points_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Symmetry Worst"
          error={errors?.symmetry_worst?.message}
        >
          <Input
            type="text"
            id="symmetry_worst"
            {...register("symmetry_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>
        <InputBox
          label="Fractal Dimension Worst"
          error={errors?.fractal_dimension_worst?.message}
        >
          <Input
            type="text"
            id="fractal_dimension_worst"
            {...register("fractal_dimension_worst", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {!isPredicting && response && (
        <PredictionResult result={response.result} check="Breast Cancer" />
      )}
    </>
  );
}

export default BreastCancerPrediction;
