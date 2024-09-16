declare var html2pdf: any;

interface ResumeData {
  username: string;
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

// Function to check if required form elements are present
const checkFormElements = () => {
  const requiredElements = [
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

  requiredElements.forEach((id) => {
    const element = document.getElementById(id);
    if (!element) {
      console.error(`Form element with ID "${id}" is missing.`);
    }
  });
};

// Call the function to check form elements
checkFormElements();

// Function to handle toggling between Edit and Save modes
function toggleEditMode(): void {
  const editButton = document.getElementById(
    "editButton"
  ) as HTMLButtonElement | null;
  if (!editButton) return;

  const editableElements = document.querySelectorAll(".editable");

  if (editButton.textContent === "Edit") {
    editableElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.contentEditable = "true";
        element.classList.add("editing");
      }
    });
    editButton.textContent = "Save";
  } else {
    editableElements.forEach((element) => {
      if (element instanceof HTMLElement) {
        element.contentEditable = "false";
        element.classList.remove("editing");
      }
    });
    editButton.textContent = "Edit";
  }
}

// Attach event listeners to form and buttons
function attachEventListeners(): void {
  const formElement = document.getElementById("resume-form");
  const skillInput = document.getElementById("new-skill") as HTMLInputElement;
  const addSkillButton = document.getElementById(
    "add-skill"
  ) as HTMLButtonElement;
  const skillsList = document.getElementById("skills-list") as HTMLDivElement;
  const resumeDisplay = document.getElementById(
    "resume-display"
  ) as HTMLDivElement;

  const shareableLinkContainer = document.getElementById(
    "shareable-link-container"
  ) as HTMLDivElement;
  const shareableLinkElement = document.getElementById(
    "shareable-link"
  ) as HTMLAnchorElement;
  const downloadPDFButton = document.getElementById(
    "download-pdf"
  ) as HTMLButtonElement;
  const editButton = document.getElementById("editButton") as HTMLButtonElement;

  let skillsArray: string[] = [];

  // Add skill to the list
  addSkillButton.addEventListener("click", () => {
    const skill = skillInput.value.trim();
    if (skill) {
      skillsArray.push(skill);
      updateSkillsList();
      skillInput.value = "";
    }
  });

  // Update the skills list display
  function updateSkillsList() {
    skillsList.innerHTML = "";
    skillsArray.forEach((skill) => {
      const span = document.createElement("span");
      span.textContent = skill;
      skillsList.appendChild(span);
    });
  }

  if (formElement) {
    formElement.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get input values from form fields
      const usernameInput = document.getElementById(
        "username"
      ) as HTMLInputElement | null;
      const nameInput = document.getElementById(
        "name"
      ) as HTMLInputElement | null;
      const emailInput = document.getElementById(
        "email"
      ) as HTMLInputElement | null;
      const phoneInput = document.getElementById(
        "phone"
      ) as HTMLInputElement | null;
      const highestEducationInput = document.getElementById(
        "highest-education"
      ) as HTMLSelectElement | null;
      const schoolInput = document.getElementById(
        "school"
      ) as HTMLInputElement | null;
      const fieldInput = document.getElementById(
        "field"
      ) as HTMLInputElement | null;
      const passingYearInput = document.getElementById(
        "passing-year"
      ) as HTMLInputElement | null;
      const companyInput = document.getElementById(
        "company"
      ) as HTMLInputElement | null;
      const positionInput = document.getElementById(
        "position"
      ) as HTMLInputElement | null;
      const yearInput = document.getElementById(
        "year"
      ) as HTMLInputElement | null;

      // Check if all inputs are valid
      if (
        usernameInput &&
        nameInput &&
        emailInput &&
        phoneInput &&
        highestEducationInput &&
        schoolInput &&
        fieldInput &&
        passingYearInput &&
        companyInput &&
        positionInput &&
        yearInput
      ) {
        const formData: ResumeData = {
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

        const resumeOutput = generateResumeOutput(formData);

        if (resumeDisplay) {
          resumeDisplay.innerHTML = resumeOutput;

          // Attach event listeners to buttons
          const editButton = document.getElementById("editButton");
          const downloadPDFButton = document.getElementById("download-pdf");

          console.log("Resume display content:", resumeDisplay.innerHTML);

          if (editButton) editButton.addEventListener("click", toggleEditMode);
          if (downloadPDFButton) attachPdfDownloadListener(resumeDisplay);
        }

        if (formData.username) {
          // Generate a shareable URL and display the link
          const shareableURL = `${
            window.location.origin
          }?username=${encodeURIComponent(formData.username)}`;
          if (shareableLinkContainer && shareableLinkElement) {
            shareableLinkContainer.style.display = "block";
            shareableLinkElement.href = shareableURL;
            shareableLinkElement.textContent = shareableURL;
            console.log(`Shareable URL set to: ${shareableURL}`);
          } else {
            console.error("Shareable link container or element is missing.");
          }
        } else {
          console.error("Username input element is missing.");
        }
      } else {
        console.error("Form input elements are missing");
      }
    });
  }
}

