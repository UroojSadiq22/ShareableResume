var form = document.getElementById('resume-form');
var skillInput = document.getElementById('new-skill');
var addSkillButton = document.getElementById('add-skill');
var skillsList = document.getElementById('skills-list');
var resumeDisplay = document.getElementById('resume-display');
// Function to handle toggling between Edit and Save modes
function toggleEditMode() {
    var editButton = document.getElementById("editButton");
    if (!editButton)
        return;
    var editableElements = document.querySelectorAll(".editable");
    if (editButton.textContent === "Edit") {
        // Switch to edit mode
        editableElements.forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.contentEditable = "true";
                element.classList.add("editing");
            }
        });
        editButton.textContent = "Save";
    }
    else {
        // Switch to save mode
        editableElements.forEach(function (element) {
            if (element instanceof HTMLElement) {
                element.contentEditable = "false";
                element.classList.remove("editing");
            }
        });
        editButton.textContent = "Edit";
    }
}
// Attach event listeners only once
function attachEventListeners() {
    var formElement = document.getElementById("resume-form");
    var skillsArray = [];
    // Add skill
    addSkillButton.addEventListener('click', function () {
        var skill = skillInput.value.trim();
        if (skill) {
            skillsArray.push(skill);
            updateSkillsList();
            skillInput.value = '';
        }
    });
    // Update the skills list display
    function updateSkillsList() {
        skillsList.innerHTML = '';
        skillsArray.forEach(function (skill, index) {
            var span = document.createElement('span');
            span.textContent = skill;
            skillsList.appendChild(span);
        });
    }
    if (formElement) {
        formElement.addEventListener("submit", function (e) {
            e.preventDefault();
            var formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                education: {
                    highestEducation: document.getElementById('highest-education').value,
                    school: document.getElementById('school').value,
                    field: document.getElementById('field').value,
                    passingYear: document.getElementById('passing-year').value,
                },
                skills: skillsArray,
                experience: {
                    company: document.getElementById('company').value,
                    position: document.getElementById('position').value,
                    year: document.getElementById('year').value,
                },
            };
            var name = formData.name;
            var email = formData.email;
            var phone = formData.phone;
            var highestEducation = formData.education.highestEducation;
            var school = formData.education.school;
            var field = formData.education.field;
            var passingYear = formData.education.passingYear;
            var company = formData.experience.company;
            var position = formData.experience.position;
            var year = formData.experience.year;
            var skills = formData.skills;
            var resumeOutput = "\n        <h1>Editable Resume</h1>\n      \n        <div>\n        <h2>\u25C7 Personal Information</h2>\n        <p>Name:<strong><span class=\"editable\"> ".concat(name, "</span></strong></p>\n        <p>Email:<strong><span class=\"editable\"> ").concat(email, "</span></strong></p>\n        <p>Phone:<strong><span class=\"editable\"> ").concat(phone, "</span></strong></p>\n        </div>\n        \n        <div>\n        <h2>\u25C7 Education</h2>\n        <p>Highest Education:<strong><span class=\"editable\"> ").concat(highestEducation, "</span></strong></p>\n        <p>School:<strong><span class=\"editable\"> ").concat(school, "</span></strong></p>\n        <p>Field:<strong><span class=\"editable\"> ").concat(field, "</span></strong></p>\n        <p>Passing Year:<strong><span class=\"editable\"> ").concat(passingYear, "</span></strong></p>\n        </div>\n        \n        <div>\n        <h2>\u25C7 Skills</h2>\n        <div class=\"skills-grid\">\n          ").concat(skills.map(function (skill) { return "<div>".concat(skill, "</div>"); }).join(''), "\n        </div>\n      </div>\n      \n        <div>\n        <h2>\u25C7 Experience</h2>\n        <p>Company:<strong><span class=\"editable\"> ").concat(company, "</span></strong></p>\n        <p>Position:<strong><span class=\"editable\"> ").concat(position, "</span></strong></p>\n        <p>Year:<strong><span class=\"editable\"> ").concat(year, "</span></strong></p>\n        </div>\n      \n        <button id=\"editButton\" class=\"edit\">Edit</button>\n      ");
            var resumeOutputElement = document.getElementById("resume-display");
            if (resumeOutputElement) {
                resumeOutputElement.innerHTML = resumeOutput;
                var editButton = document.getElementById("editButton");
                if (editButton) {
                    editButton.addEventListener("click", toggleEditMode);
                }
            }
            else {
                console.error("The resume output element is missing");
            }
        });
    }
}
// Initialize the script
attachEventListeners();
