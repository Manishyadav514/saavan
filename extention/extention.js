const baseURL = "./extention";

// Function to create the entire widget within <wcag-access-widget-ui> parent tag
function createWidget() {
  const widgetContainer = document.createElement("div"); // Create <wcag-access-widget-ui> parent tag
  widgetContainer.classList.add("wcag-widget-container");
  widgetContainer.id = "wcag-widget-container";
  createImageButton(widgetContainer); // Call function to create the button and inject it into the widget container
  createPopup(widgetContainer);
  loadHTML(widgetContainer);
  document.body.appendChild(widgetContainer); // Append the widget container to the body
}

function createImageButton(parentElement) {
  const img = document.createElement("img");
  img.src = `${baseURL}/accessibility.png`;
  img.alt = "Accessibility Icon"; // Alternative text for accessibility
  img.classList.add("wcag-buttonImg"); // Add a class to the image (optional)
  img.type = "button";
  img.onclick = togglePopup; // Attach togglePopup function to click event
  parentElement.appendChild(img);
}

// open popup
function togglePopup() {
  var popupContainerDiv = document.getElementById("wcag-popup-container");
  if (popupContainerDiv.style.visibility === "hidden") {
    popupContainerDiv.style.visibility = "visible";
  } else {
    popupContainerDiv.style.visibility = "hidden";
  }
}

// Function to create a popup
function createPopup(parentElement) {
  const popupContainer = document.createElement("div");
  popupContainer.classList.add("wcag-popup-container"); // Add a class to the popup container
  popupContainer.id = "wcag-popup-container";
  popupContainer.style.visibility = "hidden";
  parentElement.appendChild(popupContainer);
}

// Function to dynamically load external CSS file
function loadCSS() {
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.type = "text/css";
  link.href = `${baseURL}/extention.css`;
  document.head.appendChild(link);
}

function loadHTML() {
  fetch(`${baseURL}/popup.html`)
    .then((response) => response.text()) // Convert response to text
    .then((html) => {
      document.getElementById("wcag-popup-container").innerHTML = html;
    })
    .catch((error) => {
      console.error("Error fetching HTML:", error);
    });
}
//
function replaceImages() {
  const images = document.querySelectorAll("img");
  images.forEach((img) => {
    if (!img.classList.contains("wcag-buttonImg")) {
      img.setAttribute("aria-hidden", "true");
      img.style.visibility =
        img.style.visibility === "hidden" ? "visible" : "hidden";
    }
  });
  document.getElementById("wcag-image-remove").classList.toggle("active");
}

function mutePlayingAudio() {
  const audioElements = document.querySelectorAll("audio");
  audioElements.forEach((audio) => {
    if (!audio.paused && audio.currentTime > 0 && !audio.ended) {
      audio.muted = true;
    }
  });
  document.getElementById("wcag-audio-mute").classList.toggle("active");
}

//Mine

let adhdOverlay;
let adhdModeEnabled = false;

function toggleADHDMode() {
  adhdModeEnabled = !adhdModeEnabled;
  document.body.classList.toggle("adhd-mode");

  if (adhdModeEnabled) {
    enableADHDMode();
  } else {
    disableADHDMode();
  }
  document.getElementById("wcag-adhd-mode").classList.toggle("active");
}

function enableADHDMode() {
  adhdOverlay = document.createElement("div");
  adhdOverlay.classList.add("adhd-overlay");
  document.body.appendChild(adhdOverlay);
  adhdOverlay.classList.add("active");

  document.addEventListener("mousemove", updateADHDOverlay);
}

function disableADHDMode() {
  document.removeEventListener("mousemove", updateADHDOverlay);
  adhdOverlay.remove();
}

function updateADHDOverlay(event) {
  adhdOverlay.style.top = `${event.clientY - 50}px`; // Center the overlay vertically
  adhdOverlay.style.left = "0"; // Position the overlay at the left edge of the screen
}

//cognitive disability mode

let cognitiveModeEnabled = false;

function toggleCognitiveMode() {
  cognitiveModeEnabled = !cognitiveModeEnabled;
  document.body.classList.toggle("cognitive-mode");
  document.getElementById("wcag-cognitive-mode").classList.toggle("active");
}


let keyboardModeEnabled = false;

function toggleKeyboardMode() {
    keyboardModeEnabled = !keyboardModeEnabled;
    document.body.classList.toggle('keyboard-mode');

    if (keyboardModeEnabled) {
        enableKeyboardMode();
    } else {
        disableKeyboardMode();
    }
    document.getElementById("wcag-keyboard-mode").classList.toggle("active");
    console.log("here now")
}

function enableKeyboardMode() {
    document.addEventListener('keydown', handleKeyboardNavigation);
}

function disableKeyboardMode() {
    document.removeEventListener('keydown', handleKeyboardNavigation);
}

function handleKeyboardNavigation(event) {
    const focusableElements = Array.from(document.querySelectorAll('a[href], button, input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.disabled && el.offsetWidth > 0 && el.offsetHeight > 0);

    const currentIndex = focusableElements.indexOf(document.activeElement);

    if (event.key === 'Tab') {
        if (!event.shiftKey) {
            if (currentIndex >= focusableElements.length - 1) {
                focusableElements[0].focus();
                event.preventDefault();
            } else {
                focusableElements[currentIndex + 1].focus();
                event.preventDefault();
            }
        } else {
            if (currentIndex <= 0) {
                focusableElements[focusableElements.length - 1].focus();
                event.preventDefault();
            } else {
                focusableElements[currentIndex - 1].focus();
                event.preventDefault();
            }
        }
    }
}


// Call functions to create elements and load CSS
createWidget();
loadCSS();
