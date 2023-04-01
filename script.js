//access the forms container element in the html
let content = document.getElementById('contentContainer');

//access container for all book "cards" on the page
let books = document.querySelector('.books');

//access image that will later be used to display/hide the form on the page
let addBook = document.getElementById('addBook');

//access the add to library button in the html form
let submit = document.querySelector('button');

//access each input element within the form
let bookTitle = document.getElementById('title');
let bookAuthor = document.getElementById('author');
let bookStatus = document.getElementById('status');

//array that stores each new book
let myLibrary = [];

//placeholder variable that holds a boolean value which later determines the color for the top-border of the created "card"
let cardColor;

//object constructor that defines the parameters for each book 
function Book(title, author, currentStatus, present) {
    this.title = title;
    this.author = author;
    this.currentStatus = currentStatus;
    this.present = present
}

//object method that creates a new "card" containg the new books information which is displayed to the page
Book.prototype.createCard = function () {
    let newCard = document.createElement('div');
    let textContainer = document.createElement('div');
    let titleText = document.createElement('p');
    let authorText = document.createElement('p');
    let imgContainer = document.createElement('div');
    let btnContainer = document.createElement('div');
    let btnRead = document.createElement('button');
    let btnNotRead = document.createElement('button');
    if (cardColor == true) {
        newCard.style.borderColor = "green";
    } else if (cardColor == false) {
        newCard.style.borderColor = "red";
    }
    removeCard = document.createElement('img');
    newCard.className = "book";
    newCard.id = "newCard";
    textContainer.className = "textContainer";
    imgContainer.className = "imgContainer";
    removeCard.setAttribute("src", "imgs/book-remove-outline.svg")
    removeCard.setAttribute("onclick", "this.parentNode.parentNode.remove()");
    removeCard.id = "removeCard";
    btnContainer.className = "btnContainer";
    btnRead.className = "btnRead";
    btnRead.setAttribute("onclick", "read();");
    btnNotRead.className = "btnNotRead";
    books.appendChild(newCard);
    newCard.appendChild(textContainer);
    newCard.appendChild(btnContainer);
    btnContainer.appendChild(btnRead);
    btnContainer.appendChild(btnNotRead);
    textContainer.appendChild(titleText);
    textContainer.appendChild(authorText);
    newCard.appendChild(imgContainer);
    imgContainer.appendChild(removeCard);
    titleText.textContent = title.value;
    authorText.textContent = `by: ${author.value}`;
    btnRead.textContent = "Read";
    btnNotRead.textContent = "Not Read";
}

//function that creates a new instance of the Book() constructor and appends it to the myLibrary array
function addBookToLibrary() {
    let newBook = new Book(bookTitle.value, bookAuthor.value, bookStatus.value);
    if (newBook.currentStatus == "read") {
        cardColor = true;
    } else if (newBook.currentStatus == "not read") {
        cardColor = false;
    }
    myLibrary.push(newBook);
}

//function that reveals/hides a form on the page that the user will use to enter the new books information
function changeDisplay() {
    if (content.style.display = "none") {
        content.style.display = "flex";
    } else if (content.style.display = "flex") {
        content.style.display = "none";
    }
}

//event listener that calls the changeDisplay() function when the addBook image is clicked
addBook.addEventListener('click', function() {
    changeDisplay();
});

//prevents default form submission and instead calls the addBookToLibrary() function to store the users form data in the myLibrary array
submit.addEventListener('click', function(event) {
    let counter = 0;
    if (bookTitle.value == '' || bookAuthor.value == '') {
        
    } else {
        event.preventDefault()
        addBookToLibrary();
        myLibrary[counter].createCard();
        counter++;
    }
});



