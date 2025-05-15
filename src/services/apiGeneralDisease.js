import { BASE_API_URL } from "./apiUrls";

const predictGeneralDisease = async (payloadData) => {
  try {
    const response = await fetch(`${BASE_API_URL}general_disease`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payloadData), // Send the received payloadData directly
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error ||
          `API Error: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    // The backend returns { "result": "Disease Name" }
    // We can transform it here or let the hook handle it.
    // For consistency with your hook's onSuccess, let's keep it as is for now.
    return data; // Expected to be { result: "Disease Name" }
  } catch (error) {
    console.error("Error predicting general disease in service:", error);
    // Re-throw the error so react-query can catch it
    throw error;
  }
};

export { predictGeneralDisease };
