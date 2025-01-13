import { BASE_API_URL } from "./apiUrls";

const predictChronicKidney = async (symptoms) => {
  try {
    const response = await fetch(`${BASE_API_URL}chronic_kidney`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(symptoms),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error predicting chronic kidney disease:", error);
    throw error;
  }
};

export default predictChronicKidney;
