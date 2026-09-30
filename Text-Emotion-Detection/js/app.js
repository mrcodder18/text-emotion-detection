const textInput = document.getElementById('emotionText');
const charCount = document.getElementById('charCount');
const detectBtn = document.getElementById('detectBtn');
const clearBtn = document.getElementById('clearBtn');
const errorMessage = document.getElementById('errorMessage');
const resultCard = document.getElementById('resultCard');
const resultEmoji = document.getElementById('resultEmoji');
const resultLabel = document.getElementById('resultLabel');
const confidenceValue = document.getElementById('confidenceValue');
const confidenceText = document.getElementById('confidenceText');
const confidenceBar = document.getElementById('confidenceBar');
const STORAGE_KEY = 'emotionHistory';
const MAX_HISTORY = 50;

function updateCount() { charCount.textContent = `${textInput.value.length} / 2000`; }
function showError(message) { errorMessage.textContent = message; errorMessage.classList.remove('hidden'); }
function hideError() { errorMessage.classList.add('hidden'); errorMessage.textContent = ''; }
function setLoading(isLoading) { detectBtn.disabled = isLoading; detectBtn.querySelector('.btn-text').textContent = isLoading ? 'Analyzing…' : 'Detect Emotion'; detectBtn.querySelector('.loader').classList.toggle('hidden', !isLoading); }
function getHistory() { try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } }
function savePrediction(result, text) {
  const history = getHistory();
  history.unshift({ id: Date.now(), text, emotion: result.emotion, label: result.label, emoji: result.emoji, confidence: result.confidence, created_at: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }) });
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history.slice(0, MAX_HISTORY)));
}
async function detectEmotion() {
  hideError();
  const text = textInput.value.trim();
  if (!text) { showError('Please enter some text before detecting the emotion.'); textInput.focus(); return; }
  if (text.length > 2000) { showError('Text cannot exceed 2000 characters.'); return; }
  setLoading(true); resultCard.classList.add('hidden');
  try {
    const response = await fetch('/api/predict', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
    let data;
    try { data = await response.json(); } catch { throw new Error('The server returned an invalid response.'); }
    if (!response.ok) throw new Error(data.error || 'Unable to analyze the text right now.');
    if (!data.emotion || !data.label || !Number.isFinite(data.confidence)) throw new Error('The prediction response is incomplete.');
    resultEmoji.textContent = data.emoji || '😐'; resultLabel.textContent = data.label; confidenceValue.textContent = `${data.confidence}%`; confidenceText.textContent = `${data.confidence}%`; confidenceBar.style.width = `${Math.min(100, Math.max(0, data.confidence))}%`; resultCard.classList.remove('hidden');
    savePrediction(data, text);
  } catch (error) { showError(error.message || 'A network error occurred. Please try again.'); }
  finally { setLoading(false); }
}
textInput.addEventListener('input', updateCount);
detectBtn.addEventListener('click', detectEmotion);
clearBtn.addEventListener('click', () => { textInput.value = ''; updateCount(); hideError(); resultCard.classList.add('hidden'); textInput.focus(); });
document.querySelectorAll('[data-example]').forEach(button => button.addEventListener('click', () => { textInput.value = button.dataset.example; updateCount(); hideError(); textInput.focus(); }));
textInput.addEventListener('keydown', event => { if ((event.ctrlKey || event.metaKey) && event.key === 'Enter') detectEmotion(); });
updateCount();
