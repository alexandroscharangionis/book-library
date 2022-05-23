"use strict";

const addBtn = document.querySelector(".add-btn");
const totalBooks = document.querySelector(".total_books");
const finishedBooks = document.querySelector(".finished_books");
const bookForm = document.querySelector(".book_form");
const closeBtn = document.querySelector(".close_btn");
const bookTitle = document.getElementById("book_title");
const bookAuthor = document.getElementById("book_author");
const bookPages = document.getElementById("book_pages");
const submitBook = document.getElementById("submit");
const formWrapper = document.getElementById("wrapper");
let myLibrary = [];

// Book object constructor
const Book = function (title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
};

// Create new object for new book entry and add to library array
const addBookToLibrary = function (title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
};

// Display book cards on page from library array
const displayBooks = function () {
  const books = document.querySelector(".library");

  // Loops over library array and creates a card for each array item
  myLibrary.forEach((myLibrary) => {
    const card = document.createElement("div");
    card.classList.add("book_card");
    books.appendChild(card);

    for (let key in myLibrary) {
      const para = document.createElement("p");
      para.textContent = myLibrary[key];

      switch (key) {
        case "title":
          para.classList.add("book_title");
          break;
        case "author":
          para.classList.add("book_author");
          break;
        case "pages":
          para.classList.add("book_pages");
          para.textContent = `${myLibrary[key]} pages`;
          break;
      }
      card.appendChild(para);
    }
  });
};
const addNewBook = function () {
  bookForm.classList.toggle("book_form-active");
  formWrapper.classList.toggle("form_wrapper");
};

closeBtn.addEventListener("click", () => {
  formWrapper.classList.toggle("form_wrapper");
  bookForm.classList.toggle("book_form-active");
});

addBtn.addEventListener("click", addNewBook);

addBookToLibrary("Klara and the Sun", "Kazuo Ishiguro", 423);
addBookToLibrary("Harry Potter", "J.K. Rowling", 500);
addBookToLibrary("Misery", "Stephen King", 350);
addBookToLibrary("What you can see from here", "Mariana Leky", 380);
displayBooks();
