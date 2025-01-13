import { BASE_API_URL } from "./apiUrls";

const predictBreastCancer = async (symptoms) => {
  try {
    const response = await fetch(`${BASE_API_URL}breast_cancer`, {
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
    console.error("Error predicting breast cancer:", error);
    throw error;
  }
};

export default predictBreastCancer;
