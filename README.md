# 🧠 Text-Based Emotion Detection

A web-based **Text-Based Emotion Detection System** that uses Natural Language Processing (NLP) techniques to analyze text and identify the emotion expressed by the user.

The system provides an interactive interface where users can enter text, receive an emotion prediction with confidence information, and view prediction history and emotion statistics through a dashboard.

## 🌐 Live Demo

### 🚀 Try the Project Online

**https://frolicking-scone-32f522.netlify.app/**

---

## 📌 Project Information

**Project Title:** Text-Based Emotion Detection

**Project Type:** Mini Project

**Domain:** Natural Language Processing / Machine Learning / Web Development

**Developer:** Ansh Makani

**Department:** Information Technology

**Institute:** Pillai HOC College of Engineering and Technology, Rasayani

**Academic Year:** 2026–27

---

# 📖 Abstract

Text-Based Emotion Detection is a web-based application developed to identify emotions expressed through written text. The system accepts text entered by the user and analyzes the words and phrases to determine the most appropriate emotional category.

The application supports seven emotion categories: **Joy, Sadness, Anger, Fear, Surprise, Love, and Neutral**. After analyzing the input, the system displays the detected emotion along with a confidence value.

The application also maintains prediction history and provides a dashboard for viewing emotion statistics. The system is designed with a responsive web interface and is deployed online using Netlify.

This project demonstrates the practical application of Natural Language Processing, text classification, JavaScript, serverless functions, and web technologies.

**Keywords:** NLP, Emotion Detection, Text Classification, Sentiment Analysis, JavaScript, Netlify, Natural Language Processing

---

# 1. Introduction

## 1.1 Background

Human communication contains different emotions such as happiness, sadness, anger, fear, surprise, and love. Identifying these emotions from written text is an important application of Natural Language Processing.

With the increasing use of social media, online communication, feedback systems, and digital platforms, large amounts of textual data are generated every day. Automatically identifying emotions from this data can help understand the emotional context of the users.

The proposed **Text-Based Emotion Detection System** analyzes user-provided text and classifies it into predefined emotion categories. The system provides a simple web interface so that users can enter text and immediately view the detected emotion.

## 1.2 Motivation

The main motivation behind this project is to demonstrate how NLP techniques can be used to understand emotional information from text.

Manual analysis of a large amount of textual information can be time-consuming. An automated emotion detection system can provide quick classification and organize the results for further analysis.

The project also provides practical experience in:

* Natural Language Processing
* Text classification
* JavaScript development
* Serverless functions
* Web application development
* Local data storage
* Dashboard development
* Cloud deployment

---

# 2. Problem Statement

Understanding emotions from large amounts of text manually is difficult and time-consuming.

Therefore, there is a need for a simple web-based system that can automatically analyze textual input and classify it into predefined emotional categories.

The proposed system provides an interactive platform where users can enter text and receive an emotion prediction with confidence information. The system also maintains prediction history and presents statistical information through a dashboard.

---

# 3. Objectives

The main objectives of the project are:

* To develop a web-based text emotion detection system.
* To apply basic Natural Language Processing techniques.
* To classify text into multiple emotion categories.
* To analyze words and phrases associated with emotions.
* To provide confidence information for predictions.
* To maintain prediction history.
* To provide dashboard-based emotion statistics.
* To develop a responsive and user-friendly interface.
* To deploy the application online using Netlify.

---

# 4. Supported Emotions

The system identifies the following seven emotions:

| Emotion     | Description                                           |
| ----------- | ----------------------------------------------------- |
| 😊 Joy      | Happiness, excitement, pleasure and positive feelings |
| 😢 Sadness  | Sorrow, disappointment and negative feelings          |
| 😡 Anger    | Irritation, frustration and anger                     |
| 😨 Fear     | Worry, nervousness and fear                           |
| 😲 Surprise | Unexpected events or reactions                        |
| ❤️ Love     | Affection, care and emotional attachment              |
| 😐 Neutral  | Text without a strong emotional indication            |

