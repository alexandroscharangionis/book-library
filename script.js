"use strict";

const addBtn = document.querySelector(".add-btn");
let totalBooksDisplay = document.querySelector(".total_books");

let finishedBooksDisplay = document.querySelector(".finished_books");
finishedBooksDisplay.textContent = 0;
let finishedBooks = 0;
const bookForm = document.querySelector(".book_form");
const closeBtn = document.querySelector(".close_btn");
const submitBook = document.getElementById("submitBtn");
const formWrapper = document.getElementById("wrapper");
const library = document.querySelector(".library");
const error = document.getElementById("error");
const resetBtn = document.getElementById("resetBtn");

let myLibrary = [
  {
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    pages: 356,
    displayed: false,
    read: false,
  },
];

// Class for book object
class Book {
  constructor(title, author, pages) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.displayed = false;
    this.read = false;
  }
}

// Book object constructor
// const Book = function (title, author, pages) {
//   this.title = title;
//   this.author = author;
//   this.pages = pages;
//   this.displayed = false;
//   this.read = false;
// };

// Show/hide form via class toggle
const displayForm = function () {
  bookForm.classList.toggle("book_form-active");
  formWrapper.classList.toggle("form_wrapper");
};

addBtn.addEventListener("click", displayForm);

closeBtn.addEventListener("click", () => {
  formWrapper.classList.toggle("form_wrapper");
  bookForm.classList.toggle("book_form-active");
});

// Turn user form input and store it into object, then clear form.
const takeFormDataToLibrary = function (event) {
  event.preventDefault();
  let bookTitle = document.getElementById("book_title").value;
  let bookAuthor = document.getElementById("book_author").value;
  let bookPages = document.getElementById("book_pages").value;

  if (bookTitle === "" || bookAuthor === "" || bookPages === "") {
    error.textContent = "Please fill in every field.";
  } else {
    addBookToLibrary(bookTitle, bookAuthor, bookPages);
    bookForm.classList.remove("book_form-active");
    formWrapper.classList.remove("form_wrapper");
    document.getElementById("form").reset();
  }
};

submitBook.addEventListener("click", takeFormDataToLibrary);

resetBtn.addEventListener("click", (e) => {
  document.getElementById("form").reset();
  error.textContent = "";
});

// Create new object for new book entry and add to library array
const addBookToLibrary = function (title, author, pages) {
  const book = new Book(title, author, pages);
  myLibrary.push(book);
  displayBooks();
};

const displayBooks = function () {
  // Loop through library array.
  myLibrary.forEach((item, index) => {
    // If current item(object) doesn't have displayed property to 'true', go on.
    if (item.displayed === false) {
      const card = document.createElement("div");
      const deleteBtn = document.createElement("button");
      const readBtn = document.createElement("button");
      readBtn.classList.add("readBtn");
      readBtn.textContent = "Not read";
      deleteBtn.classList.add("deleteBtn");
      deleteBtn.textContent = "X";
      card.appendChild(deleteBtn);
      card.appendChild(readBtn);
      card.classList.add("book_card");
      card.setAttribute("id", `${item}-${index}`);

      library.appendChild(card);

      // Read/Not read toggle
      readBtn.addEventListener("click", (e) => {
        readBtn.classList.toggle("readBtnYes");
        if (readBtn.classList.contains("readBtnYes")) {
          readBtn.textContent = "Read!";
          item.read = true;
          finishedBooks++;
        } else {
          readBtn.textContent = "Not read";
          item.read = false;
          finishedBooks--;
        }

        finishedBooksDisplay.textContent = finishedBooks;
      });

      // Delete card & object in library
      deleteBtn.addEventListener("click", (e) => {
        document.getElementById(`${item}-${index}`).remove();
        if (item.read === true) {
          item.read = false;
          finishedBooks--;
        }
        myLibrary.splice(index, 1);
        totalBooksDisplay.textContent = myLibrary.length;
        finishedBooksDisplay.textContent = finishedBooks;
      });

      // For every property in the object except 'displayed', create a paragraph containing it's value.
      for (let key in item) {
        if (key !== "displayed" && key !== "read") {
          const para = document.createElement("p");
          para.textContent = item[key];

          switch (key) {
            case "title":
              para.classList.add("book_title");
              break;
            case "author":
              para.classList.add("book_author");
              break;
            case "pages":
              para.classList.add("book_pages");
              para.textContent = `${item[key]} pages`;
              break;
          }
          card.appendChild(para);
        }
      }
    }
    // Change object's 'displayed' property to true, so it won't get displayed next time when function/loop is fired.
    item.displayed = true;
  });
  totalBooksDisplay.textContent = myLibrary.length;
};

displayBooks();
