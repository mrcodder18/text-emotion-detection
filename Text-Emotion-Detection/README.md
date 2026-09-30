# Text-Based Emotion Detection System Using NLP

## Abstract

**Text-Based Emotion Detection System Using NLP** is a lightweight college mini project that analyzes an English text sentence and classifies it into one of seven emotion categories: Joy, Sadness, Anger, Fear, Surprise, Love, or Neutral. The application uses a transparent **NLP-based keyword and phrase emotion classification** approach rather than a deep-learning model. Text is normalized, tokenized, compared with emotion-specific dictionaries, scored using keyword frequency and phrase matches, and adjusted with basic negation handling. A Netlify Function provides the prediction endpoint, while browser LocalStorage keeps a maximum of 50 recent predictions for the dashboard.

This project is designed for free deployment on Netlify and requires no API key, paid service, database, Python runtime, Flask server, or external machine-learning API. The included CSV dataset is an educational reference set created for demonstration and testing; it is **not a professionally benchmarked ML dataset**.

## Objectives

1. To develop a simple web-based system for identifying emotions from English text.
2. To demonstrate practical NLP concepts such as normalization, tokenization, phrase matching, word-frequency scoring, and negation handling.
3. To classify text into seven predefined emotion categories.
4. To expose the classifier through a serverless Netlify Function.
5. To provide confidence information in an understandable form for academic demonstration.
6. To maintain recent prediction history using browser LocalStorage without a database.
7. To create a responsive application that can be deployed free on Netlify.

## Emotion Classes

| Emotion | Emoji | Description |
|---|---:|---|
| Joy | 😊 | Happiness, achievement, excitement and positive experiences |
| Sadness | 😢 | Loss, disappointment, loneliness and grief |
| Anger | 😡 | Frustration, irritation, rage and perceived unfairness |
| Fear | 😨 | Anxiety, danger, worry and nervousness |
| Surprise | 😲 | Unexpected, shocking or astonishing events |
| Love | ❤️ | Affection, care, friendship, family and compassion |
| Neutral | 😐 | Informational or emotionally weak statements |

## Technologies

- **HTML5** — page structure and accessible controls.
- **CSS3** — responsive layout, cards, typography, states and visual components.
- **Vanilla JavaScript** — browser interaction, API calls, LocalStorage and dashboard rendering.
- **Netlify Functions** — serverless Node.js prediction endpoint.
- **Node.js** — runtime for `netlify/functions/predict.js`.
- **Browser LocalStorage** — local prediction history.
- **CSV** — educational reference dataset.

No Flask, Python backend, SQLite, MongoDB, Firebase, paid API, API key, or unnecessary npm dependency is used.

## Features

- Modern responsive emotion detector.
- Seven emotion categories with emoji labels.
- Character counter and 2,000-character input limit.
- Example sentence buttons.
- Loading state and clear state.
- NLP keyword and phrase scoring.
- Word-frequency contribution.
- Basic three-token-window negation handling.
- Confidence calculation based on classification scores and score separation.
- Server-side input validation in the Netlify Function.
- LocalStorage history with maximum 50 records.
- Dashboard statistics and CSS/HTML distribution bars.
- Prediction table with safe HTML escaping.
- Clear-history confirmation.
- Friendly error messages.
- No API keys or external services.

## System Architecture

```text
User
  ↓
HTML / CSS / Vanilla JavaScript
  ↓
POST /api/predict
  ↓
Netlify Redirect
  ↓
Netlify Function (Node.js)
  ↓
NLP Emotion Classifier
  ├─ Normalization
  ├─ Tokenization
  ├─ Phrase matching
  ├─ Keyword frequency scoring
  └─ Basic negation handling
  ↓
Emotion + Emoji + Confidence
  ↓
Browser LocalStorage
  ↓
Dashboard
```

## Project Structure