---

# 5. Existing System

Traditional emotion analysis may require manual interpretation of text or complex NLP systems.

Manual analysis becomes difficult when the amount of textual data increases. Some advanced systems use large machine learning or deep learning models, but these may require considerable computational resources and infrastructure.

For an academic mini project, a lightweight web-based approach provides a simpler way to demonstrate the concepts of text preprocessing, emotion classification, prediction results, and data visualization.

---

# 6. Proposed System

The proposed system is a web-based application that analyzes user-entered text and predicts the corresponding emotion.

The application consists of:

* Text input interface
* Text preprocessing
* Emotion classification
* Confidence calculation
* Prediction result display
* Prediction history
* Dashboard analytics
* Netlify serverless function
* Browser-based storage

The system is accessible through a web browser without requiring the user to install the application.

---

# 7. System Architecture

```text
              ┌─────────────────────┐
              │       User          │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │   Text Input UI     │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Text Preprocessing  │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Emotion Classifier  │
              │ Keyword / Phrase    │
              │ Analysis            │
              └──────────┬──────────┘
                         │
                         ▼
              ┌─────────────────────┐
              │ Emotion + Confidence│
              └──────────┬──────────┘
                         │
              ┌──────────┴──────────┐
              ▼                     ▼
     ┌─────────────────┐   ┌──────────────────┐
     │ Prediction      │   │ Prediction       │
     │ Result          │   │ History          │
     └─────────────────┘   └────────┬─────────┘
                                    │
                                    ▼
                           ┌──────────────────┐
                           │ Dashboard        │
                           │ Analytics        │
                           └──────────────────┘
```

---

# 8. Methodology

The system follows the following methodology:

### Step 1: User Input

The user enters a sentence or paragraph into the text input area.

### Step 2: Text Processing

The entered text is processed to identify relevant words and phrases.

### Step 3: Emotion Analysis

The system analyzes emotion-related keywords and phrases present in the input.

### Step 4: Classification

The classifier compares the detected terms with predefined emotion categories.

### Step 5: Prediction

The emotion having the strongest matching evidence is selected as the predicted emotion.

### Step 6: Confidence

A confidence value is calculated and presented to the user.

### Step 7: History

The prediction is stored in the browser's LocalStorage.

### Step 8: Dashboard

The dashboard displays prediction statistics and previous prediction records.

---

# 9. Technologies Used

## Frontend

* HTML5
* CSS3
* JavaScript
* Responsive Web Design

## Backend

* Netlify Functions
* Node.js

## NLP

* Text preprocessing
* Keyword analysis
* Phrase matching
* Emotion classification
* Basic negation handling

## Storage

* Browser LocalStorage

## Deployment

* Netlify

## Version Control

* Git
* GitHub

---

# 10. Project Structure

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

---

# 11. Main Features

## 📝 Emotion Detection

Users can enter any text and receive an emotion prediction.

## 🎯 Confidence Score

The application displays a confidence value associated with the prediction.

## 📊 Dashboard

The dashboard provides a summary of emotion predictions.

## 🕒 Prediction History

Previous predictions can be viewed through the dashboard.

## 🗑️ Clear History

Users can clear the stored prediction history.

## 📱 Responsive Design

The interface is designed to work on desktop and mobile screens.

## 🌐 Online Deployment

The project is deployed and accessible through Netlify.

---

# 12. Example Inputs

### Example 1

```text
I am extremely happy today!
```

**Expected Emotion:** Joy 😊

### Example 2

```text
I am very angry about this situation.
```

**Expected Emotion:** Anger 😡

### Example 3

```text
I am scared about the upcoming exam.
```

**Expected Emotion:** Fear 😨

### Example 4

```text
I miss my best friend so much.
```

**Expected Emotion:** Sadness 😢

### Example 5

```text
Wow! I didn't expect this at all.
```

**Expected Emotion:** Surprise 😲

---

# 13. Dashboard

The dashboard provides an overview of previous predictions.

