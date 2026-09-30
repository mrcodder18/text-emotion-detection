import os
import sqlite3
import joblib
from datetime import datetime
from flask import Flask, render_template, request, jsonify

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "model", "emotion_model.pkl")
DB_PATH = os.path.join(BASE_DIR, "database", "emotion.db")

app = Flask(__name__)
model = None

EMOTION_INFO = {
    "joy": {"emoji": "😊", "label": "Joy"},
    "sadness": {"emoji": "😢", "label": "Sadness"},
    "anger": {"emoji": "😡", "label": "Anger"},
    "fear": {"emoji": "😨", "label": "Fear"},
    "surprise": {"emoji": "😲", "label": "Surprise"},
    "love": {"emoji": "❤️", "label": "Love"},
    "neutral": {"emoji": "😐", "label": "Neutral"},
}

def get_db():
    os.makedirs(os.path.dirname(DB_PATH), exist_ok=True)
    conn = sqlite3.connect(DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn

def init_db():
    conn = get_db()
    conn.execute("""
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            text TEXT NOT NULL,
            emotion TEXT NOT NULL,
            confidence REAL NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()

def load_model():
    global model
    if os.path.exists(MODEL_PATH):
        model = joblib.load(MODEL_PATH)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/dashboard")
def dashboard():
    return render_template("dashboard.html")

@app.route("/api/predict", methods=["POST"])
def predict():
    if model is None:
        return jsonify({"error": "Model not found. Run: python train_model.py"}), 500

    data = request.get_json(silent=True) or {}
    text = str(data.get("text", "")).strip()

    if not text:
        return jsonify({"error": "Please enter some text."}), 400
    if len(text) > 2000:
        return jsonify({"error": "Text must be 2000 characters or less."}), 400

    probabilities = model.predict_proba([text])[0]
    classes = model.classes_
    best_index = probabilities.argmax()
    emotion = classes[best_index]
    confidence = float(probabilities[best_index] * 100)

    conn = get_db()
    conn.execute(
        "INSERT INTO predictions (text, emotion, confidence, created_at) VALUES (?, ?, ?, ?)",
        (text, emotion, confidence, datetime.now().strftime("%Y-%m-%d %H:%M:%S"))
    )
    conn.commit()
    conn.close()

    info = EMOTION_INFO.get(emotion, {"emoji": "🧠", "label": emotion.title()})
    return jsonify({
        "emotion": emotion,
        "label": info["label"],
        "emoji": info["emoji"],
        "confidence": round(confidence, 2)
    })

@app.route("/api/history")
def history():
    conn = get_db()
    rows = conn.execute(
        "SELECT id, text, emotion, confidence, created_at FROM predictions ORDER BY id DESC LIMIT 50"
    ).fetchall()
    conn.close()

    return jsonify([{
        "id": row["id"],
        "text": row["text"],
        "emotion": row["emotion"],
        "label": EMOTION_INFO.get(row["emotion"], {"label": row["emotion"].title()})["label"],
        "emoji": EMOTION_INFO.get(row["emotion"], {"emoji": "🧠"})["emoji"],
        "confidence": round(row["confidence"], 2),
        "created_at": row["created_at"]
    } for row in rows])

@app.route("/api/stats")
def stats():
    conn = get_db()
    total = conn.execute("SELECT COUNT(*) AS c FROM predictions").fetchone()["c"]
    rows = conn.execute(
        "SELECT emotion, COUNT(*) AS count FROM predictions GROUP BY emotion ORDER BY count DESC"
    ).fetchall()
    conn.close()

    counts = {row["emotion"]: row["count"] for row in rows}
    return jsonify({
        "total": total,
        "counts": counts,
        "emotions": [
            {"emotion": e, "label": EMOTION_INFO[e]["label"], "emoji": EMOTION_INFO[e]["emoji"],
             "count": counts.get(e, 0)}
            for e in EMOTION_INFO
        ]
    })

@app.route("/api/clear-history", methods=["DELETE"])
def clear_history():
    conn = get_db()
    conn.execute("DELETE FROM predictions")
    conn.commit()
    conn.close()
    return jsonify({"message": "Prediction history cleared."})

if __name__ == "__main__":
    init_db()
    load_model()
    app.run(debug=True, host="127.0.0.1", port=5000)
