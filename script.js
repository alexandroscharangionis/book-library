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
let myLibrary = [];

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

