// todo 1) add function to check whether the user read that book or not

let bookArray = [];

let isPressed = false;
let amIRead = '';

class Book {
    constructor(name, author, pages, read) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

const container = document.querySelector('.container');
const show = document.createElement('div');
const createBtn = document.getElementById("create");
const editDiv = document.getElementById('edit')
container.appendChild(show);

createBtn.addEventListener('click', () => {
    if (isPressed == false) {
        addBook()

    }
});

function addBook() {
    const bookName = document.getElementById('name');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    if (bookName.value === '') {
        return
    }
    let newBook = bookName.value
    newBook = new Book(bookName.value, author.value, pages.value, amIRead);
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



function editBook(book_Name) {
    const index = bookArray.indexOf(book_Name);

    // creating edit button
    const editBtn = document.createElement("button")
    editBtn.innerHTML = `change ${bookArray[index].name} detail`
    editDiv.appendChild(editBtn)
    editBtn.classList.add(".btn")

    // grabbing important elements
    const bookName = document.getElementById('name');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');


    //changing the values of index 
    editBtn.addEventListener('click', () => {
        if (bookName.value == '') {
            bookName.value = bookArray[index].name
        } else {
            bookArray[index].name = bookName.value;
        }

        if (author.value == '') {
            author.value = bookArray[index].author;
        } else {
            bookArray[index].author = author.value;
        }

        if (pages.value == '') {
            pages.value = bookArray[index].pages
        } else {
            bookArray[index].pages = pages.value;
        }
        bookArray[index].read=amIRead
        showBook()
        clear(bookName, author, pages);
        editDiv.innerHTML = ''
        return isPressed = false
    })
}



// * read unread function to check if the book is read or not 

function readUnread() {
    let isRead = false
    const readBtn = document.getElementById('readBtn')
    readBtn.innerHTML = 'unread'
    readBtn.setAttribute('style', "background:red;")
    amIRead = 'unread'
    readBtn.addEventListener("click", () => {
        if (isRead == false) {
            readBtn.innerHTML = 'read'
            readBtn.setAttribute('style', "background:green;")
            isRead = true
            return amIRead = 'read'
        } else if (isRead == true) {
            readBtn.innerHTML = 'unread'
            readBtn.setAttribute('style', "background:red;")
            isRead = false
            return amIRead = 'unread'
        }
    })
}
readUnread()
function showBook() {
    show.innerHTML = ''
    const totalBooks = document.getElementById('total_book')
    totalBooks.innerHTML = `Total Number of book: ${bookArray.length}`
    
    readUnread()
    const readBtn = document.getElementById('readBtn')
    readBtn.innerHTML = 'unread'
    readBtn.setAttribute('style', "background:red;")
    amIRead = 'unread';


    bookArray.forEach(element => {
        const showBookDiv = document.createElement('div');
        show.appendChild(showBookDiv);

        //*creating delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = 'Remove Book';
        deleteBtn.classList.add(".btn");
        show.appendChild(deleteBtn);
        deleteBtn.addEventListener('click', () => deleteBook(element));

        // *creating edit button
        const editBtn = document.createElement('button');
        editBtn.textContent = `edit ${element.name} book`;
        editBtn.classList.add(".btn");
        show.appendChild(editBtn)
        editBtn.addEventListener("click", () => {
            if (isPressed == false) {
                readUnread()
                editBook(element)
                isPressed = true
            }
        })

        // creating read button
        const readUnreadBtn=document.createElement("button");
        readUnreadBtn.classList.add('.btn');
        show.appendChild(readUnreadBtn);
        readUnreadBtn.addEventListener("click", ()=> {
            console.log("clicked")}
        )
        readUnreadBtn.innerHTML=`${amIRead}`


        //*displaying element to the div

        showBookDiv.innerHTML = `name: ${element.name} <br> author: ${element.author} <br>  pages: ${element.pages} <br> ${element.read} <br><br>`;
    });
}


function clear(name, author, pages) {
    author.value = '';
    pages.value = '';
    name.value = '';
}