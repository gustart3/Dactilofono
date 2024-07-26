const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();
let currentScale = 3; // Iniciar con la tercera escala por defecto

const scales = {
  2: {
    label: "C2 - C4",
    notes: {
      Z: "C2",
      S: "C#2",
      X: "D2",
      D: "D#2",
      C: "E2",
      V: "F2",
      G: "F#2",
      B: "G2",
      H: "G#2",
      N: "A2",
      J: "A#2",
      M: "B2",
      ",": "C3",
      L: "C#3",
      ".": "D3",
      A: "D#3",
      Q: "E3",
      W: "F3",
      E: "F#3",
      R: "G3",
      T: "G#3",
      Y: "A3",
      U: "A#3",
      I: "B3",
      O: "C4",
    },
    frequencies: {
      C2: 65.41,
      "C#2": 69.3,
      D2: 73.42,
      "D#2": 77.78,
      E2: 82.41,
      F2: 87.31,
      "F#2": 92.5,
      G2: 98.0,
      "G#2": 103.83,
      A2: 110.0,
      "A#2": 116.54,
      B2: 123.47,
      C3: 130.81,
      "C#3": 138.59,
      D3: 146.83,
      "D#3": 155.56,
      E3: 164.81,
      F3: 174.61,
      "F#3": 185.0,
      G3: 196.0,
      "G#3": 207.65,
      A3: 220.0,
      "A#3": 233.08,
      B3: 246.94,
      C4: 261.63,
    },
  },
  3: {
    label: "C4 - C6",
    notes: {
      Z: "C4",
      S: "C#4",
      X: "D4",
      D: "D#4",
      C: "E4",
      V: "F4",
      G: "F#4",
      B: "G4",
      H: "G#4",
      N: "A4",
      J: "A#4",
      M: "B4",
      ",": "C5",
      L: "C#5",
      ".": "D5",
      A: "D#5",
      Q: "E5",
      W: "F5",
      E: "F#5",
      R: "G5",
      T: "G#5",
      Y: "A5",
      U: "A#5",
      I: "B5",
      O: "C6",
    },
    frequencies: {
      C4: 261.63,
      "C#4": 277.18,
      D4: 293.66,
      "D#4": 311.13,
      E4: 329.63,
      F4: 349.23,
      "F#4": 369.99,
      G4: 392.0,
      "G#4": 415.3,
      A4: 440.0,
      "A#4": 466.16,
      B4: 493.88,
      C5: 523.25,
      "C#5": 554.37,
      D5: 587.33,
      "D#5": 622.25,
      E5: 659.26,
      F5: 698.46,
      "F#5": 739.99,
      G5: 783.99,
      "G#5": 830.61,
      A5: 880.0,
      "A#5": 932.33,
      B5: 987.77,
      C6: 1046.5,
    },
  },
  4: {
    label: "C6 - C8",
    notes: {
      Z: "C6",
      S: "C#6",
      X: "D6",
      D: "D#6",
      C: "E6",
      V: "F6",
      G: "F#6",
      B: "G6",
      H: "G#6",
      N: "A6",
      J: "A#6",
      M: "B6",
      ",": "C7",
      L: "C#7",
      ".": "D7",
      A: "D#7",
      Q: "E7",
      W: "F7",
      E: "F#7",
      R: "G7",
      T: "G#7",
      Y: "A7",
      U: "A#7",
      I: "B7",
      O: "C8",
    },
    frequencies: {
      C6: 1046.5,
      "C#6": 1108.73,
      D6: 1174.66,
      "D#6": 1244.51,
      E6: 1318.51,
      F6: 1396.91,
      "F#6": 1480.0,
      G6: 1567.98,
      "G#6": 1661.22,
      A6: 1760.0,
      "A#6": 1864.66,
      B6: 1975.53,
      C7: 2093.0,
      "C#7": 2217.46,
      D7: 2349.32,
      "D#7": 2489.02,
      E7: 2637.02,
      F7: 2793.83,
      "F#7": 2959.96,
      G7: 3135.96,
      "G#7": 3322.44,
      A7: 3520.0,
      "A#7": 3729.31,
      B7: 3951.07,
      C8: 4186.01,
    },
  },
};

let notes = scales[currentScale].notes;
let frequencies = scales[currentScale].frequencies;

const activeOscillators = {};
const gainNode = audioContext.createGain();
gainNode.gain.value = 0.5; // Valor inicial del volumen
gainNode.connect(audioContext.destination);

function playSound(note) {
  const frequency = frequencies[note];
  if (!activeOscillators[note]) {
    const oscillator = audioContext.createOscillator();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
    oscillator.connect(gainNode);
    oscillator.start();
    activeOscillators[note] = oscillator;
  }
}

function stopSound(note) {
  if (activeOscillators[note]) {
    activeOscillators[note].stop();
    delete activeOscillators[note];
  }
}

function displayNote(note) {
  const noteDisplay = document.getElementById("noteDisplay");
  noteDisplay.textContent = note;
}

function updateScale(scale) {
  currentScale = scale;
  notes = scales[currentScale].notes;
  frequencies = scales[currentScale].frequencies;
  const scaleLabel = document.getElementById("scaleLabel");
  scaleLabel.textContent = scales[currentScale].label;
}

document.addEventListener("keydown", (event) => {
  const key = event.key.toUpperCase();
  const note = notes[key];
  if (note) {
    playSound(note);
    displayNote(note);
  }
});

document.addEventListener("keyup", (event) => {
  const key = event.key.toUpperCase();
  const note = notes[key];
  if (note) {
    stopSound(note);
    displayNote("");
  }
});

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("mousedown", () => {
    const keyNote = key.getAttribute("data-note");
    const note = notes[keyNote];
    playSound(note);
    displayNote(note);
  });

  key.addEventListener("mouseup", () => {
    const keyNote = key.getAttribute("data-note");
    const note = notes[keyNote];
    stopSound(note);
    displayNote("");
  });

  key.addEventListener("touchstart", () => {
    const keyNote = key.getAttribute("data-note");
    const note = notes[keyNote];
    playSound(note);
    displayNote(note);
  });

  key.addEventListener("touchend", () => {
    const keyNote = key.getAttribute("data-note");
    const note = notes[keyNote];
    stopSound(note);
    displayNote("");
  });
});

document.getElementById("volumeSlider").addEventListener("input", (event) => {
  gainNode.gain.value = parseFloat(event.target.value);
});

document.getElementById("scaleSelector").addEventListener("input", (event) => {
  const scale = parseInt(event.target.value, 10);
  updateScale(scale);
});
