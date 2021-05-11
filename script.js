const imgContainer = document.getElementById("img-container");
const toggleBtn = document.getElementById("toggle-btn");
const textBoxContainer = document.getElementById("text-box-container");
const textBox = document.getElementById("text-box");
const closeBtn = document.getElementById("close-btn");
const selectVoice = document.getElementById("voice");
const textBtn = document.getElementById("text-btn");
const textArea = document.getElementById("text-area");


toggleBtn.addEventListener("click", () => {
    textBox.classList.toggle("show");
})
closeBtn.addEventListener("click", () => {
    textBox.classList.remove("show");
})
window.speechSynthesis.addEventListener("voiceschanged", getVoices)
imgContainer.addEventListener("click", imgVoice)
textBtn.addEventListener("click", readText)

let voices = [];
let message = new SpeechSynthesisUtterance();
function getVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
        const voiceOption = document.createElement("option");
        voiceOption.textContent = `${voice.name} ${voice.lang}`;
        voiceOption.value = `${voice.name}`;
        selectVoice.appendChild(voiceOption);
    })
}

function imgVoice(e) {
    if (!e.target.classList.contains("img-container")) {
        message.text = e.target.parentElement.lastElementChild.innerText.trim();
        message.voice = voices.find(voice => voice.name === selectVoice.value)
        speechSynthesis.speak(message)
    }
}

function readText() {
    message.text = textArea.value.trim();
    message.voice = voices.find(voice => voice.name === selectVoice.value)
    speechSynthesis.speak(message)
}