```text
Text-Emotion-Detection/
│
├── index.html
├── dashboard.html
├── README.md
├── netlify.toml
├── package.json
│
├── netlify/
│   └── functions/
│       └── predict.js
│
├── css/
│   └── style.css
│
├── js/
│   ├── app.js
│   └── dashboard.js
│
└── dataset/
    └── emotion_dataset.csv
```

## How the Classifier Works

The system is intentionally transparent so that it can be explained in a college viva.

### 1. Text normalization

The function converts text to lowercase, normalizes common curly quotation marks, removes most punctuation, and collapses repeated whitespace.

### 2. Tokenization

The normalized text is split into individual tokens. For example:

```text
I am very happy today
```

becomes approximately:

```text
[i, am, very, happy, today]
```

### 3. Phrase matching

Emotion-specific phrases receive a larger score than individual words because phrases can provide stronger contextual evidence.

### 4. Keyword matching and frequency

Every matching emotion keyword contributes to that emotion's score. Repeated emotional words can therefore increase the corresponding score.

### 5. Basic negation handling

The classifier checks up to three tokens before a matched emotion word for terms such as `not`, `never`, `don't`, `didn't`, `cannot`, and `can't`. A nearby negation reduces the positive contribution of that keyword or phrase.

This is deliberately a **basic rule-based mechanism**, not a complete natural-language understanding system.

### 6. Confidence calculation

The returned confidence is a heuristic score derived from the strength/share of the best emotion score and its separation from the next strongest score. It is **not statistical model probability, calibrated accuracy, or benchmark accuracy**.

## Example API Request

The frontend sends:

```http
POST /api/predict
Content-Type: application/json
```

with:

```json
{
  "text": "I am very happy because I got selected for my dream job."
}
```

Example response:

```json
{
  "emotion": "joy",
  "label": "Joy",
  "emoji": "😊",
  "confidence": 92
}
```

The exact confidence can vary because it is calculated from the rule-based score set.

## Local Installation and VS Code Instructions

### Prerequisites

Install **Node.js 18 or newer** and VS Code.

### Step 1 — Open the project

1. Extract the ZIP file.
2. Open VS Code.
3. Select **File → Open Folder**.
4. Select the `Text-Emotion-Detection` folder.
5. Confirm that `netlify/functions/predict.js` exists.

### Step 2 — Open the VS Code terminal

In VS Code select **Terminal → New Terminal**.

### Step 3 — Install Netlify CLI

```bash
npm install -g netlify-cli
```

### Step 4 — Install project metadata

```bash
npm install
```

There are no project dependencies to download; `package.json` is intentionally minimal.

### Step 5 — Run locally

```bash
netlify dev
```

Open the local URL shown by Netlify CLI, normally similar to:

```text
http://localhost:8888
```

Do **not** open `index.html` directly when testing the API because the Netlify Function requires the Netlify development server.

### Alternative frontend-only preview

A normal static preview can show the UI, but prediction requires the Netlify Function. For full testing, use `netlify dev`.

## Netlify Deployment

### GitHub deployment

1. Create a new GitHub repository.
2. Upload all files and folders from `Text-Emotion-Detection`.
3. Log in to Netlify.
4. Choose **Add new project**.
5. Choose **Import an existing project**.
6. Select **GitHub**.
7. Select the project repository.
8. Use publish directory: `.`
9. Use functions directory: `netlify/functions`.
10. Deploy the project.

The included `netlify.toml` already contains these settings, so Netlify can read them automatically.

### Netlify CLI deployment

```bash
npm install
npm install -g netlify-cli
netlify login
netlify init
netlify dev
```

For a production deployment after initialization, the Netlify CLI can also be used with the site's normal deploy workflow. The repository-based deployment is recommended for a college project because future updates can be pushed through Git.

## LocalStorage Design

The browser uses this key:

```text
emotionHistory
```

Each record follows this structure:

```json
{
  "id": 123,
  "text": "I am happy today",
  "emotion": "joy",
  "label": "Joy",
  "emoji": "😊",
  "confidence": 91,
  "created_at": "2026-09-29 12:30:00"
}
```

