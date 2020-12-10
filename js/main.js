/* ========================================
For all students
======================================== */

// HTML elements
const elDateInput = document.querySelector('.js-date__input-choice');
const elTableBody = document.querySelector('.attendance__table-body');

// Adjustment date 
const TODAY = new Date();
const YEAR = String(TODAY.getFullYear());
// Month starts form 0, so add one to make similar with a data we have
const MONTH = String(TODAY.getMonth() + 1);
const DAY = String(TODAY.getDate());

const defaultDay = `${YEAR}-${MONTH.padStart(2, 0)}-${DAY.padStart(2, 0)}`;

// elDateInput assigned default day 
elDateInput.value = defaultDay;


// Callbcak for change of input
const onElDateInputChange = (evt) => {

   let filterDate = null;

   // Assign values for filterDate from input
   if (evt && evt.type === 'change') {
      filterDate = evt.currentTarget.value;
   } else {
      filterDate = defaultDay;
   }

   // Empty Result for Student table
   elTableBody.innerHTML = '';

   // Filter data elements according to date set
   const filtered = attendance.filter(obj => obj.visitDate === filterDate);

   // Loop creates elements for filtered data
   for (row of filtered) {

      // Creating elements
      const elNewTrElement = document.createElement('tr');
      const elNewStudentName = document.createElement('td');
      // Add class to select for a single student info
      elNewStudentName.classList.add('js-attendance__table-student-name');

      const elNewStudentAttendance = document.createElement('td');
      const elNewStudentsScore = document.createElement('td');

      // Assing text values from data
      elNewStudentName.textContent = (getById(students, row.userId)).name;
      elNewStudentAttendance.textContent = row.visited ? '+' : '-';
      elNewStudentsScore.textContent = row.score;


      elNewTrElement.appendChild(elNewStudentName)
      elNewTrElement.appendChild(elNewStudentAttendance)
      elNewTrElement.appendChild(elNewStudentsScore)

      elTableBody.appendChild(elNewTrElement)
   }


}

// Make it work on for default day (today)
onElDateInputChange()

// Listen change of elDateInput
elDateInput.addEventListener('change', onElDateInputChange);



/* ========================================
For a single student
======================================== */

// HTML elements
const elStudentTable = document.querySelector('.attendance__table-student');
const elStudentBodyTable = document.querySelector('.attendance__body-student');

// Callback for click of onElTableBodyClick
const onElTableBodyClick = (evt) => {

   // Match single student
   if (evt.target.matches('.js-attendance__table-student-name')) {

      // Find student from students
      let studentData = students.find(student => evt.target.textContent === student.name);

      // Get students info according 
      const studentHistory = attendance.filter(day => studentData.id === day.id);

      elStudentBodyTable.innerHTML = '';
      elStudentTable.classList.remove('d-none');

      // Loop creates table elements to render single student history
      for (row of studentHistory) {
         // Create HTML elements
         const elNewTrElement = document.createElement('tr');
         const elNewStudentName = document.createElement('td');
         const elNewStudentAttendance = document.createElement('td');
         const elNewStudentsScore = document.createElement('td');

         // Assign text values form data
         elNewStudentName.textContent = (getById(students, row.userId)).name;
         elNewStudentAttendance.textContent = row.visitDate;
         elNewStudentsScore.textContent = row.visited ? '+' : '-';

         elNewTrElement.appendChild(elNewStudentName);
         elNewTrElement.appendChild(elNewStudentAttendance);
         elNewTrElement.appendChild(elNewStudentsScore);

         elStudentBodyTable.appendChild(elNewTrElement);
      }

   }
};

// Listen click of elTableBody
elTableBody.addEventListener('click', onElTableBodyClick);