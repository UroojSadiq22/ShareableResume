// Function to check if required form elements are present
var checkFormElements = function () {
    var requiredElements = [
        "username",
        "name",
        "email",
        "phone",
        "highest-education",
        "school",
        "field",
        "passing-year",
        "company",
        "position",
        "year",
    ];
    requiredElements.forEach(function (id) {
        var element = document.getElementById(id);
        if (!element) {
            console.error("Form element with ID \"".concat(id, "\" is missing."));
        }
    });
};
// Call the function to check form elements
checkFormElements();
// Function to handle toggling between Edit and Save modes
function toggleEditMode() {
    var editButton = document.getElementById("editButton");
    if (!editButton)
        return;
    var editableElements = document.querySelectorAll(".editable");
    if (editButton.textContent === "Edit") {
        editableElements.forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.contentEditable = "true";
                element.classList.add("editing");
            }
        });
        editButton.textContent = "Save";
    }
    else {
        editableElements.forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.contentEditable = "false";
                element.classList.remove("editing");
            }
        });
        editButton.textContent = "Edit";
    }
}
// Attach event listeners to form and buttons
function attachEventListeners() {
    var formElement = document.getElementById("resume-form");
    var skillInput = document.getElementById("new-skill");
    var addSkillButton = document.getElementById("add-skill");
    var skillsList = document.getElementById("skills-list");
    var resumeDisplay = document.getElementById("resume-display");
    var shareableLinkContainer = document.getElementById("shareable-link-container");
    var shareableLinkElement = document.getElementById("shareable-link");
    var downloadPDFButton = document.getElementById("download-pdf");
    var editButton = document.getElementById("editButton");
    var skillsArray = [];
    // Add skill to the list
    addSkillButton.addEventListener("click", function () {
        var skill = skillInput.value.trim();
        if (skill) {
            skillsArray.push(skill);
            updateSkillsList();
            skillInput.value = "";
        }
    });
    // Update the skills list display
    function updateSkillsList() {
        skillsList.innerHTML = "";
        skillsArray.forEach(function (skill) {
            var span = document.createElement("span");
            span.textContent = skill;
            skillsList.appendChild(span);
        });
    }
    if (formElement) {
        formElement.addEventListener("submit", function (e) {
            e.preventDefault();
            // Get input values from form fields
            var usernameInput = document.getElementById("username");
            var nameInput = document.getElementById("name");
            var emailInput = document.getElementById("email");
            var phoneInput = document.getElementById("phone");
            var highestEducationInput = document.getElementById("highest-education");
            var schoolInput = document.getElementById("school");
            var fieldInput = document.getElementById("field");
            var passingYearInput = document.getElementById("passing-year");
            var companyInput = document.getElementById("company");
            var positionInput = document.getElementById("position");
            var yearInput = document.getElementById("year");
            // Check if all inputs are valid
            if (usernameInput &&
                nameInput &&
                emailInput &&
                phoneInput &&
                highestEducationInput &&
                schoolInput &&
                fieldInput &&
                passingYearInput &&
                companyInput &&
                positionInput &&
                yearInput) {
                var formData = {
                    username: usernameInput.value,
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    education: {
                        highestEducation: highestEducationInput.value,
                        school: schoolInput.value,
                        field: fieldInput.value,
                        passingYear: passingYearInput.value,
                    },
                    skills: skillsArray,
                    experience: {
                        company: companyInput.value,
                        position: positionInput.value,
                        year: yearInput.value,
                    },
                };
                // Store the form data in localStorage
                localStorage.setItem(formData.username, JSON.stringify(formData));
                var resumeOutput = generateResumeOutput(formData);
                if (resumeDisplay) {
                    resumeDisplay.innerHTML = resumeOutput;
                    // Attach event listeners to buttons
                    var editButton_1 = document.getElementById("editButton");
                    var downloadPDFButton_1 = document.getElementById("download-pdf");
                    console.log("Resume display content:", resumeDisplay.innerHTML);
                    if (editButton_1)
                        editButton_1.addEventListener("click", toggleEditMode);
                    if (downloadPDFButton_1)
                        attachPdfDownloadListener(resumeDisplay);
                }
                if (formData.username) {
                    // Generate a shareable URL and display the link
                    var shareableURL = "".concat(window.location.origin, "?username=").concat(encodeURIComponent(formData.username));
                    if (shareableLinkContainer && shareableLinkElement) {
                        shareableLinkContainer.style.display = "block";
                        shareableLinkElement.href = shareableURL;
                        shareableLinkElement.textContent = shareableURL;
                        console.log("Shareable URL set to: ".concat(shareableURL));
                    }
                    else {
                        console.error("Shareable link container or element is missing.");
                    }
                }
                else {
                    console.error("Username input element is missing.");
                }
            }
            else {
                console.error("Form input elements are missing");
            }
        });
    }
}
// Generate the resume display output
function generateResumeOutput(formData) {
    return "\n    <h1>Your Resume</h1>\n    <div>\n      <h2>\u25C7 Personal Information</h2>\n      <p>Username:<strong><span class=\"editable\"> ".concat(formData.username, "</span></strong></p>\n      <p>Name:<strong><span class=\"editable\"> ").concat(formData.name, "</span></strong></p>\n      <p>Email:<strong><span class=\"editable\"> ").concat(formData.email, "</span></strong></p>\n      <p>Phone:<strong><span class=\"editable\"> ").concat(formData.phone, "</span></strong></p>\n    </div>\n    <div>\n      <h2>\u25C7 Education</h2>\n      <p>Highest Education:<strong><span class=\"editable\"> ").concat(formData.education.highestEducation, "</span></strong></p>\n      <p>School:<strong><span class=\"editable\"> ").concat(formData.education.school, "</span></strong></p>\n      <p>Field:<strong><span class=\"editable\"> ").concat(formData.education.field, "</span></strong></p>\n      <p>Passing Year:<strong><span class=\"editable\"> ").concat(formData.education.passingYear, "</span></strong></p>\n    </div>\n    <div>\n      <h2>\u25C7 Skills</h2>\n      <div class=\"skills-grid\">\n        ").concat(formData.skills.map(function (skill) { return "<div>".concat(skill, "</div>"); }).join(""), "\n      </div>\n    </div>\n    <div>\n      <h2>\u25C7 Experience</h2>\n      <p>Company:<strong><span class=\"editable\"> ").concat(formData.experience.company, "</span></strong></p>\n      <p>Position:<strong><span class=\"editable\"> ").concat(formData.experience.position, "</span></strong></p>\n      <p>Year:<strong><span class=\"editable\"> ").concat(formData.experience.year, "</span></strong></p>\n    </div>\n    \n  ");
}
// Function to attach the PDF download listener
function attachPdfDownloadListener(resumeDisplay) {
    var downloadPDFButton = document.getElementById("download-pdf");
    if (downloadPDFButton) {
        downloadPDFButton.addEventListener("click", function () {
            if (!resumeDisplay || resumeDisplay.innerHTML.trim() === "") {
                console.error("No content found in resume display.");
                return;
            }
            console.log("Downloading PDF for:", resumeDisplay); // Debuggin
            var opt = {
                margin: 1,
                filename: "Resume.pdf",
                image: { type: "jpeg", quality: 0.98 },
                html2canvas: { scale: 2 },
                jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
            };
            html2pdf().from(resumeDisplay).set(opt).save().catch(function (err) {
                console.error("Error generating PDF:", err);
            });
            ;
        });
    }
}
// Get the username from the query string
function getUsernameFromQuery() {
    var urlParams = new URLSearchParams(window.location.search);
    return urlParams.get("username");
}
// Load resume from localStorage
function loadResumeFromLocalStorage(username) {
    console.log("Loading resume for:", username); // Debugging
    var resumeDisplay = document.getElementById("resume-display");
    var storedData = localStorage.getItem(username);
    if (storedData && resumeDisplay) {
        var formData = JSON.parse(storedData);
        console.log("Resume data found:", formData); // Debugging
        var resumeOutput = generateResumeOutput(formData);
        resumeDisplay.innerHTML = resumeOutput;
        // Hide the form and display resume only
        var formElement = document.getElementById("resume-form");
        if (formElement)
            formElement.style.display = "none";
        // Attach edit and download PDF listeners
        var editButton = document.getElementById("editButton");
        if (editButton)
            editButton.addEventListener("click", toggleEditMode);
        attachPdfDownloadListener(resumeDisplay);
    }
    else {
        console.error("No resume data found for username:", username);
    }
}
// Load the resume from localStorage if username is present in the query string
window.onload = function () {
    var username = getUsernameFromQuery();
    if (username) {
        loadResumeFromLocalStorage(username);
    }
    else {
        attachEventListeners();
    }
};