Only the newest 50 records are retained. LocalStorage is browser-specific and should not be treated as a shared database.

## Security and Validation

- Requests must use HTTP POST.
- The request body must contain a string `text` field.
- Empty text is rejected.
- Text longer than 2,000 characters is rejected.
- Invalid JSON is rejected.
- The function returns generic server errors rather than internal details.
- No secrets or API keys are stored in source code.
- The dashboard uses an explicit HTML escaping function before inserting user-entered prediction text into the table.
- User text is not inserted into HTML through an unsanitized `innerHTML` path.
- LocalStorage is treated as untrusted browser data and parsed defensively.

## Limitations

1. This is a rule-based NLP classifier, not a trained deep-learning model.
2. It is designed primarily for English text.
3. Sarcasm, irony, slang and subtle context can be difficult to classify.
4. One sentence can contain multiple emotions, but the system returns one dominant category.
5. Negation handling is intentionally basic and checks only a nearby context window.
6. The confidence value is a heuristic score and must not be interpreted as model probability.
7. The included dataset is an educational demonstration dataset and has not been benchmarked as a production ML corpus.
8. LocalStorage history is stored only in the user's browser and is not synchronized between devices.

## Future Enhancements

- Train and deploy a supervised ML model using a benchmarked emotion dataset.
- Add lemmatization, stemming and stop-word analysis.
- Use contextual embeddings or transformer models through an appropriate server-side inference service.
- Add multilingual emotion detection.
- Support multi-label emotions.
- Add calibrated probabilities and formal evaluation metrics.
- Add confusion matrix and precision/recall/F1 evaluation using a fixed test set.
- Add user accounts and a proper database if the project moves beyond a free static/serverless architecture.

## Testing

| # | Input | Expected Emotion |
|---:|---|---|
| 1 | I am very happy today. | Joy |
| 2 | I lost my wallet. | Sadness |
| 3 | This makes me furious. | Anger |
| 4 | I am scared of the dark. | Fear |
| 5 | Wow, I didn't expect this. | Surprise |
| 6 | I love my family. | Love |
| 7 | The meeting starts at 10. | Neutral |
| 8 | We celebrated our success. | Joy |
| 9 | I feel lonely after the farewell. | Sadness |
| 10 | I am fed up with this unfair rule. | Anger |
| 11 | I am nervous about tomorrow's interview. | Fear |
| 12 | What a surprising announcement! | Surprise |
| 13 | My friends mean the world to me. | Love |
| 14 | Please send the document by email. | Neutral |
| 15 | I am not happy about the result. | Sadness / non-Joy signal |
| 16 | I am not angry anymore. | Neutral / reduced Anger signal |
| 17 | I don't feel sad today. | Neutral / reduced Sadness signal |
| 18 | I cannot believe we won! | Surprise |
| 19 | The excellent result made me smile. | Joy |
| 20 | The emergency made everyone worried. | Fear |

For tests involving negation, the implementation intentionally reduces the matched emotion rather than claiming full semantic reversal. The expected outcome can therefore depend on other words in the sentence.

## Viva Questions and Answers

### 1. What is NLP?
**Answer:** Natural Language Processing (NLP) is a field of artificial intelligence that enables computers to process, analyze and interpret human language.

### 2. What is emotion detection?
**Answer:** Emotion detection is the task of identifying an emotional category expressed or implied by a piece of text, such as joy, sadness, anger or fear.

### 3. What is text classification?
**Answer:** Text classification is the process of assigning a text document or sentence to one or more predefined categories. In this project, the categories are seven emotions.

### 4. What is tokenization?
**Answer:** Tokenization divides text into smaller units called tokens, commonly words or subwords. This project uses a simple whitespace-based tokenization approach after normalization.

### 5. What is keyword matching?
**Answer:** Keyword matching compares tokens in an input sentence against predefined emotion-specific dictionaries. A matching word contributes to the score of its associated emotion.

### 6. Why are phrases included?
**Answer:** Phrases can provide stronger context than isolated words. For example, `over the moon` is a stronger Joy signal than treating each word independently.

