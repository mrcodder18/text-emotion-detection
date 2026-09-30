const EMOTIONS = {
  joy: { label: 'Joy', emoji: '😊', keywords: ['happy','happiness','joy','joyful','glad','cheerful','delighted','pleased','excited','thrilled','wonderful','amazing','fantastic','great','excellent','success','successful','win','winner','winning','celebrate','celebration','smile','smiling','laugh','laughing','fun','funny','hopeful','optimistic','proud','pride','relieved','relief','enjoy','enjoying','enjoyed','blessed','grateful','thankful','eager','energetic','brilliant','awesome','lovely','merry','playful','satisfied','satisfaction','achievement','achieved'], phrases: ['on cloud nine','over the moon','good news','made my day','best day','so happy','very happy','really excited','could not be happier','cannot be happier','full of joy','happy for you','proud of myself'] },
  sadness: { label: 'Sadness', emoji: '😢', keywords: ['sad','sadness','unhappy','upset','depressed','cry','crying','tears','tearful','lonely','loneliness','grief','grieving','loss','lost','heartbroken','hurt','pain','painful','miserable','hopeless','hopelessness','disappointed','disappointment','regret','regretful','sorrow','sorrowful','gloomy','downcast','empty','miss','missing','failed','failure','rejected','rejection','goodbye','farewell','broken','devastated','mourning','sorry','disheartened','discouraged'], phrases: ['feel alone','feeling lonely','feel terrible','feel awful','broke my heart','broken heart','lost my','miss you','miss them','bad news','not okay','not okay at all','tears in my eyes','deeply disappointed','really sad'] },
  anger: { label: 'Anger', emoji: '😡', keywords: ['angry','anger','mad','furious','rage','raging','annoyed','annoying','irritated','irritating','frustrated','frustrating','outraged','outrage','hate','hated','hatred','resent','resentment','insulted','offended','unfair','injustice','revenge','argue','arguing','fight','fighting','yell','yelling','shout','shouting','scream','screaming','blame','blaming','disgusted','disgusting','betrayed','betrayal','infuriating','aggravated','aggravating','impatient','impatience','hostile','hostility'], phrases: ['so angry','very angry','really angry','makes me angry','drives me crazy','fed up','had enough','not fair','how dare you','leave me alone','lost my temper','boiling with anger','sick of this'] },
  fear: { label: 'Fear', emoji: '😨', keywords: ['afraid','fear','fearful','scared','scary','terrified','terror','frightened','frightening','worried','worry','worrying','anxious','anxiety','nervous','panic','panicked','danger','dangerous','threat','threatened','risk','unsafe','uncertain','uncertainty','dread','dreading','horror','horrified','alarmed','alarm','shaking','trembling','nightmare','emergency','cautious','caution','vulnerable','helpless','concerned','concern'], phrases: ['scared of','afraid of','worried about','nervous about','fear of','full of fear','in danger','what if','i am scared','i feel unsafe','heart was pounding','cannot stop worrying'] },
  surprise: { label: 'Surprise', emoji: '😲', keywords: ['surprise','surprised','surprising','unexpected','unexpectedly','astonished','astonishing','amazed','amazing','shocked','shock','stunned','stunning','wow','whoa','unbelievable','incredible','sudden','suddenly','speechless','disbelief','disbelieving','startled','startling','reveal','revealed','unexpectedly','marvel','marvelled'], phrases: ['i did not expect','did not see that coming','cannot believe it','can not believe it','what a surprise','oh my god','oh wow','no way','out of nowhere','never expected','completely unexpected','caught me off guard'] },
  love: { label: 'Love', emoji: '❤️', keywords: ['love','loved','loving','romance','romantic','affection','affectionate','care','caring','adorable','adore','cherish','cherished','devotion','devoted','sweetheart','darling','kiss','kissing','hug','hugging','family','friendship','friend','friends','partner','husband','wife','mother','father','sister','brother','kindness','kind','warm','tender','trust','trusted','support','supportive','appreciate','appreciation','together','belong','beloved','passion','passionate','compassion','compassionate'], phrases: ['i love you','love you','love my family','love my friends','care about you','care for you','dearly love','fall in love','in love','best friend','my favorite person','means the world','close to my heart','with all my heart'] },
  neutral: { label: 'Neutral', emoji: '😐', keywords: ['meeting','report','office','school','college','class','assignment','project','schedule','today','tomorrow','yesterday','morning','afternoon','evening','document','computer','book','table','chair','room','street','city','weather','information','details','number','phone','email','message','website','system','software','program','data','study','work','lunch','dinner','train','bus','arrive','leave','start','finish','available','open','closed','normal','usual','regular','simple','okay','fine','perhaps','maybe'], phrases: ['the meeting starts','i have a meeting','the class starts','according to the report','today is','it is monday','the system is','please send','please confirm','i am at','there is','there are','i will go','i will attend'] }
};

