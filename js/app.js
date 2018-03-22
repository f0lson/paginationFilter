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

const appendPageLinks = (studentList) => {
    // determine how many pages for this student list
    let totalPages = Math.ceil(studentList.length / 10);

    // create a page link section
    // “for” every page
    let paginationHTML = '<'
    for ( let i = 1; i <= totalPages; i++ ) {
        console.log(i);
    }
    // add a page link to the page link section
    // remove the old page link section from the site
    // append our new page link section to the site
    // define what happens when you click a link
    // Use the showPage function to display the page for the link clicked
    // mark that link as “active”
}
