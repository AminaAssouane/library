const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

function addBookToLibrary(title, author, pages, read) {
  let newBook = new Book(title, author, pages, read);
  myLibrary.push(newBook);
}

addBookToLibrary("Harry Potter", "JK Rowling", 433, true);
addBookToLibrary("Game of Thrones", "George RR Martin", 788, false);

/* Displaying the library : */
function displayBooks() {
  const container = document.getElementById("book-container");
  container.innerHTML = "";
  myLibrary.forEach((book, index) => {
    let bookDiv = document.createElement("div");
    bookDiv.innerHTML = `
        <div>Book ${index + 1}:</div>
        <div>Title : ${book.title}</div>
        <div>Author : ${book.author}</div>
        <div>Pages : ${book.pages}</div>
        <div>Read : ${book.read ? "Yes" : "No"} </div>
        <div>ID : ${book.id}</div>
        </br>`;
    container.appendChild(bookDiv);
  });
}

let displayLibrary = document.getElementById("library");
displayLibrary.addEventListener("click", displayBooks);

/* Adding a new book */

let bookForm = document.querySelector("form");

let newBook = document.getElementById("new-book");
newBook.addEventListener("click", () => {
  bookForm.style.display = "block";
});

/* Submit the form */
let submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  bookForm.style.display = "none";
});
