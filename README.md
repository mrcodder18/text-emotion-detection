# 🧠 Text-Based Emotion Detection

A web-based **Text-Based Emotion Detection System** that analyzes user text and identifies the emotion expressed in the text. The project provides emotion prediction, confidence information, prediction history, and dashboard analytics through a responsive web interface.

## 🌐 Live Demo

**Try the application:**
https://frolicking-scone-32f522.netlify.app/

## 📌 Project Overview

Text-Based Emotion Detection is an NLP-based web application designed to identify emotions from textual input.

The system analyzes the entered sentence and classifies it into one of the supported emotions. It provides a simple and interactive interface that can be used for academic demonstrations and basic emotion-analysis applications.

## 😊 Supported Emotions

The system supports the following emotions:

* 😊 Joy
* 😢 Sadness
* 😡 Anger
* 😨 Fear
* 😲 Surprise
* ❤️ Love
* 😐 Neutral

## ✨ Features

* 📝 Text-based emotion detection
* 🧠 NLP-based text analysis
* 😊 Seven emotion categories
* 📊 Confidence score
* 📈 Emotion statistics
* 🕒 Prediction history
* 🗑️ Clear prediction history
* 📱 Responsive user interface
* 🌐 Netlify deployment
* ⚡ Fast serverless processing
* 🎨 Simple and user-friendly design

## 🛠️ Technologies Used

### Frontend

* HTML5
* CSS3
* JavaScript

### Backend

* Netlify Functions
* Node.js

### NLP / Classification

* Text preprocessing
* Keyword and phrase matching
* Emotion classification
* Basic negation handling

### Storage

* Browser LocalStorage

### Deployment

* Netlify

## 📂 Project Structure

```text
Text-Emotion-Detection/
│
├── index.html
├── dashboard.html
├── README.md
├── netlify.toml
├── package.json
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   └── dashboard.js
│
├── netlify/
│   └── functions/
│       └── predict.js
│
└── dataset/
    └── emotion_dataset.csv
```

## 🔄 System Workflow

```text
User enters text
       ↓
Text preprocessing
       ↓
Keyword / phrase analysis
       ↓
Emotion classification
       ↓
Confidence calculation
       ↓
Display detected emotion
       ↓
Store prediction history
       ↓
Dashboard analytics
```

## 🚀 How to Run Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Open the project

```bash
cd Text-Emotion-Detection
```

### 3. Install dependencies

```bash
npm install
```

### 4. Install Netlify CLI

```bash
npm install -g netlify-cli
```

### 5. Run the project

```bash
netlify dev
```

The application will be available through the local Netlify development URL shown in the terminal.

## 🌐 Deployment

The project is deployed using **Netlify**.

### Live Application

https://frolicking-scone-32f522.netlify.app/

To deploy your own version:

1. Upload the project to GitHub.
2. Open Netlify.
3. Select **Add new project**.
4. Select **Import an existing project**.
5. Connect your GitHub repository.
6. Configure the project.
7. Deploy the site.
8. Netlify automatically builds and hosts the application.

## 📊 Dashboard

The dashboard provides information about previous predictions, including:

* Total predictions
* Emotion distribution
* Detected emotions
* Confidence values
* Prediction timestamps
* Prediction history

## 🧪 Example Inputs

Try entering sentences such as:

```text
I am extremely happy today!
```

Expected emotion:

```text
Joy
```

Another example:

```text
I am really angry about what happened.
```

Expected emotion:

```text
Anger
```

Another example:

```text
I am scared about tomorrow's exam.
```

Expected emotion:

```text
Fear
```

## 🎯 Objectives

* To develop a simple text-based emotion detection system.
* To apply basic Natural Language Processing concepts.
* To classify text into multiple emotion categories.
* To provide confidence information for predictions.
* To maintain prediction history.
* To provide dashboard-based emotion analytics.
* To deploy the application online using Netlify.

## 🔮 Future Enhancements

* Use a trained Machine Learning model such as Logistic Regression, SVM, or Random Forest.
* Integrate BERT or other Transformer-based models.
* Support multilingual emotion detection.
* Add voice-to-text emotion detection.
* Add user authentication.
* Add advanced emotion analytics.
* Add real-time emotion monitoring.
* Improve semantic understanding and context detection.

## ⚠️ Disclaimer

This project is developed for **educational and academic purposes**. The detected emotion is an estimated classification based on the text provided and should not be considered a psychological or medical assessment.

## 👨‍💻 Author

**Ansh Makani**

B.E. Information Technology

### 🔗 Project

**Live Demo:**
https://frolicking-scone-32f522.netlify.app/

---

⭐ If you find this project useful, consider giving the repository a star!
