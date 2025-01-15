import styled from "styled-components";
import { useForm } from "react-hook-form";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Input from "../ui/Input";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictChronicKidney } from "../features/usePredictChronicKidney";
import PredictionResult from "../ui/PredictionResult";

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function ChronicKidneyPrediction() {
  const defaultValues = {
    age: 48,
    bp: 80,
    sg: 1.02,
    al: 1,
    su: 0,
    rbc: 1,
    pc: 1,
    pcc: 0,
    ba: 0,
    bgr: 121,
    bu: 36,
    sc: 1.2,
    sod: 137,
    pot: 4.6,
    hemo: 15.4,
    pcv: 44,
    wc: 7800,
    rc: 5.2,
    htn: 1,
    dm: 0,
    cad: 0,
    appet: 1,
    pe: 0,
    ane: 0,
  };

  const { register, handleSubmit, formState } = useForm({
    defaultValues: defaultValues,
  });
  const { errors } = formState;

  const { predictChronicKidney, isPredicting, response } =
    usePredictChronicKidney();

  function onSubmit(formData) {
    const symptoms = {
      age: parseFloat(formData.age),
      bp: parseFloat(formData.bp),
      sg: parseFloat(formData.sg),
      al: parseFloat(formData.al),
      su: parseFloat(formData.su),
      rbc: parseFloat(formData.rbc),
      pc: parseFloat(formData.pc),
      pcc: parseFloat(formData.pcc),
      ba: parseFloat(formData.ba),
      bgr: parseFloat(formData.bgr),
      bu: parseFloat(formData.bu),
      sc: parseFloat(formData.sc),
      sod: parseFloat(formData.sod),
      pot: parseFloat(formData.pot),
      hemo: parseFloat(formData.hemo),
      pcv: parseFloat(formData.pcv),
      wc: parseFloat(formData.wc),
      rc: parseFloat(formData.rc),
      htn: parseFloat(formData.htn),
      dm: parseFloat(formData.dm),
      cad: parseFloat(formData.cad),
      appet: parseFloat(formData.appet),
      pe: parseFloat(formData.pe),
      ane: parseFloat(formData.ane),
    };

    predictChronicKidney(symptoms, {
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
        <Heading as="h1">Chronic Kidney Disease Prediction</Heading>
      </Row>
      <Row type="horizontal">
        {/* <StyledImage src="/kidney 1.cms" alt="Chronic Kidney Image" /> */}
        <StyledImage src="/kidney 2.jpg" alt="Chronic Kidney Image" />
      </Row>

      <Form onSubmit={handleSubmit(onSubmit, onError)}>
        <FormHeader>Enter the following values</FormHeader>
        <InputBox label="Age" error={errors?.age?.message}>
          <Input
            type="text"
            id="age"
            {...register("age", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Blood Pressure" error={errors?.bp?.message}>
          <Input
            type="text"
            id="bp"
            {...register("bp", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Specific Gravity" error={errors?.sg?.message}>
          <Input
            type="text"
            id="sg"
            {...register("sg", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Albumin" error={errors?.al?.message}>
          <Input
            type="text"
            id="al"
            {...register("al", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Sugar" error={errors?.su?.message}>
          <Input
            type="text"
            id="su"
            {...register("su", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Red Blood Cells" error={errors?.rbc?.message}>
          <Input
            type="text"
            id="rbc"
            {...register("rbc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Pus Cell" error={errors?.pc?.message}>
          <Input
            type="text"
            id="pc"
            {...register("pc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Pus Cell Clumps" error={errors?.pcc?.message}>
          <Input
            type="text"
            id="pcc"
            {...register("pcc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Bacteria" error={errors?.ba?.message}>
          <Input
            type="text"
            id="ba"
            {...register("ba", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Blood Glucose Random" error={errors?.bgr?.message}>
          <Input
            type="text"
            id="bgr"
            {...register("bgr", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Blood Urea" error={errors?.bu?.message}>
          <Input
            type="text"
            id="bu"
            {...register("bu", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Serum Creatinine" error={errors?.sc?.message}>
          <Input
            type="text"
            id="sc"
            {...register("sc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Sodium" error={errors?.sod?.message}>
          <Input
            type="text"
            id="sod"
            {...register("sod", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Potassium" error={errors?.pot?.message}>
          <Input
            type="text"
            id="pot"
            {...register("pot", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Hemoglobin" error={errors?.hemo?.message}>
          <Input
            type="text"
            id="hemo"
            {...register("hemo", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Packed Cell Volume" error={errors?.pcv?.message}>
          <Input
            type="text"
            id="pcv"
            {...register("pcv", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="White Blood Cell Count" error={errors?.wc?.message}>
          <Input
            type="text"
            id="wc"
            {...register("wc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Red Blood Cell Count" error={errors?.rc?.message}>
          <Input
            type="text"
            id="rc"
            {...register("rc", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Hypertension" error={errors?.htn?.message}>
          <Input
            type="text"
            id="htn"
            {...register("htn", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Diabetes Mellitus" error={errors?.dm?.message}>
          <Input
            type="text"
            id="dm"
            {...register("dm", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Coronary Artery Disease" error={errors?.cad?.message}>
          <Input
            type="text"
            id="cad"
            {...register("cad", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Appetite" error={errors?.appet?.message}>
          <Input
            type="text"
            id="appet"
            {...register("appet", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Pedal Edema" error={errors?.pe?.message}>
          <Input
            type="text"
            id="pe"
            {...register("pe", { required: "This field is required" })}
          />
        </InputBox>
        <InputBox label="Anemia" error={errors?.ane?.message}>
          <Input
            type="text"
            id="ane"
            {...register("ane", { required: "This field is required" })}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {!isPredicting && response && (
        <PredictionResult
          result={response.result}
          check="Chronic Kidney Disease"
        />
      )}
    </>
  );
}

export default ChronicKidneyPrediction;
