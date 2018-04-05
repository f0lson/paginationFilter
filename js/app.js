const pageHeader = document.querySelector('.page-header');
const studentsList = document.querySelector
const students = document.querySelectorAll('li.student-item');

const createElement = ( name, prop1, value1, prop2, value2 ) => {
    let element = document.createElement(name);
    element[prop1] = value1;
    element[prop2] = value2;
    return element;
}

// function to hide students
// a. array to be passed as argument
const hideStudents = ( collection ) => {
    // b. iterate thru data
    for ( let i = 0; i < collection.length; i++ ) {
        // c. set every student's display value to none
        collection[i].style.display = 'none';
    }
}

/*=============================
    Show Page Function
=============================*/

const showPage = ( pageNumber, studentList ) => {
    // there should only be 10 students per page
    let studentsPerPage = 10;
    // Then loop through all students in our student list argument
    for (let i = 0; i < studentList.length; i++) {
        // first hide all students on the page
        studentList[i].style.display = 'none';
        // if student should be on this page number:
        // ie.) if pageNumber = 1 then indices 0-9 (students 1-10) will be displayed
        //      if pageNumber = 2 then indices 10-19 (students 11-20) will be displayed, etc...
        if ((pageNumber * studentsPerPage) - studentsPerPage <= i && i < (pageNumber * studentsPerPage)) {
            // show the student
            studentList[i].style.display = 'block';
        }
    }
}

const removeActiveClass = ( a ) => {
    let li = a.parentNode;
    let ul = li.parentNode;
    let anchors = ul.querySelectorAll('a');
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].className = '';
    }
}

// function to add the active class to the first page link after showPage() is called
const addActiveClass = () => {
    // a. select and store ul
    const uList = document.querySelector('.pagination ul');
    // b. select and store the first <a> of uList
    const anchor = uList.querySelectorAll('a')[0];
    // c. set class name to active
    anchor.className = 'active';
}

// function to remove pagination links
const removePageLinks = () => {
    // a. select and store pagination div
    let paginationLinks = document.querySelector('.pagination');
    // b. traverse to paginationLinks parent node
    let parent = paginationLinks.parentNode;
    // c. remove .pagination div from page
    parent.removeChild(paginationLinks);
}

/*=============================
    Append Page Links Function
=============================*/

const appendPageLinks = ( studentList ) => {
    // determine how many pages for this student list
    let totalPages = Math.ceil(studentList.length / 10);
    // create a page link section
    // selecting the page div
    const page = document.querySelector('.page');
    // creating the pagination div
    const paginationDiv = document.createElement('div');
    // adding the pagination class to the pagination div
    paginationDiv.className = 'pagination';
    // creating the pagination ul
    const paginationUl = document.createElement('ul');
    // “for” every page
    for ( let i = 1; i <= totalPages; i++ ) {
        // storing the index in pageNumber
        let pageNumber = i;
        // creating the pagination li
        let paginationLi = document.createElement('li');
        // creating the pagination a
        let paginationLink = document.createElement('a');
        paginationLink.textContent = pageNumber;
        // define what happens when you click a link
        paginationLink.addEventListener('click', (e) => {
            let clickedLink = e.target;
            let numberOfPage = parseInt(clickedLink.textContent);
            removeActiveClass(clickedLink);
            // Use the showPage function to display the page for the link clicked
            showPage(numberOfPage, studentList);
            // mark that link as “active”
            clickedLink.className = 'active';
        });
        // append the link to the li
        paginationLi.appendChild(paginationLink);
        // append the li to the ul
        paginationUl.appendChild(paginationLi);
    }
    // appending the pagination ul to the pagination div
    paginationDiv.appendChild(paginationUl);
    // append our new page link section to the site
    page.appendChild(paginationDiv);
}


/*=============================
    Search Functionality
=============================*/

const searchDiv = createElement('div', 'className', 'student-search', '', '');
const searchInput = createElement('input', 'type',  'text', 'placeholder', 'Search for students');
const searchBtn = createElement('button', 'type', 'submit', 'textContent', 'Search');

searchDiv.append(searchInput);
searchDiv.append(searchBtn);
pageHeader.append(searchDiv);

const searchList = () => {
    // Obtain the value of the search input
    let userSearch = searchInput.value;
    console.log(userSearch);
    // remove the previous page link section
    hideStudents(students);
    // hide the pagination links
    removePageLinks();
    // creating the new matchedStudents array to house those who matched the search criteria
    let matchedStudents = [];
    // Loop over the student list, and for each student…
    for ( let i = 0; i < students.length; i++ ) {
        // ...obtain the student's name…
        let studentName = students[i].querySelector('h3').textContent;
        // ...and the student’s email…
        let studentEmail = students[i].querySelector('span.email').textContent;

        // if the student name/email includes any of the characters in the user's search
        if ( studentName.includes(userSearch.toLowerCase()) || studentEmail.includes(userSearch.toLowerCase()) ) {
            // store the value of that student into the local student variable
            let student = students[i];
            // push value of student into matchedStudents array
            matchedStudents.push(student);
        }
    }
    // log out length of matchedStudents
    console.log(matchedStudents.length);
    if ( matchedStudents.length <= 0 || userSearch === '') {
        // creating the alert element
        let alert = createElement('div', 'className', 'alert', 'textContent', 'No student found, please search again');
        // creating the close x
        let close = createElement('div', 'className', 'close', 'textContent', '');
        // appending the close x to the alert div
        alert.appendChild(close);
        // adding click handler to the close x
        alert.addEventListener('click', ( e ) => {
            if ( e.target.className === 'close' ) {
                alert.style.display = 'none';
                searchInput.style.border = 'solid 1px #eaeaea';
            }
        });
        searchInput.style.border = 'solid 2px rgba(255, 0, 0, .7)';
        alert.style.opacity = 1;
        pageHeader.appendChild(alert);
        showPage(1, students);
        appendPageLinks(students);
    } else {
        showPage(1, matchedStudents);
        appendPageLinks(matchedStudents);
        addActiveClass();
    }

    searchInput.value = '';
}

searchBtn.addEventListener('click', () => {
    searchList();
});

showPage(1, students);
appendPageLinks(students);
addActiveClass();
