import { BASE_API_URL } from "./apiUrls";

const predictHepatitis = async (symptoms) => {
  try {
    const response = await fetch(`${BASE_API_URL}hepatitis`, {
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
    console.error("Error predicting hepatitis:", error);
    throw error;
  }
};

export default predictHepatitis;
