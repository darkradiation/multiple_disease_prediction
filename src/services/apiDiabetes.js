import { BASE_API_URL } from "./apiUrls";

const predictDiabetes = async (symptoms) => {
  try {
    const response = await fetch(`${BASE_API_URL}diabetes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(symptoms), // Send the symptoms as JSON
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json(); // Parse the JSON response
    return data;
  } catch (error) {
    console.error("Error predicting diabetes:", error);
    throw error; // Re-throw the error for React Query to handle
  }
};

export default predictDiabetes;
