// todo 1) add function to check whether the user read that book or not
// todo 2) add a function to edit the content of the book.

let bookArray = [];
class Book {
    constructor(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages;
    }
}

const container = document.querySelector('.container');
const show = document.createElement('div');
const createBtn = document.getElementById("create");
container.appendChild(show);

createBtn.addEventListener('click', addBook);

function addBook() {
    const bookName = document.getElementById('name');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    if (bookName.value === '') {
        return
    }
    let newBook= bookName.value
    newBook = new Book(bookName.value, author.value, pages.value);
    bookArray.push(newBook);
    clear(bookName, author, pages);
    showBook();
}

function deleteBook(bookName) {
    const index = bookArray.indexOf(bookName);
    if (index > -1) {
        bookArray.splice(index, 1);
    }
    showBook();
}



function editBook(bookName) {
    const index = bookArray.indexOf(bookName);
    if (index > -1) {
        bookArray.splice(index, 1);
    }
    showBook();
}



function showBook() {
    console.log(bookArray)
    console.log(`this is expArray ${expArray}`)
    console.log(expArray)
    show.innerHTML = ''
    bookArray.forEach(element => {
        const showBookDiv = document.createElement('div');
        show.appendChild(showBookDiv);
        const deleteBtn = document.createElement('button');
        show.appendChild(deleteBtn);
        deleteBtn.innerHTML = 'Remove Book';
        deleteBtn.classList.add(".deleteBtn");
        deleteBtn.addEventListener('click', () => deleteBook(element));
        showBookDiv.innerHTML = `name: ${element.name} <br> author: ${element.author} <br>  pages: ${element.pages}`;
    });
}


function clear(name, author, pages) {
    author.value = '';
    pages.value = '';
    name.value = '';
}