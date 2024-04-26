const baseURL = "./extention"

// Function to create the entire widget within <wcag-access-widget-ui> parent tag
function createWidget() {
    const widgetContainer = document.createElement('div'); // Create <wcag-access-widget-ui> parent tag
    widgetContainer.classList.add('wcag-widget-container');
    widgetContainer.id = 'wcag-widget-container';
    createImageButton(widgetContainer); // Call function to create the button and inject it into the widget container
    createPopup(widgetContainer);
    loadHTML(widgetContainer)
    document.body.appendChild(widgetContainer); // Append the widget container to the body
}

function createImageButton(parentElement) {
    const img = document.createElement('img');
    img.src = `${baseURL}/accessibility.png`;
    img.alt = 'Accessibility Icon'; // Alternative text for accessibility
    img.classList.add('wcag-buttonImg'); // Add a class to the image (optional)
    img.type = "button"
    img.onclick = togglePopup; // Attach togglePopup function to click event
    parentElement.appendChild(img);
}

// open popup
function togglePopup() {
    var popupContainerDiv = document.getElementById("wcag-popup-container");
    if (popupContainerDiv.style.visibility === "hidden") {
        popupContainerDiv.style.visibility = 'visible';
    } else {
        popupContainerDiv.style.visibility = 'hidden';
    }
}



// Function to create a popup
function createPopup(parentElement) {
    const popupContainer = document.createElement('div');
    popupContainer.classList.add('wcag-popup-container'); // Add a class to the popup container
    popupContainer.id = "wcag-popup-container";
    popupContainer.style.visibility = "hidden"
    parentElement.appendChild(popupContainer);
}


// Function to dynamically load external CSS file
function loadCSS() {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.type = 'text/css';
    link.href = `${baseURL}/extention.css`;
    document.head.appendChild(link);
}

function loadHTML() {
    fetch(`${baseURL}/popup.html`)
        .then(response => response.text()) // Convert response to text
        .then(html => {
            document.getElementById('wcag-popup-container').innerHTML = html;
        })
        .catch(error => {
            console.error('Error fetching HTML:', error);
        });
}
// 
function replaceImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        if (!img.classList.contains('wcag-buttonImg')) {
            img.setAttribute('aria-hidden', 'true');
            img.style.visibility = img.style.visibility === 'hidden' ? 'visible' : 'hidden';
        }
    });
    document.getElementById("wcag-image-remove").classList.toggle("active");
}


function mutePlayingAudio() {
    const audioElements = document.querySelectorAll('audio');
    audioElements.forEach(audio => {
        if (!audio.paused && audio.currentTime > 0 && !audio.ended) {
            audio.muted = true;
        }
    });
    document.getElementById("wcag-audio-mute").classList.toggle("active");
}

// Call functions to create elements and load CSS
createWidget();
loadCSS();
