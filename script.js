//access the forms container element in the html
let content = document.getElementById('contentContainer');

//access container for all book "cards" on the page
let books = document.getElementById('bookContainer');

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
let currentIndex = 0;

//placeholder variable that holds a boolean value which later determines the color for the top-border of the created "card"
let cardColor;


//class that allows a new instance of Book to be constructed, appended to the myLibrary array, and displayed on the screen
class Book {
    constructor(title, author, currentStatus, color) {
        this.title = title;
        this.author = author;
        this.currentStatus = currentStatus;
        this.color = color;
    }

    createCard() {
        let textContainer = document.createElement('div');
        let newCard = document.createElement('div')
        newCard.setAttribute("data-index", (myLibrary.length - 1));
        let theIndex = newCard.getAttribute("data-index");
        let titleText = document.createElement('p');
        let authorText = document.createElement('p');
        let imgContainer = document.createElement('div');
        let btnContainer = document.createElement('div');
        let btnRead = document.createElement('button');
        let btnNotRead = document.createElement('button');
        if (cardColor == true) {
            newCard.style.borderColor = "green";
            myLibrary[theIndex].color = "green";
        } else if (cardColor == false) {
            newCard.style.borderColor = "red";
            myLibrary[theIndex].color = "red";
        }
        let removeCard = document.createElement('img');
        newCard.className = "book";
        textContainer.className = "textContainer";
        imgContainer.className = "imgContainer";
        removeCard.setAttribute("src", "imgs/book-remove-outline.svg");
        removeCard.setAttribute("onclick", "NewDeletion(this)");
        removeCard.id = "removeCard";
        btnContainer.className = "btnContainer";
        btnRead.className = "btnRead";
        btnRead.setAttribute("onclick", "read(this)");
        btnNotRead.setAttribute("onclick", "notRead(this)")
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

    addBookToLibrary() {
        if (this.currentStatus == "read") {
            cardColor = true;
        } else if (this.currentStatus == "not read") {
            cardColor = false;
        }
        myLibrary.push(this);
    }

}

//function to delete and rearrange the cards on the page according to their correct data-index attribute values in correlation to the index of their corresponding object in the array
function displayArray() {
    let htmlText = "";
    for (let i = 0; i < myLibrary.length; i++) { 
        htmlText += "<div class='book' data-index="+i+" style='border-color: "+myLibrary[i].color+"'>";
            htmlText += "<div class='textContainer'>";
                htmlText += "<p>"+myLibrary[i].title+"</p>";
                htmlText += "<p>by: "+myLibrary[i].author+"</p>";
            htmlText += "</div>";
            htmlText += "<div class='btnContainer'>";
            htmlText += "<button class='btnRead' onclick='read(this);'>Read</button>";
            htmlText += "<button class='btnNotRead' onclick='notRead(this);'>Not Read</button>";
            htmlText += "</div>";
            htmlText += "<div class='imgContainer'>";
                htmlText += "<img src='imgs/book-remove-outline.svg' onclick='NewDeletion(this)' id='removeCard'>";
            htmlText += "</div>";
        htmlText += "</div>";
    }
    document.getElementById('bookContainer').innerHTML = htmlText;
}

//function that deletes the clicked card
function NewDeletion(theThis) {
    let theIndex = theThis.parentNode.parentNode.getAttribute('data-index');
    myLibrary.splice(theIndex, 1);
    theThis.parentNode.parentNode.remove();
    displayArray();
}

//function that changes the status of a book to read, and changes the border-color to accurately represent the status
function read(theThis) {
    let theIndex = theThis.parentNode.parentNode.getAttribute('data-index');
    theThis.parentNode.parentNode.style.borderColor = "green";
    myLibrary[theThis.parentNode.parentNode.getAttribute("data-index")].currentStatus = "read";
    myLibrary[theIndex].color = "green";
}

//function that changes the status of a book to not read, and changes the border-color to accurately represent the status
function notRead(theThis) {
    let theIndex = theThis.parentNode.parentNode.getAttribute('data-index');
    theThis.parentNode.parentNode.style.borderColor = "red";
    myLibrary[theThis.parentNode.parentNode.getAttribute("data-index")].currentStatus = "not read";
    myLibrary[theIndex].color = "red";
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
        // do nothing
    } else {
        event.preventDefault()
        let newBook = new Book(bookTitle.value, bookAuthor.value, bookStatus.value);
        newBook.addBookToLibrary();
        myLibrary[counter].createCard();
        counter++;
    }
});