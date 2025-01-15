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
import { usePredictParkinson } from "../features/usePredictParkinson";
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
  mdvp_fo: 119.16,
  mdvp_fhi: 137.83,
  mdvp_flo: 95.11,
  mdvp_jitter_percent: 0.00784,
  mdvp_jitter_abs: 0.00006,
  mdvp_rap: 0.00355,
  mdvp_ppq: 0.00459,
  jitter_ddp: 0.01005,
  mdvp_shimmer: 0.011,
  mdvp_shimmer_db: 0.076,
  shimmer_apq3: 0.014,
  shimmer_apq5: 0.018,
  mdvp_apq: 0.016,
  shimmer_dda: 0.051,
  nhr: 0.02236,
  hnr: 21.439,
  rpde: 1.675,
  dfa: 0.0,
  spread1: 0.0,
  spread2: 0.0,
  d2: 1.527,
  ppe: 0.144,
};

function ParkinsonPrediction() {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const { predictParkinson, isPredicting, response } = usePredictParkinson();

  function onSubmit(formData) {
    const symptoms = {
      "MDVP:Fo(Hz)": parseFloat(formData.mdvp_fo),
      "MDVP:Flo(Hz)": parseFloat(formData.mdvp_flo),
      "MDVP:Jitter(%)": parseFloat(formData.mdvp_jitter_percent),
      "MDVP:Fhi(Hz)": parseFloat(formData.mdvp_fhi),
      "MDVP:Jitter(Abs)": parseFloat(formData.mdvp_jitter_abs),
      "MDVP:RAP": parseFloat(formData.mdvp_rap),
      "MDVP:PPQ": parseFloat(formData.mdvp_ppq),
      "Jitter:DDP": parseFloat(formData.jitter_ddp),
      "MDVP:Shimmer": parseFloat(formData.mdvp_shimmer),
      "MDVP:Shimmer(dB)": parseFloat(formData.mdvp_shimmer_db),
      "Shimmer:APQ3": parseFloat(formData.shimmer_apq3),
      "Shimmer:APQ5": parseFloat(formData.shimmer_apq5),
      "MDVP:APQ": parseFloat(formData.mdvp_apq),
      "Shimmer:DDA": parseFloat(formData.shimmer_dda),
      NHR: parseFloat(formData.nhr),
      HNR: parseFloat(formData.hnr),
      RPDE: parseFloat(formData.rpde),
      DFA: parseFloat(formData.dfa),
      spread1: parseFloat(formData.spread1),
      spread2: parseFloat(formData.spread2),
      D2: parseFloat(formData.d2),
      PPE: parseFloat(formData.ppe),
    };

    predictParkinson(symptoms, {
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
        <Heading as="h1">Parkinson&apos;s Disease Prediction</Heading>
      </Row>
      <Row type="horizontal">
        <StyledImage src="/parkinson 1.png" alt="Parkinson's Disease Image" />
      </Row>

      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormHeader>Enter the following values</FormHeader>

        <InputBox label="MDVP:Fo (Hz)" error={errors.mdvp_fo?.message}>
          <Input
            type="text"
            id="mdvp_fo"
            {...register("mdvp_fo", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="MDVP:Fhi (Hz)" error={errors.mdvp_fhi?.message}>
          <Input
            type="text"
            id="mdvp_fhi"
            {...register("mdvp_fhi", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="MDVP:Flo (Hz)" error={errors.mdvp_flo?.message}>
          <Input
            type="text"
            id="mdvp_flo"
            {...register("mdvp_flo", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox
          label="MDVP:Jitter (%)"
          error={errors.mdvp_jitter_percent?.message}
        >
          <Input
            type="text"
            id="mdvp_jitter_percent"
            {...register("mdvp_jitter_percent", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="MDVP:Jitter (Abs)"
          error={errors.mdvp_jitter_abs?.message}
        >
          <Input
            type="text"
            id="mdvp_jitter_abs"
            {...register("mdvp_jitter_abs", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="MDVP:RAP" error={errors.mdvp_rap?.message}>
          <Input
            type="text"
            id="mdvp_rap"
            {...register("mdvp_rap", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="MDVP:PPQ" error={errors.mdvp_ppq?.message}>
          <Input
            type="text"
            id="mdvp_ppq"
            {...register("mdvp_ppq", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Jitter:DDP" error={errors.jitter_ddp?.message}>
          <Input
            type="text"
            id="jitter_ddp"
            {...register("jitter_ddp", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="MDVP:Shimmer" error={errors.mdvp_shimmer?.message}>
          <Input
            type="text"
            id="mdvp_shimmer"
            {...register("mdvp_shimmer", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox
          label="MDVP:Shimmer (dB)"
          error={errors.mdvp_shimmer_db?.message}
        >
          <Input
            type="text"
            id="mdvp_shimmer_db"
            {...register("mdvp_shimmer_db", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Shimmer:APQ3" error={errors.shimmer_apq3?.message}>
          <Input
            type="text"
            id="shimmer_apq3"
            {...register("shimmer_apq3", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="Shimmer:APQ5" error={errors.shimmer_apq5?.message}>
          <Input
            type="text"
            id="shimmer_apq5"
            {...register("shimmer_apq5", {
              required: "This field is required",
            })}
          />
        </InputBox>

        <InputBox label="MDVP:APQ" error={errors.mdvp_apq?.message}>
          <Input
            type="text"
            id="mdvp_apq"
            {...register("mdvp_apq", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="Shimmer:DDA" error={errors.shimmer_dda?.message}>
          <Input
            type="text"
            id="shimmer_dda"
            {...register("shimmer_dda", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="NHR" error={errors.nhr?.message}>
          <Input
            type="text"
            id="nhr"
            {...register("nhr", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="HNR" error={errors.hnr?.message}>
          <Input
            type="text"
            id="hnr"
            {...register("hnr", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="RPDE" error={errors.rpde?.message}>
          <Input
            type="text"
            id="rpde"
            {...register("rpde", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="DFA" error={errors.dfa?.message}>
          <Input
            type="text"
            id="dfa"
            {...register("dfa", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="spread1" error={errors.spread1?.message}>
          <Input
            type="text"
            id="spread1"
            {...register("spread1", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="spread2" error={errors.spread2?.message}>
          <Input
            type="text"
            id="spread2"
            {...register("spread2", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="D2" error={errors.d2?.message}>
          <Input
            type="text"
            id="d2"
            {...register("d2", { required: "This field is required" })}
          />
        </InputBox>

        <InputBox label="PPE" error={errors.ppe?.message}>
          <Input
            type="text"
            id="ppe"
            {...register("ppe", { required: "This field is required" })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {isPredicting && <p>Loading...</p>}
      {!isPredicting && response && (
        <PredictionResult
          result={response.result}
          check="Parkinson's Disease"
        />
      )}
    </>
  );
}

export default ParkinsonPrediction;