### 7. Why did you choose JavaScript?
**Answer:** Vanilla JavaScript runs directly in the browser and can also run in Netlify Functions through Node.js. It allows the project to remain lightweight without requiring a Python server.

### 8. Why Netlify?
**Answer:** Netlify provides free hosting for static web applications and supports serverless Functions. It is suitable for this project because the frontend and lightweight Node.js API can be deployed together.

### 9. What is a Netlify Function?
**Answer:** A Netlify Function is a serverless backend function that executes on demand. In this project, `predict.js` receives the text and returns the NLP classification result.

### 10. Why is SQLite not used?
**Answer:** The project requirement is a simple free Netlify deployment without a persistent database. Browser LocalStorage is sufficient for demonstration-level prediction history.

### 11. What is LocalStorage?
**Answer:** LocalStorage is a browser storage mechanism that stores key-value data on the user's device. It persists across page refreshes and browser sessions until the data is cleared.

### 12. What is the `emotionHistory` key?
**Answer:** It is the LocalStorage key used by the application to store an array of recent prediction objects.

### 13. What is a confidence score in this project?
**Answer:** It is a heuristic value calculated from emotion matching scores and the separation between the strongest and next strongest emotion. It is not a calibrated probability.

### 14. Is this a BERT model?
**Answer:** No. The project does not use BERT, transformers or deep learning. It uses transparent keyword and phrase-based NLP classification.

### 15. How does the system handle negation?
**Answer:** It checks a small context window before a matched emotion word for terms such as `not`, `never`, `don't`, `didn't`, `cannot` and `can't`. A nearby negation reduces the emotion's contribution.

### 16. Why is negation handling called basic?
**Answer:** Human language can contain complex negation, sarcasm and long-distance dependencies. Checking a few preceding tokens cannot fully understand all of these structures.

### 17. What are the seven classes?
**Answer:** Joy, Sadness, Anger, Fear, Surprise, Love and Neutral.

### 18. What happens if no emotion keyword is found?
**Answer:** The classifier falls back to Neutral and provides a heuristic confidence value rather than inventing an emotional signal.

### 19. What are the major limitations?
**Answer:** The classifier can struggle with sarcasm, mixed emotions, context-dependent meanings, slang, spelling variations and complex negation. It also does not provide benchmarked machine-learning accuracy.

### 20. What improvements can be added?
**Answer:** A future version could use a benchmarked dataset, supervised machine learning, transformer embeddings, multilingual processing, formal evaluation metrics, multi-label classification and calibrated probabilities.

### 21. Why is the dataset included if the classifier does not train on it?
**Answer:** The CSV provides educational examples for demonstration, documentation, manual testing and future ML extensions. The current classifier uses its JavaScript dictionaries rather than training from the CSV.

### 22. Why is the dataset not called a professional dataset?
**Answer:** The examples were prepared for this academic demonstration and have not undergone professional annotation, dataset balancing validation, inter-annotator agreement analysis or benchmark evaluation.

### 23. How is user input secured on the dashboard?
**Answer:** The dashboard escapes HTML-sensitive characters before displaying stored user text. This prevents stored prediction text from being interpreted as executable HTML.

### 24. Why is there a 2,000-character limit?
**Answer:** It keeps the request small and predictable, reduces unnecessary processing, and provides a clear validation boundary for a college demonstration application.

### 25. Can LocalStorage be used as a secure database?
**Answer:** No. LocalStorage is client-side storage and can be inspected or modified by the browser user. It is suitable here for non-sensitive demonstration history, not for confidential or authoritative records.

## Academic Note

This project is intended for **college learning, demonstration and viva discussion**. The classifier should not be used for medical, psychological, employment, safety or other high-stakes decisions. Emotion classification from text is inherently uncertain, and a rule-based score should not be treated as a diagnosis or objective measurement of a person's emotional state.

## License

For academic/project use. Add an institution-specific license if your college requires one.
