//  Check IF There's Local Storage Color
let mainColors = localStorage.getItem("color_option");
if (mainColors !== null) {
  document.documentElement.style.setProperty("--main--color", mainColors);
  // Remove active Class From All Childern
  document.querySelectorAll(".colors-list li").forEach((element) => {
    element.classList.remove("active");
    // Add active Class On Elment With Data Color === Local Stotage ITem
    if (element.dataset.color === mainColors) {
      element.classList.add("active");
    }
  });
}

// Toggle Spin class On Icon
document.querySelector(".gear i").onclick = function () {
  // TogGle Class Fa-apin For Rotation On Self
  this.classList.toggle("fa-spin");
  // Toggle Class Open ON Main Setting Box
  document.querySelector(".setting-box").classList.toggle("open");
};
// Switch Colors
const colorsLi = document.querySelectorAll(".colors-list li");
// Loop on  all List Itesm
colorsLi.forEach((li) => {
  // Click on every List Items
  li.addEventListener("click", (e) => {
    // Set Color IN Root
    document.documentElement.style.setProperty(
      "--main--color",
      e.target.dataset.color
    );
    // Set COlor in Local Storage
    localStorage.setItem("color_option", e.target.dataset.color);
    handleActive(e);
  });
});

// Switch  Random BackGround Option
const randombackel = document.querySelectorAll(".random-backgrounds span");
// Loop on  all Spans
randombackel.forEach((span) => {
  // Click on every span
  span.addEventListener("click", (e) => {
    handleActive(e);

    if (e.target.dataset.background === "yes") {
      backgroundOption = true;
      randomizeImgs();
      localStorage.setItem("background_option", true);
    } else if (e.target.dataset.background === "no") {
      backgroundOption = false;
      clearInterval(backgroundInterval);
      localStorage.setItem("background_option", false);
    }
  });
});
// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Array Of Background Pages
let imgsArray = ["01.jpg", "02.jpg", "03.jpg", "04.jpg", "05.jpg"];

// Bandom Back Groud Option
let backgroundOption = true;

// Variable To Control The  Background Interval
let backgroundInterval;

// chek if there's Local storage random background item
let backgroundLocalItem = localStorage.getItem("background_option");
// Remove Active class from all spans
document.querySelectorAll(".random-backgrounds span").forEach((element) => {
  element.classList.remove("active");
});
// chek if Random background local storage is not imty
if (backgroundLocalItem !== null) {
  if (backgroundLocalItem === "true") {
    backgroundOption = true;
    document.querySelector(".random-backgrounds .yes").classList.add("active");
  } else {
    backgroundOption = false;
    document.querySelector(".random-backgrounds .no").classList.add("active");
  }
}
//  Function to randomize Images
function randomizeImgs() {
  if (backgroundOption === true) {
    backgroundInterval = setInterval(() => {
      // Get Random Number
      let randomNumber = Math.floor(Math.random() * imgsArray.length);

      // Change Background Page
      landingPage.style.backgroundImage =
        `url("photos/` + imgsArray[randomNumber] + `")`;
    }, 1000);
  }
}

randomizeImgs();

// Select Skills Selector
let ourSkills = document.querySelector(".skills");

window.onscroll = function () {
  // Skills Offset Top
  let skillsOffsetTop = ourSkills.offsetTop;

  // Skills Outer height
  let skillsOuterheight = ourSkills.offsetHeight;
  // Window Height
  let windowHeight = this.innerHeight;
  // Window Scroll Top
  let windowScrollTop = this.pageYOffset;

  if (windowScrollTop > skillsOffsetTop + skillsOuterheight - windowHeight) {
    let allskills = document.querySelectorAll(
      ".skill-box .skill-progress span"
    );
    allskills.forEach((skill) => {
      skill.style.width = skill.dataset.progress;
    });
  }
};

