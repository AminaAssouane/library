class Book {
  constructor(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = crypto.randomUUID();
  }

  toggleRead() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
  }

  /* Displaying the library : */
  displayBooks() {
    const container = document.getElementById("book-container");
    container.innerHTML = "";
    this.books.forEach((book, index) => {
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
        const bookId = e.target.id;
        this.deleteBookFromLibrary(bookId);
      });
    });

    // Attach toggle button event listener for read status
    document.querySelectorAll(".toggle-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        const bookId = e.target.id;
        this.toggleRead(bookId);
      });
    });
  }

  /* Adding a new book */
  addBookToLibrary(title, author, pages, read) {
    let newBook = new Book(title, author, pages, read);
    this.books.push(newBook);
  }

  /* Delete book from library */
  deleteBookFromLibrary(id) {
    const index = this.books.findIndex((book) => book.id === id);
    if (index !== -1) {
      this.books.splice(index, 1);
      this.displayBooks();
    }
  }

  /* Toggle book's read status */
  toggleRead(id) {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      book.toggleRead(); // call the prototype method
      this.displayBooks();
    }
  }
}

/* We create a Library instance */

const library = new Library();

library.addBookToLibrary("Harry Potter", "JK Rowling", 433, true);
library.addBookToLibrary("Game of Thrones", "George RR Martin", 788, false);

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

  library.addBookToLibrary(
    document.getElementById("title").value,
    document.getElementById("author").value,
    document.getElementById("pages").value,
    document.getElementById("read").checked,
  );

  bookForm.reset();
  bookForm.style.display = "none";
  library.displayBooks();
});

let displayLibrary = document.getElementById("library");
displayLibrary.addEventListener("click", () => library.displayBooks());
