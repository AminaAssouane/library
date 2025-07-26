const myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = crypto.randomUUID();
}

Book.prototype.toggleRead = function () {
  this.read = !this.read;
};

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
        </br>
        <button class="toggle-btn" id="${book.id}">Read</button>
        <button class="delete-btn" id="${book.id}">Delete</button>
        </br></br></br>`;
    container.appendChild(bookDiv);
  });
  // Attach delete event listeners AFTER books are rendered
  document.querySelectorAll(".delete-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const idToToggle = e.target.id;
      deleteBookFromLibrary(idToToggle);
    });
  });

  // Attach toggle button event listener for read status
  document.querySelectorAll(".toggle-btn").forEach((button) => {
    button.addEventListener("click", (e) => {
      const idToDelete = e.target.id;
      toggleRead(idToDelete);
    });
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

submitButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (!bookForm.checkValidity()) {
    bookForm.reportValidity(); // show the built-in browser messages
    return; // stop further execution if invalid
  }

  addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked
  );

  bookForm.reset();
  bookForm.style.display = "none";
  displayBooks();
});

/* Delete book from library */
function deleteBookFromLibrary(id) {
  const index = myLibrary.findIndex((book) => book.id === id);
  if (index !== -1) {
    myLibrary.splice(index, 1);
    displayBooks();
  }
}

/* Toggle book's read status */
function toggleRead(id) {
  const book = myLibrary.find((book) => book.id === id);
  if (book) {
    book.toggleRead(); // call the prototype method
    displayBooks();
  }
}
