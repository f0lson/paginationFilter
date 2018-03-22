const pageHeader = document.querySelector('.page-header');
const studentsList = document.querySelector
const students = document.querySelectorAll('li.student-item');

const showPage = (pageNumber, studentList) => {
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

const removeActiveClass = (a) => {
    let li = a.parentNode;
    let ul = li.parentNode;
    let anchors = ul.querySelectorAll('a');
    for (let i = 0; i < anchors.length; i++) {
        anchors[i].className = '';
    }
}

const addActiveClass = () => {
    const uList = document.querySelector('.pagination ul');
    const anchor = uList.querySelectorAll('a')[0];
    anchor.className = 'active';
}

const appendPageLinks = (studentList) => {
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


const searchDiv = document.createElement('div');
searchDiv.className = 'student-search';
const searchInput = document.createElement('input');
searchInput.type = 'text';
searchInput.placeholder = 'Search for students';
const searchBtn = document.createElement('button');
searchBtn.type = 'submit';
searchBtn.textContent = 'Search';
searchDiv.append(searchInput);
searchDiv.append(searchBtn);

pageHeader.append(searchDiv);

const searchList = () => {
    // Obtain the value of the search input
    let userSearch = searchInput.value;
    console.log(userSearch);
    // remove the previous page link section
    // Loop over the student list, and for each student…
    for ( let i = 0; i < students.length; i++ ) {
        let studentName = students[i].querySelector('h3').textContent;
        let studentEmail = students[i].querySelector('span.email').textContent;
        if ( studentName.includes(userSearch.textContent) ) {
            console.log(`It's a match!`);
        }
    }
        // ...obtain the student’s name…
        // ...and the student’s email…
        // ...if the search value is found inside either email or name…
    		// ...add this student to list of “matched” student
    // If there’s no “matched” students…
           // ...display a “no student’s found” message
    // If over ten students were found…
           // ...call appendPageLinks with the matched students
   // Call showPage to show first ten students of matched list
}

searchBtn.addEventListener('click', () => {
    searchList();
    console.log('clicked!');
});

document.addEventListener('DOMContentLoaded', () => {
    showPage(1, students);
    appendPageLinks(students);
    addActiveClass();
});
