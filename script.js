// Array to store subjects
let subjects = [];

function toggleOtherSubjectInput() {
  const subjectSelect = document.getElementById("subjectSelect");
  const otherSubjectInput = document.getElementById("otherSubjectInput");

  otherSubjectInput.style.display = subjectSelect.value === "other" ? "block" : "none";
}
// Function to add a subject
function addSubject() {
  const subjectSelect = document.getElementById("subjectSelect");
  const otherSubjectInput = document.getElementById("otherSubjectInput");
  const creditInput = document.getElementById("creditInput");
  const scoreInput = document.getElementById("scoreInput");

  const selectedSubject = subjectSelect.value;
  const enteredSubject = otherSubjectInput.value.trim(); // Get the entered subject and remove leading/trailing spaces
  const credits = parseInt(creditInput.value);
  const score = parseInt(scoreInput.value);

  let subject;

  if (selectedSubject === "other" && enteredSubject) {
    // If "Other" option is selected and a subject is entered, use the entered subject
    subject = enteredSubject;
  } else {
    // Use the selected subject from the dropdown
    subject = selectedSubject;
  }

  if (subject && credits && score) {
    subjects.push({ subject: subject, credits: credits, score: score });

    subjectSelect.selectedIndex = 0;
    otherSubjectInput.value = "";
    creditInput.value = "";
    scoreInput.value = "";

    displaySubjects();
  }
}
// Function to display subjects in the table
function displaySubjects() {
  const subjectTable = document.getElementById("subjectTable");

  // Clear previous table rows
  while (subjectTable.rows.length > 1) {
    subjectTable.deleteRow(1);
  }

  // Add new rows for each subject
  subjects.forEach(function (subject) {
    const newRow = subjectTable.insertRow();

    const subjectCell = newRow.insertCell();
    const creditsCell = newRow.insertCell();
    const scoreCell = newRow.insertCell();

    subjectCell.textContent = subject.subject;
    creditsCell.textContent = subject.credits;
    scoreCell.textContent = `${subject.score}/10`;
  });
}

// Function to calculate and display the GPA
function fetchGPA() {
  const totalCredits = subjects.reduce(function (sum, subject) {
    return sum + subject.credits;
  }, 0);

  const totalGradePoints = subjects.reduce(function (sum, subject) {
    return sum + subject.credits * subject.score;
  }, 0);

  const gpa = totalGradePoints / totalCredits;

  const gpaResult = document.getElementById("gpaResult");
  gpaResult.textContent = `GPA: ${gpa.toFixed(2)}`;
}

// Function to toggle dark mode
function toggleDarkMode() {
  const body = document.body;
  const darkModeToggle = document.getElementById("darkModeToggle");

  body.classList.toggle("dark-mode");
  darkModeToggle.classList.toggle("dark-mode");
}

// Event listener for dark mode toggle button
const darkModeToggle = document.getElementById("darkModeToggle");
darkModeToggle.addEventListener("click", toggleDarkMode);

// Function to set dark mode on page load
function setDarkMode() {
  const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (prefersDarkMode) {
    toggleDarkMode();
  }
}

// Call the setDarkMode function on page load
window.addEventListener("load", setDarkMode);







// Rest of the code remains the same...

// Event listener for subject select change
const subjectSelect = document.getElementById("subjectSelect");
subjectSelect.addEventListener("change", toggleOtherSubjectInput);

// Call toggleOtherSubjectInput initially to handle the initial state of the subject input
toggleOtherSubjectInput();
