# Text-Based Emotion Detection

A complete mini project using NLP, TF-IDF, Logistic Regression, Flask and SQLite.

## Features
- Detects Joy, Sadness, Anger, Fear, Surprise, Love and Neutral
- Confidence percentage
- SQLite prediction history
- Dashboard with emotion distribution
- Responsive frontend
- Small included labelled dataset
- Easy model retraining

## Setup in VS Code (Windows)

1. Install Python 3.10+.
2. Open this project folder in VS Code.
3. Open Terminal.
4. Create virtual environment:
   `python -m venv venv`
5. Activate it:
   `venv\Scripts\activate`
6. Install packages:
   `pip install -r requirements.txt`
7. Train the model:
   `python train_model.py`
8. Start Flask:
   `python app.py`
9. Open:
   `http://127.0.0.1:5000`

## Retraining
Add more labelled examples to `dataset/emotion_dataset.csv` and run:
`python train_model.py`

For an academic project, replace the small demo dataset with a larger public emotion dataset and report accuracy, precision, recall and F1-score.

## Project Flow
Input Text -> Preprocessing/TF-IDF -> Logistic Regression -> Emotion + Confidence -> SQLite -> Dashboard
