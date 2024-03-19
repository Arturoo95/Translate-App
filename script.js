const API_URL = "https://api.mymemory.translated.net/get?q=";

// DOM elements
const btn = document.querySelector(".btn");
const inputValue = document.getElementById("translateFromTXTArea");
const translation = document.getElementById("translateToTXTArea");
const languagesFrom = document.getElementById("languagesFrom");
const languagesTo = document.getElementById("languagesTo");
const icon = document.getElementById("icon");
const closeBtn = document.querySelector(".clear-btn");

// Event listeners
inputValue.addEventListener("keypress", handleKeyPress);
btn.addEventListener("click", translateText);
closeBtn.addEventListener("click", clearInputs);
inputValue.addEventListener("input", toggleCloseButton);
icon.addEventListener("click", swapLanguages);
languagesFrom.addEventListener("change", handleLanguageChange);
languagesTo.addEventListener("change", handleLanguageChange);
btn.addEventListener("click", translateText);
closeBtn.addEventListener("click", closePopup);

function showPopup() {
  const popupContent = document.querySelector(".popup-content");
  const popup = document.getElementById("popup");
  popup.style.display = "block";

  popup.classList.add("show");
}

// Function to hide the popup message
function closePopup() {
  const popup = document.getElementById("popup");
  const popupContent = document.querySelector(".popup-content");
  popup.style.display = "none";

  popup.classList.remove("show");

  setTimeout(() => {
    popup.style.display = "none";
  }, 300);
}

// Functions
async function translateText() {
  const translateFrom = languagesFrom.value;
  const translateTo = languagesTo.value;
  const text = inputValue.value.trim();

  if (translateFrom === translateTo) {
    showPopup();
    return;
  }

  if (!text) return;

  translation.setAttribute("placeholder", "Please Wait...");

  try {
    const response = await fetch(
      `${API_URL}${text}&langpair=${translateFrom}|${translateTo}`
    );
    const data = await response.json();
    console.log(data.responseData);

    if (data.responseData) {
      translation.value = data.responseData.translatedText;
    } else if (data.matches && data.matches.length > 0) {
      translation.value = data.matches[0].translation;
    }
  } catch (error) {
    console.error("Error:", error);
    translation.value = "Translation Error";
  }
}

function clearInputs() {
  inputValue.value = "";
  translation.value = "";
  closeBtn.classList.add("hidden");
  translation.setAttribute("placeholder", "Translation");
}

function toggleCloseButton() {
  closeBtn.classList.toggle("hidden", !inputValue.value);
}

function swapLanguages() {
  [inputValue.value, translation.value] = [translation.value, inputValue.value];
  [languagesFrom.value, languagesTo.value] = [
    languagesTo.value,
    languagesFrom.value,
  ];
}

function handleLanguageChange() {
  console.log("From Language:", languagesFrom.value);
  console.log("To Language:", languagesTo.value);
}

function handleKeyPress(event) {
  if (event.key === "Enter") {
    translateText();
  }
}