// Generate the resume display output
function generateResumeOutput(formData) {
  return `
    <h1>Your Resume</h1>
    <div>
      <h2>◇ Personal Information</h2>
      <p>Username:<strong><span class="editable"> ${
        formData.username
      }</span></strong></p>
      <p>Name:<strong><span class="editable"> ${
        formData.name
      }</span></strong></p>
      <p>Email:<strong><span class="editable"> ${
        formData.email
      }</span></strong></p>
      <p>Phone:<strong><span class="editable"> ${
        formData.phone
      }</span></strong></p>
    </div>
    
    <div>
      <h2>◇ Education</h2>
      <p>Highest Education:<strong><span class="editable"> ${
        formData.education.highestEducation
      }</span></strong></p>
      <p>School:<strong><span class="editable"> ${
        formData.education.school
      }</span></strong></p>
      <p>Field:<strong><span class="editable"> ${
        formData.education.field
      }</span></strong></p>
      <p>Passing Year:<strong><span class="editable"> ${
        formData.education.passingYear
      }</span></strong></p>
    </div>
    <div>
      <h2>◇ Skills</h2>
      <div class="skills-grid">
        ${formData.skills.map((skill) => `<div>${skill}</div>`).join("")}
      </div>
    </div>
    <div>
      <h2>◇ Experience</h2>
      <p>Company:<strong><span class="editable"> ${
        formData.experience.company
      }</span></strong></p>
      <p>Position:<strong><span class="editable"> ${
        formData.experience.position
      }</span></strong></p>
      <p>Year:<strong><span class="editable"> ${
        formData.experience.year
      }</span></strong></p>
    </div>
    
  `;
}

// Function to attach the PDF download listener
function attachPdfDownloadListener(resumeDisplay: HTMLDivElement): void {
  const downloadPDFButton = document.getElementById("download-pdf");
  if (downloadPDFButton) {
    downloadPDFButton.addEventListener("click", () => {
      if (!resumeDisplay || resumeDisplay.innerHTML.trim() === "") {
        console.error("No content found in resume display.");
        return;
      }
      console.log("Downloading PDF for:", resumeDisplay); // Debuggin
      const opt = {
        margin: 1,
        filename: "Resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
      };

      html2pdf()
        .from(resumeDisplay)
        .set(opt)
        .save()
        .catch((err) => {
          console.error("Error generating PDF:", err);
        });
    });
  }
}

// Get the username from the query string
function getUsernameFromQuery(): string | null {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("username");
}

// Load resume from localStorage
function loadResumeFromLocalStorage(username: string): void {
  console.log("Loading resume for:", username); // Debugging
  const resumeDisplay = document.getElementById(
    "resume-display"
  ) as HTMLDivElement;
  const storedData = localStorage.getItem(username);
  if (storedData && resumeDisplay) {
    const formData: ResumeData = JSON.parse(storedData);
    console.log("Resume data found:", formData); // Debugging
    const resumeOutput = generateResumeOutput(formData);
    resumeDisplay.innerHTML = resumeOutput;

    // Hide the form and display resume only
    const formElement = document.getElementById("resume-form");
    if (formElement) formElement.style.display = "none";

    // Attach edit and download PDF listeners
    const editButton = document.getElementById("editButton");
    if (editButton) editButton.addEventListener("click", toggleEditMode);
    attachPdfDownloadListener(resumeDisplay);
  } else {
    console.error("No resume data found for username:", username);
  }
}

// Load the resume from localStorage if username is present in the query string
window.onload = () => {
  const username = getUsernameFromQuery();
  if (username) {
    loadResumeFromLocalStorage(username);
  } else {
    attachEventListeners();
  }
};
