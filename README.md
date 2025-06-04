# Multiple Disease Prediction

[![Netlify Status](https://api.netlify.com/api/v1/badges/YOUR_NETLIFY_BADGE_ID/deploy-status)](https://app.netlify.com/sites/YOUR_NETLIFY_SITE_NAME/deploys)

Multiple Disease Prediction is a web application that enables users to predict the likelihood of various diseases based on input symptoms. The app is built primarily with JavaScript and HTML, leveraging a backend Disease API (hosted separately on Render) for advanced disease data and predictions. The project is deployed and accessible via Netlify.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Demo](#demo)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running Locally](#running-locally)
- [Usage](#usage)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [License](#license)
- [Acknowledgements](#acknowledgements)

---

## Overview

This project is designed to help users assess their risk for multiple diseases by entering relevant symptoms into a user-friendly interface. The application communicates in real-time with a Disease API—hosted on [Render](https://render.com)—to fetch disease data, process symptoms, and present intuitive prediction results.

---

## Features

- **Multiple Disease Support:** Predicts the likelihood of various diseases (e.g., Diabetes, Heart Disease, etc.).
- **Real-time API Integration:** Fetches predictions and data from the Disease API hosted on Render.
- **Responsive Design:** Works smoothly across desktop and mobile browsers.
- **Simple UI:** Clean interface for symptom input and prediction results.
- **Fast Deployment:** Hosted on Netlify for quick global access.

---

## Demo

Access the live application here:  
[https://YOUR_NETLIFY_SITE_NAME.netlify.app](https://YOUR_NETLIFY_SITE_NAME.netlify.app)

> _Replace `YOUR_NETLIFY_SITE_NAME` with your actual Netlify site name._

---

## Architecture



## Getting Started

### Prerequisites

- Node.js and npm (for local development, if applicable)
- A modern web browser

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/darkradiation/multiple_disease_prediction.git
    cd multiple_disease_prediction
    ```

2. **Install dependencies:**  
   _If your project uses npm/yarn and has a `package.json` file:_
    ```bash
    npm install
    ```
   _If not, skip this step._

### Running Locally

1. **Start a local server:**
    - With npm:  
      ```bash
      npm run dev
      ```
    - With a simple HTTP server (Python 3):  
      ```bash
      python -m http.server 8000
      ```
2. **Open your browser:**  
   Visit [http://localhost:8000](http://localhost:8000) (or the port shown in your terminal).

---

## Usage

1. Navigate to the application in your browser.
2. Enter your symptoms as prompted.
3. Click the "Predict" button.
4. View the predicted disease(s) and recommendations.

---

## API Integration

This app uses the Disease API (hosted on Render) to fetch disease predictions.  
The Disease API is a separate project ([darkradiation/Disease-APIs](https://github.com/darkradiation/Disease-APIs)).

### Example API Call

```js
fetch('https://YOUR_RENDER_API_URL/api/predict', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    symptoms: ["headache", "fever", ...]
  })
})
  .then(response => response.json())
  .then(data => {
    // handle prediction data
  });
```

> _Replace `YOUR_RENDER_API_URL` with the actual Render API endpoint._

### API Endpoints

- `POST /api/predict`:  
  - Request body: `{ "symptoms": [ "symptom1", "symptom2", ... ] }`
  - Response: `{ "predictions": [ ... ], "confidence": ... }`

---

## Deployment

### Netlify

- **Continuous Deployment:** Pushing to the main branch automatically deploys the latest version to Netlify.
- **Preview Deployments:** Pull requests generate preview URLs for easy testing.

#### Netlify Configuration

- The app may use a `netlify.toml` file for custom settings.
- Static assets are served directly.
- For environment variables (like API URLs), use Netlify's dashboard or a `.env` file (if using a build tool).

---

## Contributing

Contributions are welcome!

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/my-feature`).
3. Commit your changes (`git commit -am 'Add new feature'`).
4. Push to your fork (`git push origin feature/my-feature`).
5. Open a Pull Request.

Please see [CONTRIBUTING.md](CONTRIBUTING.md) if available.

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

---

## Acknowledgements

- [Netlify](https://www.netlify.com/)
- [Render](https://render.com/)
- [Disease-APIs](https://github.com/darkradiation/Disease-APIs)
- Open-source contributors

---

> _For bug reports or feature requests, please open an issue on [GitHub Issues](https://github.com/darkradiation/multiple_disease_prediction/issues)._
