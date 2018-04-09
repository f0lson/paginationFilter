const page = document.querySelector(`.page`)
const pageHeader = document.querySelector(`.page-header`);
const studentsList = document.querySelector
const students = document.querySelectorAll(`li.student-item`);

// function to create element
const createElement = ( name, prop1, value1, prop2, value2 ) => {
    // storing new element in let
    let element = document.createElement(name);
    // setting the new element's properties
    element[prop1] = value1;
    element[prop2] = value2;
    // return the element
    return element;
}

// function to hide students
// a. array to be passed as argument
const hideStudents = ( collection ) => {
    // b. iterate thru data
    for ( let i = 0; i < collection.length; i++ ) {
        // c. set every student`s display value to none
        collection[i].style.display = `none`;
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
        studentList[i].style.display = `none`;
        // if student should be on this page number:
        // ie.) if pageNumber = 1 then indices 0-9 (students 1-10) will be displayed
        //      if pageNumber = 2 then indices 10-19 (students 11-20) will be displayed, etc...
        if ((pageNumber * studentsPerPage) - studentsPerPage <= i && i < (pageNumber * studentsPerPage)) {
            // show the student
            studentList[i].style.display = `block`;
        }
    }
}


/*====================================
    Append Page Links Functionality
====================================*/

// function to add the active class to the first page link after showPage() is called
const addActiveClass = () => {
    // a. select and store ul
    const uList = document.querySelector(`.pagination ul`);
    // b. select and store the first <a> of uList
    const anchor = uList.querySelectorAll(`a`)[0];
    // c. set class name to active
    anchor.className = `active`;
}

// function remove the active class on all page links
const removeActiveClass = ( a ) => {
    let li = a.parentNode;
    let ul = li.parentNode;
    let anchors = ul.querySelectorAll(`a`);
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].className = ``;
    }
}

// function to create and append the page links
const appendPageLinks = ( studentList ) => {
    // determine how many pages for this student list
    let totalPages = Math.ceil(studentList.length / 10);
    // create a page link section
    // selecting the page div
    const page = document.querySelector(`.page`);
    // creating the pagination div
    const paginationDiv = document.createElement(`div`);
    // adding the pagination class to the pagination div
    paginationDiv.className = `pagination`;
    // creating the pagination ul
    const paginationUl = document.createElement(`ul`);
    // “for” every page
    for ( let i = 1; i <= totalPages; i++ ) {
        // storing the index in pageNumber
        let pageNumber = i;
        // creating the pagination li
        let paginationLi = createElement(`li`);
        // creating the pagination a
        let paginationLink = createElement(`a`, `textContent`, `${pageNumber}`);
        // define what happens when you click a link
        paginationLink.addEventListener(`click`, (e) => {
            let clickedLink = e.target;
            let numberOfPage = parseInt(clickedLink.textContent);
            removeActiveClass(clickedLink);
            // Use the showPage function to display the page for the link clicked
            showPage(numberOfPage, studentList);
            // mark that link as “active”
            clickedLink.className = `active`;
        });
        paginationLi.appendChild(paginationLink);
        paginationUl.appendChild(paginationLi);
    }
    paginationDiv.appendChild(paginationUl);
    page.appendChild(paginationDiv);
}

// function to remove pagination links
const removePageLinks = () => {
    // select and store pagination div
    let paginationLinks = document.querySelector(`.pagination`);
    // select error msg
    let errorMsg = document.querySelector(`.error`);
    // if the .pagination div exists on the page
    if ( paginationLinks ) {
        // traverse to paginationLinks parent node
        let parent = paginationLinks.parentNode;
        // remove .pagination div from page
        parent.removeChild(paginationLinks);
    } else if ( errorMsg ) {    // if .error is on the page
        page.removeChild(errorMsg); // remove .error div
    } else {
        // if there are no links on the page, log out msg to console
        console.log(`no links here!`);
    }
}

/*=============================
    Search Functionality
=============================*/

const searchDiv = createElement(`div`, `className`, `student-search`, `, `);
const searchInput = createElement(`input`, `type`,  `text`, `placeholder`, `Search for students`);
const searchBtn = createElement(`button`, `type`, `submit`, `textContent`, `Search`);

searchDiv.append(searchInput);
searchDiv.append(searchBtn);
pageHeader.append(searchDiv);

// search function to fire when "Search" btn is clicked
const searchList = () => {
    // Obtain the value of the search input
    let userSearch = searchInput.value;
    console.log(`The user searched for: ${userSearch}`);
    // remove the previous page link section
    hideStudents(students);
    // hide the pagination links
    removePageLinks();
    // creating the new matchedStudents array to house those who matched the search criteria
    let matchedStudents = [];
    // Loop over the student list, and for each student…
    for ( let i = 0; i < students.length; i++ ) {
        // ...obtain the student`s name…
        let studentName = students[i].querySelector(`h3`).textContent;
        // ...and the student’s email…
        let studentEmail = students[i].querySelector(`span.email`).textContent;

        // if the student name/email includes any of the characters in the user`s search
        if ( studentName.includes(userSearch.toLowerCase()) || studentEmail.includes(userSearch.toLowerCase()) ) {
            // store the value of that student into the local student variable
            let student = students[i];
            // push value of student into matchedStudents array
            matchedStudents.push(student);
        }
    }

    console.log( `${matchedStudents.length} students matched the search term.`);

    // if no results:
    if ( matchedStudents.length <= 0 || userSearch === ``) {
        // create error div
        const errorDiv = createElement(`div`, `className`, `error`);
        // create error msg
        const errorMsg = createElement(`h2`, `className`, `error-msg`, `textContent`, `Your search returned 0 results. Please search again.`);
        // append error msg to error div
        errorDiv.appendChild(errorMsg);
        page.appendChild(errorDiv);
    } else if ( matchedStudents.length <= 10 ) {
        showPage(1, matchedStudents);
    } else {
        showPage(1, matchedStudents);
        appendPageLinks(matchedStudents);
        addActiveClass();
    }
    // reseting the input's value
    searchInput.value = ``;
    searchInput.placeholder = `Search again`
}

// when the searchBtn is clicked, run the searchList function
searchBtn.addEventListener(`click`, () => {
    searchList();
});

// loading 1st 10 students on page load
showPage(1, students);
// appending page links
appendPageLinks(students);
// adding the active class to the first page link
addActiveClass();
