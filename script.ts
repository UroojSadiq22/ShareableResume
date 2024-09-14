interface ResumeData {
  name: string;
  email: string;
  phone: string;
  education: {
    highestEducation: string;
    school: string;
    field: string;
    passingYear: string;
  };
  skills: string[];
  experience: {
    company: string;
    position: string;
    year: string;
  };
}

const form = document.getElementById('resume-form') as HTMLFormElement;
const skillInput = document.getElementById('new-skill') as HTMLInputElement;
const addSkillButton = document.getElementById('add-skill') as HTMLButtonElement;
const skillsList = document.getElementById('skills-list') as HTMLDivElement;
const resumeDisplay = document.getElementById('resume-display') as HTMLDivElement;


// Function to handle toggling between Edit and Save modes
function toggleEditMode(): void {
  const editButton = document.getElementById("editButton") as HTMLButtonElement | null;
  if (!editButton) return;

  const editableElements = document.querySelectorAll(".editable");

  if (editButton.textContent === "Edit") {
      // Switch to edit mode
      editableElements.forEach((element) => {
          if (element instanceof HTMLElement) {
              element.contentEditable = "true";
              element.classList.add("editing");
          }
      });
      editButton.textContent = "Save";
  } else {
      // Switch to save mode
      editableElements.forEach((element) => {
          if (element instanceof HTMLElement) {
              element.contentEditable = "false";
              element.classList.remove("editing");
          }
      });
      editButton.textContent = "Edit";
  }
}

// Attach event listeners only once
function attachEventListeners(): void {
  const formElement = document.getElementById("resume-form");
  

  let skillsArray: string[] = [];

  // Add skill
  addSkillButton.addEventListener('click', () => {
    const skill = skillInput.value.trim();
    if (skill) {
      skillsArray.push(skill);
      updateSkillsList();
      skillInput.value = '';
    }
  });
  
  // Update the skills list display
  function updateSkillsList() {
    skillsList.innerHTML = '';
    skillsArray.forEach((skill, index) => {
      const span = document.createElement('span');
      span.textContent = skill;
      skillsList.appendChild(span);
    });
  }

  if (formElement) {
      formElement.addEventListener("submit", (e) => {
        e.preventDefault();
      
        const formData: ResumeData = {
          name: (document.getElementById('name') as HTMLInputElement).value,
          email: (document.getElementById('email') as HTMLInputElement).value,
          phone: (document.getElementById('phone') as HTMLInputElement).value,
          education: {
            highestEducation: (document.getElementById('highest-education') as HTMLSelectElement).value,
            school: (document.getElementById('school') as HTMLInputElement).value,
            field: (document.getElementById('field') as HTMLInputElement).value,
            passingYear: (document.getElementById('passing-year') as HTMLInputElement).value,
          },
          skills: skillsArray ,
          experience: {
            company: (document.getElementById('company') as HTMLInputElement).value,
            position: (document.getElementById('position') as HTMLInputElement).value,
            year: (document.getElementById('year') as HTMLInputElement).value,
          },
        };
      
        const name = formData.name;
        const email = formData.email;
        const phone = formData.phone;
        const highestEducation = formData.education.highestEducation;
        const school = formData.education.school;
        const field = formData.education.field;
        const passingYear = formData.education.passingYear;
      
        const company = formData.experience.company;
        const position = formData.experience.position;
        const year = formData.experience.year;
      
        const skills = formData.skills;
      
        const resumeOutput =  `
        <h1>Editable Resume</h1>
      
        <div>
        <h2>◇ Personal Information</h2>
        <p>Name:<strong><span class="editable"> ${name}</span></strong></p>
        <p>Email:<strong><span class="editable"> ${email}</span></strong></p>
        <p>Phone:<strong><span class="editable"> ${phone}</span></strong></p>
        </div>
        
        <div>
        <h2>◇ Education</h2>
        <p>Highest Education:<strong><span class="editable"> ${highestEducation}</span></strong></p>
        <p>School:<strong><span class="editable"> ${school}</span></strong></p>
        <p>Field:<strong><span class="editable"> ${field}</span></strong></p>
        <p>Passing Year:<strong><span class="editable"> ${passingYear}</span></strong></p>
        </div>
        
        <div>
        <h2>◇ Skills</h2>
        <div class="skills-grid">
          ${skills.map(skill => `<div>${skill}</div>`).join('')}
        </div>
      </div>
      
        <div>
        <h2>◇ Experience</h2>
        <p>Company:<strong><span class="editable"> ${company}</span></strong></p>
        <p>Position:<strong><span class="editable"> ${position}</span></strong></p>
        <p>Year:<strong><span class="editable"> ${year}</span></strong></p>
        </div>
      
        <button id="editButton" class="edit">Edit</button>
      `;
      
        const resumeOutputElement = document.getElementById("resume-display");
        if (resumeOutputElement) {
            resumeOutputElement.innerHTML = resumeOutput;
            const editButton = document.getElementById("editButton");
  if (editButton) {
      editButton.addEventListener("click", toggleEditMode);
  }
        } else {
            console.error("The resume output element is missing");
        }
      
      });
  }
  
}

// Initialize the script
attachEventListeners();