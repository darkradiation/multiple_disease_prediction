import styled from "styled-components";
import { useState } from "react";
import Heading from "../ui/Heading";
import Row from "../ui/Row";
import Button from "../ui/Button";
import Form from "../ui/Form";
import InputBox from "../ui/InputBox";
import FormHeader from "../ui/FormHeader";
import { usePredictGeneralDisease } from "../features/usePredictGeneralDisease";
import PredictionResult from "../ui/PredictionResult"; // Assuming PredictionResult is a shared component
import SelectBox from "../ui/SelectBox"; // Import the new SelectBox component

// List of general symptoms 
const generalSymptoms = [
  'abdominal_pain', 'abnormal_menstruation', 'acidity', 'acute_liver_failure',
  'altered_sensorium', 'anxiety', 'back_pain', 'belly_pain', 'blackheads',
  'bladder_discomfort', 'blister', 'blood_in_sputum', 'bloody_stool',
  'blurred_and_distorted_vision', 'breathlessness', 'brittle_nails', 'bruising',
  'burning_micturition', 'chest_pain', 'chills', 'cold_hands_and_feets', 'coma',
  'congestion', 'constipation', 'continuous_feel_of_urine', 'continuous_sneezing',
  'cough', 'cramps', 'dark_urine', 'dehydration', 'depression', 'diarrhoea',
  'dischromic _patches', 'distention_of_abdomen', 'dizziness', 'drying_and_tingling_lips',
  'enlarged_thyroid', 'excessive_hunger', 'extra_marital_contacts', 'family_history',
  'fast_heart_rate', 'fatigue', 'fluid_overload', 'foul_smell_of urine', 'headache',
  'high_fever', 'hip_joint_pain', 'history_of_alcohol_consumption', 'increased_appetite',
  'indigestion', 'inflammatory_nails', 'internal_itching', 'irregular_sugar_level',
  'irritability', 'irritation_in_anus', 'itching', 'joint_pain', 'knee_pain',
  'lack_of_concentration', 'lethargy', 'loss_of_appetite', 'loss_of_balance',
  'loss_of_smell', 'loss_of_taste', 'malaise', 'mild_fever', 'mood_swings',
  'movement_stiffness', 'mucoid_sputum', 'muscle_pain', 'muscle_wasting',
  'muscle_weakness', 'nausea', 'neck_pain', 'nodal_skin_eruptions', 'obesity',
  'pain_behind_the_eyes', 'pain_during_bowel_movements', 'pain_in_anal_region',
  'painful_walking', 'palpitations', 'passage_of_gases', 'patches_in_throat',
  'phlegm', 'polyuria', 'prominent_veins_on_calf', 'puffy_face_and_eyes',
  'pus_filled_pimples', 'receiving_blood_transfusion', 'receiving_unsterile_injections',
  'red_sore_around_nose', 'red_spots_over_body', 'redness_of_eyes', 'restlessness',
  'runny_nose', 'rusty_sputum', 'scurring', 'shivering', 'silver_like_dusting',
  'sinus_pressure', 'skin_peeling', 'skin_rash', 'slurred_speech',
  'small_dents_in_nails', 'spinning_movements', 'spotting_ urination', 'stiff_neck',
  'stomach_bleeding', 'stomach_pain', 'sunken_eyes', 'sweating', 'swelled_lymph_nodes',
  'swelling_joints', 'swelling_of_stomach', 'swollen_blood_vessels',
  'swollen_extremeties', 'swollen_legs', 'throat_irritation', 'tiredness',
  'toxic_look_(typhos)', 'ulcers_on_tongue', 'unsteadiness', 'visual_disturbances',
  'vomiting', 'watering_from_eyes', 'weakness_in_limbs', 'weakness_of_one_body_side',
  'weight_gain', 'weight_loss', 'yellow_crust_ooze', 'yellow_urine',
  'yellowing_of_eyes', 'yellowish_skin'
];

const StyledImage = styled.img`
  width: 100%;
  height: 40rem;
  object-fit: cover;
  border-radius: 0.8rem;
  margin-bottom: 1rem;
`;

function GeneralDiseasePrediction() {
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);

  const { predictGeneralDisease, isPredicting, response } =
    usePredictGeneralDisease();

  function onSubmit(event) {
    event.preventDefault(); // Prevent default form submission behavior

    // Assuming your prediction API for general disease takes an array of symptom names
    // predictGeneralDisease(selectedSymptoms, {
    //   onSuccess: () => {
    //     // Optionally clear selected symptoms or show a success message
    //     // setSelectedSymptoms([]);
    //   },
    // });
    console.log(selectedSymptoms);
  }

  function handleSelectSymptom(symptom) {
    if (!selectedSymptoms.includes(symptom)) {
      setSelectedSymptoms([...selectedSymptoms, symptom]);
    }
  }

  function handleRemoveSymptom(symptomToRemove) {
    setSelectedSymptoms(
      selectedSymptoms.filter((symptom) => symptom !== symptomToRemove)
    );
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">General Disease Prediction</Heading>
      </Row>
      <Row type="horizontal">
        {/* <StyledImage src="/heart 1.jpeg" alt="Heart Disease Image" /> */}
        <StyledImage src="/heart 2.webp" alt="Heart Disease Image" />
      </Row>

      <Form onSubmit={onSubmit}>
        <FormHeader>Select your symptoms</FormHeader>

        <InputBox label="Symptoms">
          <SelectBox
            options={generalSymptoms}
            selectedSymptoms={selectedSymptoms}
            onSelectSymptom={handleSelectSymptom}
            onRemoveSymptom={handleRemoveSymptom}
          />
        </InputBox>

        <Button type="submit">See Results</Button>
      </Form>

      {!isPredicting && response && (
        <PredictionResult result={response.result} check="General Disease" />
      )}
    </>
  );
}

export default GeneralDiseasePrediction;
