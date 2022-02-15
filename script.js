let myLibrary = [];
const libraryContainer = document.querySelector('.libraryContainer');
const addBookForm = document.querySelector('#addBookForm');

addBookForm.addEventListener("submit", addBookSubmit, false);

window.onload = function() {
    displayBooksInLibrary();
}

/* OLD FUNCTION (CLASS)
function Book(title, author, pages, hasRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.hasRead = hasRead;
    this.toggleRead = function() {
        this.hasRead = this.hasRead ? false : true;
    }
    this.info = function() {
        let hasReadStr = hasRead ? 'have read it' : 'not read yet';
        return `${title} by ${author}, ${pages} pages, ${hasReadStr}`;
    }
}*/

class Book {
    constructor(title, author, pages, hasRead) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.hasRead = hasRead;
    }

    toggleRead() {
        this.hasRead = this.hasRead ? false : true;
    }
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function displayBooksInLibrary() {
    removeBookDisplays();

    for (let i = 0; i < myLibrary.length; i++) {
        let bookDisplay = document.createElement('div');
        bookDisplay.classList.add('bookDisplay');
        bookDisplay.setAttribute('data-bookIndex', i);
        let hasReadStr = myLibrary[i].hasRead ? 'Have read it' : 'Not read yet';
        bookDisplay.innerHTML = "Title: " + myLibrary[i].title + "<br>" +
            "Author: " + myLibrary[i].author + "<br>"+
            "Number of Pages: " + myLibrary[i].pages + "<br>"+
            hasReadStr +"<br><br>";
        
        // toggle read button
        let readButton = document.createElement('button');
        readButton.textContent = "Toggle Read";
        readButton.addEventListener('click', toggleReadButtonClick, false);

        bookDisplay.appendChild(readButton);
            
        // remove button
        let removeButton = document.createElement('button');
        removeButton.textContent = "Remove Book";
        removeButton.addEventListener('click', removeBook, false);
        
        bookDisplay.appendChild(removeButton);

        libraryContainer.appendChild(bookDisplay);
    }
}

function addBookSubmit(event) {
    event.preventDefault();
    
    let bookName = event.target.elements.name.value;
    let author = event.target.elements.author.value;
    let pages = event.target.elements.pages.value;
    let hasRead = false;
    if (event.target.elements.read.value == 'read') {
        hasRead = true;
    }
    
    addBookToLibrary(new Book(bookName, author, pages, hasRead));

    displayBooksInLibrary();
}

function removeBookDisplays() {
    const elements = document.getElementsByClassName('bookDisplay');
    while(elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removeBook(event) {
    let bookIndex = event.target.parentNode.getAttribute('data-bookIndex');

    myLibrary.splice(bookIndex, 1);

    displayBooksInLibrary();
}

function toggleReadButtonClick(event) {
    let bookIndex = event.target.parentNode.getAttribute('data-bookIndex');

    myLibrary[bookIndex].toggleRead();

    displayBooksInLibrary();
}



// testing purposes
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, false);
const theMartian = new Book('The Martian', 'Andy Weir', 384, true);
const atTheMountainsOfMadness = new Book('At The Mountains Of Madness', 'H.P. Lovecraft', 194, true);

addBookToLibrary(theHobbit);
addBookToLibrary(theMartian);
addBookToLibrary(atTheMountainsOfMadness);