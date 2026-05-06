/* ============================================
   PRESETS.JS — Quick app swap presets &
                preset button builder
   ============================================ */
"use strict";

const APP_PRESETS = {
  compose: {
    label:'🎂 Age Calculator',
    badge:'🚀 JUST SHIPPED',
    h1:'🎂 Age Calculator', h2:'Android App',
    subtitle:'Built with Jetpack Compose',
    desc:'A simple age calculator that determines your life stage.',
    lifeStages:'👶 Child → 🧑 Teen → 👔 Adult → 👴 Senior',
    features:[
      'Kotlin + Jetpack Compose',
      'Material 3 Design',
      'State Management (remember + mutableStateOf)',
      'Dark / Light Theme Support',
      'Open Source on GitHub'
    ],
    badges:[
      {label:'Kotlin',    color:'#7F52FF'},
      {label:'Compose',   color:'#03DAC5'},
      {label:'Material 3',color:'#6750A4'},
      {label:'GitHub',    color:'#333333'}
    ],
    github:'📂 github.com/atanucsejgec/AgeCalculator',
    author:'@atanucsejgec | Android Developer'
  },
  todo: {
    label:'📝 Todo App',
    badge:'✅ NEW RELEASE',
    h1:'📝 Todo Master', h2:'Android App',
    subtitle:'Built with Room DB + Jetpack Compose',
    desc:'Feature-rich todo app with categories, reminders and sync.',
    lifeStages:'📋 Add → ✏️ Edit → ✅ Done → 🗑️ Delete',
    features:[
      'Room Database for persistence',
      'MVVM Architecture Pattern',
      'LiveData + ViewModel',
      'CRUD Operations',
      'Category filters & search'
    ],
    badges:[
      {label:'Kotlin', color:'#7F52FF'},
      {label:'Room DB',color:'#00897b'},
      {label:'MVVM',   color:'#6750A4'},
      {label:'Compose',color:'#03DAC5'}
    ],
    github:'📂 github.com/username/TodoMaster',
    author:'@username | Android Developer'
  },
  weather: {
    label:'🌤️ Weather App',
    badge:'🌤️ LIVE WEATHER',
    h1:'🌤️ WeatherNow', h2:'Android App',
    subtitle:'Real-time Weather with Retrofit + API',
    desc:'Real-time weather forecasts with GPS-based location detection.',
    lifeStages:'☀️ Sunny → 🌧️ Rainy → ❄️ Snow → ⛅ Cloudy',
    features:[
      'OpenWeatherMap API integration',
      'Retrofit + OkHttp networking',
      'Kotlin Coroutines + Flow',
      'GPS Location detection',
      '5-day weather forecast'
    ],
    badges:[
      {label:'Kotlin',    color:'#7F52FF'},
      {label:'Retrofit',  color:'#e53935'},
      {label:'Coroutines',color:'#FF6F00'},
      {label:'API',       color:'#1565C0'}
    ],
    github:'📂 github.com/username/WeatherNow',
    author:'@username | Android Developer'
  },
  chat: {
    label:'💬 Chat App',
    badge:'💬 JUST LAUNCHED',
    h1:'💬 ChatSphere', h2:'Android App',
    subtitle:'Real-time Chat powered by Firebase',
    desc:'Full-featured chat app with push notifications and media sharing.',
    lifeStages:'👤 Login → 💬 Chat → 📸 Share → 🔔 Notify',
    features:[
      'Firebase Realtime Database',
      'Firebase Authentication',
      'Push Notifications (FCM)',
      'Image & file sharing',
      'Online / offline status'
    ],
    badges:[
      {label:'Kotlin',  color:'#7F52FF'},
      {label:'Firebase',color:'#FF6F00'},
      {label:'Compose', color:'#03DAC5'},
      {label:'FCM',     color:'#e53935'}
    ],
    github:'📂 github.com/username/ChatSphere',
    author:'@username | Android Developer'
  },
  quiz: {
    label:'🧠 Quiz App',
    badge:'🧠 BRAIN TESTER',
    h1:'🧠 QuizMaster', h2:'Android App',
    subtitle:'Interactive Quiz with Leaderboard',
    desc:'10+ categories, timed questions, and a live leaderboard.',
    lifeStages:'🎯 Start → ❓ Quiz → ⏱️ Timer → 🏆 Score',
    features:[
      '10+ Quiz Categories',
      'Timer-based questions',
      'Leaderboard with SQLite',
      'Animations with Compose',
      'Score sharing feature'
    ],
    badges:[
      {label:'Kotlin',    color:'#7F52FF'},
      {label:'SQLite',    color:'#558B2F'},
      {label:'Compose',   color:'#03DAC5'},
      {label:'Animation', color:'#9c27b0'}
    ],
    github:'📂 github.com/username/QuizMaster',
    author:'@username | Android Developer'
  }
};

/* ===== BUILD PRESET BUTTONS ===== */
function buildPresetButtons() {
  const container = document.getElementById('presetButtons');
  container.innerHTML = Object.entries(APP_PRESETS).map(([key,p]) => `
    <button class="btn btn-secondary preset-btn"
            onclick="loadPreset('${key}')">
      ${p.label}
    </button>
  `).join('');
}

/* ===== LOAD A PRESET ===== */
function loadPreset(key) {
  const p = APP_PRESETS[key];
  if (!p) return;

  document.getElementById('badgeText').value   = p.badge;
  document.getElementById('headline1').value   = p.h1;
  document.getElementById('headline2').value   = p.h2;
  document.getElementById('subtitle').value    = p.subtitle;
  document.getElementById('description').value = p.desc;
  document.getElementById('lifeStages').value  = p.lifeStages;
  document.getElementById('githubLink').value  = p.github;
  document.getElementById('authorName').value  = p.author;

  AppState.features = [...p.features];
  AppState.badges   = JSON.parse(JSON.stringify(p.badges));

  renderFeatureList();
  renderBadgeList();
  renderBanner();

  // Clear screenshots
  [0,1,2].forEach(i => removeSlot(i));

  showNotification('📱 Loaded: ' + p.label);
}