It can display:

* Total number of predictions
* Emotion distribution
* Detected emotions
* Confidence values
* Prediction history
* Date and time of predictions

This helps users understand the distribution of detected emotions over multiple inputs.

---

# 14. Data Storage

The Netlify version uses **browser LocalStorage** for maintaining prediction history.

This approach allows the application to store data locally in the user's browser without requiring a traditional database server.

The stored information can include:

```text
Text
Emotion
Confidence
Timestamp
```

---

# 15. Deployment

The application is deployed using **Netlify**.

### Live Project

🚀 **https://frolicking-scone-32f522.netlify.app/**

The project can be accessed directly through a modern web browser.

---

# 16. Installation and Local Setup

### Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### Open the Project

```bash
cd Text-Emotion-Detection
```

### Install Dependencies

```bash
npm install
```

### Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Run Locally

```bash
netlify dev
```

The terminal will provide the local development URL.

---

# 17. Testing

The system can be tested using different sentences representing the supported emotions.

| Test Input                     | Expected Emotion |
| ------------------------------ | ---------------- |
| I am so happy today.           | Joy              |
| I feel very sad.               | Sadness          |
| This makes me extremely angry. | Anger            |
| I am afraid of the result.     | Fear             |
| Wow, that was unexpected!      | Surprise         |
| I really love my family.       | Love             |
| The weather is normal today.   | Neutral          |

Testing helps verify whether the system correctly identifies different emotional expressions.

---

# 18. Advantages

* Simple and easy-to-use interface.
* Fast emotion prediction.
* Supports multiple emotion categories.
* Provides prediction confidence.
* Maintains prediction history.
* Provides dashboard analytics.
* Works through a web browser.
* Can be deployed online.
* Suitable for academic demonstration.
* Does not require specialized hardware.

---

# 19. Limitations

* The system is limited to predefined emotion categories.
* Context-dependent emotions may be difficult to identify.
* Sarcasm and complex expressions may produce incorrect predictions.
* Very short text may not provide enough information for accurate classification.
* The current lightweight classifier does not provide the same semantic understanding as advanced Transformer-based models.
* Prediction history is stored locally in the user's browser.

---

# 20. Future Enhancements

The project can be further improved by adding:

* Machine Learning-based classification.
* TF-IDF with Logistic Regression or SVM.
* BERT or Transformer-based emotion classification.
* Multilingual emotion detection.
* Voice-to-text emotion detection.
* User authentication.
* Cloud database integration.
* Advanced visualization.
* Real-time emotion analysis.
* Social media text analysis.
* Improved contextual and semantic understanding.
* More emotion categories.

---

# 21. Conclusion

The **Text-Based Emotion Detection System** demonstrates the application of Natural Language Processing and web technologies for identifying emotions from textual data.

The system provides an easy-to-use interface for entering text and obtaining an emotion prediction. It supports seven emotion categories and provides confidence information, prediction history, and dashboard analytics.

The project also demonstrates the integration of frontend technologies with serverless functions and online deployment using Netlify.

Overall, the project provides a practical implementation of text classification and emotion analysis concepts and can be further enhanced using advanced Machine Learning and Deep Learning models.

---

# 22. Project Links

### 🌐 Live Website

https://frolicking-scone-32f522.netlify.app/

### 💻 GitHub

Add your GitHub repository link here.

```text
https://github.com/YOUR_USERNAME/YOUR_REPOSITORY
```

---

# 23. Author

## Ansh Makani

**B.E. Information Technology**

**Pillai HOC College of Engineering and Technology**

### Project

**Text-Based Emotion Detection**

---

## ⭐ Support

If you find this project useful for learning or academic purposes, consider giving the repository a ⭐ on GitHub.

---

## 📄 Academic Note

This project is developed as an academic mini project for demonstrating concepts related to **Natural Language Processing, text classification, web development, and serverless deployment**.

The system is intended for educational purposes and should not be treated as a psychological or medical diagnostic system.
