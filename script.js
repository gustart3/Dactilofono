const AudioContext = window.AudioContext || window.webkitAudioContext;
const audioContext = new AudioContext();

const notes = {
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
};

const frequencies = {
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
};

function playSound(frequency) {
  const oscillator = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.setValueAtTime(frequency, audioContext.currentTime);
  oscillator.connect(audioContext.destination);
  oscillator.start();
  oscillator.stop(audioContext.currentTime + 0.5);
}

document.addEventListener("keydown", (event) => {
  const note = notes[event.key.toUpperCase()];
  if (note) {
    const frequency = frequencies[note];
    playSound(frequency);
  }
});

document.querySelectorAll(".key").forEach((key) => {
  key.addEventListener("click", () => {
    const note = key.getAttribute("data-note");
    const frequency = frequencies[note];
    playSound(frequency);
  });
});