// Create Popup with The Image
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach((img) => {
  img.addEventListener("click", (e) => {
    // Creat Ovelay Element
    let overlay = document.createElement("div");
    // Add class To over lay
    overlay.className = "popup-overlay";
    // Append over lay to body
    document.body.appendChild(overlay);
    // Creat Popup BOX
    let popupBox = document.createElement("div");
    //  Add class to popup box
    popupBox.classList = "popup-box";
    // Check if Image has Name
    if (img.alt !== null) {
      // create Heading
      let imgHeading = document.createElement("h3");
      // create text node to Image
      let imgtext = document.createTextNode(img.alt);
      // Append text to headin
      imgHeading.appendChild(imgtext);
      // Append headin to ppopu
      popupBox.appendChild(imgHeading);
    }
    // Creat The Image
    let popupImage = document.createElement("img");
    // Set Image Source
    popupImage.src = img.src;
    // Append Image to popup box
    popupBox.appendChild(popupImage);
    // Append popup box to body
    document.body.appendChild(popupBox);
    // Creat The close span
    let closeSpan = document.createElement("span");
    // Create The close text
    let closeText = document.createTextNode("X");
    // Append text to close span
    closeSpan.appendChild(closeText);
    // Add class to Close span;
    closeSpan.className = "close-button";
    // Add close spna to popup box
    popupBox.appendChild(closeSpan);
  });
});
document.addEventListener("click", function (e) {
  if (e.target.className == "close-button") {
    // Remove The CUrent Popup
    e.target.parentNode.remove();
    // Remove OverLay
    document.querySelector(".popup-overlay").remove();
  }
});

// Select All bullets
const allbullets = document.querySelectorAll(".nav-bullets .bullet");
// Select All links
const allLinks = document.querySelectorAll(".links a");
function scrollToSomewhere(elements) {
  elements.forEach((ele) => {
    ele.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(e.target.dataset.section).scrollIntoView({
        behavior: "smooth",
      });
    });
  });
}
scrollToSomewhere(allbullets);
scrollToSomewhere(allLinks);

// Handle active state
function handleActive(ev) {
  // Remove active Class From All Spans
  ev.target.parentElement.querySelectorAll(".active").forEach((element) => {
    element.classList.remove("active");
  });
  // Add active to This
  ev.target.classList.add("active");
}

let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
  bulletsSpan.forEach((span) => {
    span.classList.remove("active");
  });
  if (bulletLocalItem === "block") {
    bulletsContainer.style.display = "block";
    document.querySelector(".bullets-option .yes").classList.add("active");
  } else {
    bulletsContainer.style.display = "none";
    document.querySelector(".bullets-option .no").classList.add("active");
  }
}
bulletsSpan.forEach((span) => {
  span.addEventListener("click", (e) => {
    if (span.dataset.display === "yes") {
      bulletsContainer.style.display = "block";
      localStorage.setItem("bullets-option", "block");
    } else {
      bulletsContainer.style.display = "none";
      localStorage.setItem("bullets-option", "none");
    }
    handleActive(e);
  });
});
// Rest button
document.querySelector(".rest-options").onclick = function () {
  // localStorage.clear()
  localStorage.removeItem("background_option");
  localStorage.removeItem("color_option");
  localStorage.removeItem("bullets-option");
  window.location.reload();
};
// Toggle MEnu
let toggleButon = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleButon.onclick = function (e) {
  // Stop Propagation
  e.stopPropagation();

  this.classList.toggle("menu-active");
  tLinks.classList.toggle("open");
};

// Click Any Where Outside Menu And toggle button
document.addEventListener("click", function (e) {
  if (e.target !== toggleButon && e.target !== tLinks) {
    //Check if  MEnu is open
    if (tLinks.classList.contains("open")) {
      tLinks.classList.remove("open");
      toggleButon.classList.remove("menu-active");
    }
  }
});
// Stop Propagation on MEnu
tLinks.onclick = function (e) {
  e.stopPropagation();
};
// Close the menu when a link is clicked
const links = tLinks.querySelectorAll("a"); // Select all links inside the menu
links.forEach((link) => {
  link.onclick = function () {
    tLinks.classList.remove("open");
    toggleButon.classList.remove("menu-active");
  };
});
