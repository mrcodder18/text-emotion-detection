const input = document.getElementById("textInput");
const count = document.getElementById("charCount");

input.addEventListener("input", () => {
    count.textContent = `${input.value.length} / 2000`;
});

function setExample(text) {
    input.value = text;
    input.dispatchEvent(new Event("input"));
}

async function analyzeText() {
    const text = input.value.trim();
    const error = document.getElementById("error");
    const result = document.getElementById("result");
    const button = document.getElementById("analyzeBtn");

    error.textContent = "";
    if (!text) {
        error.textContent = "Please enter some text first.";
        return;
    }

    button.disabled = true;
    button.textContent = "Analyzing...";

    try {
        const response = await fetch("/api/predict", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({text})
        });
        const data = await response.json();

        if (!response.ok) throw new Error(data.error || "Prediction failed.");

        document.getElementById("resultEmoji").textContent = data.emoji;
        document.getElementById("resultEmotion").textContent = data.label;
        document.getElementById("confidenceText").textContent = `${data.confidence}%`;
        document.getElementById("confidenceBar").style.width = `${data.confidence}%`;
        result.classList.remove("hidden");
    } catch (e) {
        error.textContent = e.message;
    } finally {
        button.disabled = false;
        button.textContent = "Detect Emotion";
    }
}
