const STORAGE_KEY = 'emotionHistory';
const EMOTIONS = { joy: ['😊', 'Joy'], sadness: ['😢', 'Sadness'], anger: ['😡', 'Anger'], fear: ['😨', 'Fear'], surprise: ['😲', 'Surprise'], love: ['❤️', 'Love'], neutral: ['😐', 'Neutral'] };
const $ = id => document.getElementById(id);
function getHistory() { try { const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'); return Array.isArray(data) ? data : []; } catch { return []; } }
function escapeHTML(value) { return String(value).replace(/[&<>'"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c])); }
function render() {
  const history = getHistory(); const counts = Object.fromEntries(Object.keys(EMOTIONS).map(key => [key, 0]));
  history.forEach(item => { if (counts[item.emotion] !== undefined) counts[item.emotion]++; });
  const most = Object.entries(counts).sort((a,b) => b[1]-a[1])[0];
  $('totalPredictions').textContent = history.length;
  $('mostDetected').textContent = most && most[1] ? `${EMOTIONS[most[0]][0]} ${EMOTIONS[most[0]][1]}` : '—';
  $('mostDetectedCount').textContent = most && most[1] ? `${most[1]} prediction${most[1] === 1 ? '' : 's'}` : 'No predictions yet';
  $('uniqueEmotions').textContent = `${Object.values(counts).filter(Boolean).length} / 7`;
  $('historyCount').textContent = `${history.length} record${history.length === 1 ? '' : 's'}`;
  const max = Math.max(...Object.values(counts), 1);
  $('distribution').innerHTML = Object.entries(EMOTIONS).map(([key,[emoji,label]]) => `<div class="dist-row"><span class="dist-label"><span>${emoji}</span>${label}</span><div class="bar-track"><div class="bar-fill" style="width:${(counts[key]/max)*100}%"></div></div><strong>${counts[key]}</strong></div>`).join('');
  $('historyBody').innerHTML = history.map(item => `<tr><td>${escapeHTML(item.text)}</td><td class="emotion-cell">${escapeHTML(item.emoji || EMOTIONS[item.emotion]?.[0] || '😐')} ${escapeHTML(item.label || 'Neutral')}</td><td class="confidence-cell">${Number(item.confidence) || 0}%</td><td>${escapeHTML(item.created_at || '—')}</td></tr>`).join('');
  $('emptyState').classList.toggle('hidden', history.length > 0);
  $('historyBody').parentElement.classList.toggle('hidden', history.length === 0);
}
$('clearHistoryBtn').addEventListener('click', () => { const history = getHistory(); if (!history.length) return; if (window.confirm('Clear all saved prediction history from this browser? This cannot be undone.')) { localStorage.removeItem(STORAGE_KEY); render(); } });
render();
