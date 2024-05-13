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
  img.src = `${baseURL}/brain.svg`;
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
  // document.getElementById("wcag-adhd-mode").classList.toggle("active");
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

// seizure mode
function applySeizureSafeProfile() {
  // Suppress flashing or blinking animations
  var elementsWithAnimations = document.querySelectorAll('*');
  elementsWithAnimations.forEach(function(element) {
      var computedStyle = window.getComputedStyle(element);
      var animationDuration = computedStyle.getPropertyValue('animation-duration');
      var animationDelay = computedStyle.getPropertyValue('animation-delay');

      // Check if the element has animation properties
      if (animationDuration !== '0s' || animationDelay !== '0s') {
          // Suppress animations by setting animation duration and delay to 0
          element.style.setProperty('animation-duration', '0s', 'important');
          element.style.setProperty('animation-delay', '0s', 'important');
      }
  });

  // Adjust color combinations to reduce risk of triggering seizures
  // var allElements = document.querySelectorAll('*');
  // allElements.forEach(function(element) {
  //     // Example: Change background color to white and text color to black
  //     element.style.setProperty('background-color', '#ffffff', 'important');
  //     element.style.setProperty('color', '#000000', 'important');
  // });
}




function suppressAnimations() {
  // Select all elements with CSS animations
  const animatedElements = document.querySelectorAll('*[style*="animation"], *[style*="transition"]');
  
  // Loop through each animated element
  animatedElements.forEach(element => {
      // Get the animation properties
      const animationStyle = window.getComputedStyle(element);
      const animationDuration = parseFloat(animationStyle.animationDuration) || 0;
      const transitionDuration = parseFloat(animationStyle.transitionDuration) || 0;
      const totalDuration = animationDuration + transitionDuration;

      // Check if total animation duration is too fast (potentially harmful)
      if (totalDuration < 0.5) {
          // Disable animation by setting duration to 0
          element.style.animationDuration = '0s';
          element.style.transitionDuration = '0s';
      }
  });
}

// Function to customize color settings
function customizeColors(bgColor, textColor, linkColor) {
  // Set background color
  document.body.style.backgroundColor = bgColor;
  
  // Set text color
  document.body.style.color = textColor;
  
  // Set link color
  const links = document.querySelectorAll('a');
  links.forEach(link => {
      link.style.color = linkColor;
  });
}


// text color update
function changeColor(color) {
  document.body.style.setProperty('color', color, 'important');
}



// Call functions to create elements and load CSS
createWidget();
loadCSS();
