# Leukovision API

API to analyze images and provide predictions on whether the images indicate leukemia or not, as well as offer recommendations for further management.

## Features

- **Leukemia Prediction**: The API analyzes images to determine if there are indications of leukemia.
- **Prediction History**: Stores and displays the prediction history for each user.
- **Users**: Users who utilize the Leukovision application for image analysis.
- **Patients**: Patients whose images will be predicted for leukemia conditions.

## How to Run

### Prerequisites

Make sure you have Node.js and npm installed on your system. If not, you can download them [here](https://nodejs.org/).

### Step 1: Clone the Repository

```bash
git clone https://github.com/leukovision-capstone/leukovision-cloudstack.git
cd leukovision-cloudstack
```
### Step 2: Install Dependencies

Run the following command to install the required dependencies:

```bash
npm install
```

### Step 3: Configure the .env File
Copy the .env.example file to .env and adjust the configuration:
```bash
cp .env.example .env
```

### Step 4: Run the Server
```bash
npm run dev
```
Or, to run the server in production mode, use the command:
```bash
npm start
```

The API will be running at http://0.0.0.0:8000.

## System Architecture
![System Architecture](https://drive.google.com/file/d/1LnJn96BDV03xjRr46ynudezIZEBCT7LY/view)
