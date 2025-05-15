import { BASE_API_URL } from "./apiUrls"; // Assuming you have this file

const predictGeneralDisease = async (symptomsList) => {
  try {
    // The API expects an object with a "symptoms" key, which is a list of strings
    const payload = { symptoms: symptomsList };

    const response = await fetch(`${BASE_API_URL}general_disease`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorData = await response.json(); // Try to get error message from API
      throw new Error(errorData.error || "Network response was not ok");
    }

    const data = await response.json();
    return data; // Expected to be { predicted_disease: "Disease Name" }
  } catch (error) {
    console.error("Error predicting general disease:", error);
    // Re-throw the error so react-query can catch it
    throw error;
  }
};

export default predictGeneralDisease;