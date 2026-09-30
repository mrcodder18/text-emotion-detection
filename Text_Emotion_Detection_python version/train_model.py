import os
import joblib
import pandas as pd
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score, classification_report

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "dataset", "emotion_dataset.csv")
MODEL_DIR = os.path.join(BASE_DIR, "model")
os.makedirs(MODEL_DIR, exist_ok=True)

df = pd.read_csv(DATA_PATH)
df = df.dropna(subset=["text", "emotion"])

X_train, X_test, y_train, y_test = train_test_split(
    df["text"], df["emotion"], test_size=0.20, random_state=42, stratify=df["emotion"]
)

model = Pipeline([
    ("tfidf", TfidfVectorizer(
        lowercase=True,
        ngram_range=(1, 2),
        sublinear_tf=True,
        min_df=1
    )),
    ("classifier", LogisticRegression(max_iter=2000, random_state=42))
])

model.fit(X_train, y_train)
pred = model.predict(X_test)
accuracy = accuracy_score(y_test, pred)

joblib.dump(model, os.path.join(MODEL_DIR, "emotion_model.pkl"))

print("=" * 55)
print("TEXT-BASED EMOTION DETECTION - MODEL TRAINING")
print("=" * 55)
print(f"Dataset rows : {len(df)}")
print(f"Training rows: {len(X_train)}")
print(f"Testing rows : {len(X_test)}")
print(f"Accuracy     : {accuracy * 100:.2f}%")
print("\nClassification Report:")
print(classification_report(y_test, pred, zero_division=0))
print("\nModel saved to: model/emotion_model.pkl")