const NEGATIONS = new Set(['not','no','never','don’t',"don't",'doesn’t',"doesn't",'didn’t',"didn't",'cannot',"can't",'cant','won’t',"won't",'without']);
const EMOTION_KEYS = Object.keys(EMOTIONS);

function normalize(text) {
  return text.toLowerCase().replace(/[“”‘’]/g, "'").replace(/[^\p{L}\p{N}'\s-]/gu, ' ').replace(/\s+/g, ' ').trim();
}
function tokenize(text) { return text.split(/\s+/).filter(Boolean); }
function isNegated(tokens, index) {
  const start = Math.max(0, index - 3);
  for (let i = start; i < index; i++) if (NEGATIONS.has(tokens[i])) return true;
  return false;
}
function wordBoundaryRegex(phrase) { return new RegExp(`(^|\\s)${phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?=\\s|$)`, 'i'); }
function classify(text) {
  const normalized = normalize(text);
  const tokens = tokenize(normalized);
  const scores = Object.fromEntries(EMOTION_KEYS.map(key => [key, 0]));
  const matches = Object.fromEntries(EMOTION_KEYS.map(key => [key, []]));

  for (const emotion of EMOTION_KEYS) {
    const dict = EMOTIONS[emotion];
    for (const phrase of dict.phrases) {
      if (wordBoundaryRegex(phrase).test(normalized)) {
        const phraseTokens = phrase.split(/\s+/);
        const firstIndex = tokens.findIndex((t, i) => t === phraseTokens[0] && tokens.slice(i, i + phraseTokens.length).join(' ') === phrase);
        const negated = firstIndex >= 0 && isNegated(tokens, firstIndex);
        scores[emotion] += negated ? -2.5 : 4;
        matches[emotion].push(phrase);
      }
    }
    const keywordSet = new Set(dict.keywords);
    tokens.forEach((token, index) => {
      const clean = token.replace(/^'+|'+$/g, '');
      if (keywordSet.has(clean)) {
        const negated = isNegated(tokens, index);
        scores[emotion] += negated ? -1.25 : 1.35;
        matches[emotion].push(clean);
      }
    });
  }

  // Neutral is a fallback, not a competing emotion when a strong emotional cue exists.
  const emotionalKeys = EMOTION_KEYS.filter(k => k !== 'neutral');
  const strongestEmotional = Math.max(...emotionalKeys.map(k => scores[k]));
  if (strongestEmotional > 0) scores.neutral = Math.max(0, scores.neutral - strongestEmotional * 0.65);

  let best = EMOTION_KEYS[0];
  for (const key of EMOTION_KEYS) if (scores[key] > scores[best]) best = key;
  if (scores[best] <= 0) best = 'neutral';

  const positiveScores = EMOTION_KEYS.map(k => Math.max(0, scores[k]));
  const total = positiveScores.reduce((a,b) => a+b, 0);
  const bestScore = Math.max(0, scores[best]);
  const second = Math.max(...EMOTION_KEYS.filter(k => k !== best).map(k => Math.max(0, scores[k])));
  let confidence;
  if (best === 'neutral' && bestScore <= 0) confidence = Math.min(82, 62 + Math.min(20, Math.round(tokens.length / 8)));
  else {
    const share = total ? bestScore / total : 0;
    const margin = bestScore ? (bestScore - second) / bestScore : 0;
    confidence = Math.round(Math.min(98, Math.max(55, 58 + share * 30 + margin * 10)));
  }
  if (matches[best].length >= 3) confidence = Math.min(99, confidence + 3);
  return { emotion: best, label: EMOTIONS[best].label, emoji: EMOTIONS[best].emoji, confidence };
}

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') return { statusCode: 405, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ error: 'Method not allowed. Use POST.' }) };
  try {
    if (!event.body) return { statusCode: 400, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ error: 'Request body is required.' }) };
    let payload;
    try { payload = JSON.parse(event.body); } catch { return { statusCode: 400, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ error: 'Invalid JSON request.' }) }; }
    if (!payload || typeof payload.text !== 'string') return { statusCode: 400, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ error: 'The text field must be a string.' }) };
    const text = payload.text.trim();
    if (!text) return { statusCode: 400, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ error: 'Please enter some text before detecting the emotion.' }) };
    if (text.length > 2000) return { statusCode: 413, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ error: 'Text cannot exceed 2000 characters.' }) };
    const result = classify(text);
    return { statusCode: 200, headers: {'Content-Type':'application/json','Cache-Control':'no-store'}, body: JSON.stringify(result) };
  } catch (error) {
    console.error('Prediction error:', error.message);
    return { statusCode: 500, headers: {'Content-Type':'application/json'}, body: JSON.stringify({ error: 'The emotion classifier encountered an unexpected error.' }) };
  }
};
