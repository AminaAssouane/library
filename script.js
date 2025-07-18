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

function displayBooks() {
  for (let book of myLibrary) {
    console.log(`${book.title}`);
  }
}
