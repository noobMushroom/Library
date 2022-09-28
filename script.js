const container = document.querySelector('.container');
const show = document.createElement('div');
show.classList.add('show')
const createBtn = document.getElementById("create");
const editDiv = document.getElementById('edit')
container.appendChild(show);



let bookArray = [];

let isPressed = false;// it will determine the functionality of different buttons
let amIRead = ''; // tells if user have read the book

class Book {
    constructor(name, author, pages, read, note) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.note=note;
    }
}

// add button
createBtn.addEventListener('click', () => {
    if (isPressed == false) {
        addBook()
    }
});


//* this function add books to the array
function addBook() {
    const bookName = document.getElementById('name');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const notes= document.getElementById('notes')
    if (bookName.value === '') {
        return
    }
    let newBook = bookName.value
    newBook = new Book(bookName.value, author.value, pages.value, amIRead, notes.value);
    bookArray.push(newBook);
    clear(bookName, author, pages,notes);
    showBook();
}

//* this function delete book from the array

function deleteBook(bookName) {
    const index = bookArray.indexOf(bookName);
    if (index > -1) {
        bookArray.splice(index, 1);
    }
    showBook();
}


//* This function edit the books detail
function editBook(book_Name) {
    const index = bookArray.indexOf(book_Name);

    // creating edit button
    const editBtn = document.createElement("button")
    editBtn.innerHTML = `change ${bookArray[index].name} detail`
    editDiv.appendChild(editBtn)
    editBtn.classList.add("btn")

    // grabbing important elements
    const bookName = document.getElementById('name');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const notes= document.getElementById('notes')

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

        if (notes.value==''){
            notes.value=bookArray[index].note
        }else{
            bookArray[index].note=notes.value
        }

        bookArray[index].read = amIRead
        showBook()
        clear(bookName, author, pages, notes );
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
    readUnread()
    const readBtn = document.getElementById('readBtn')
    readBtn.innerHTML = 'unread'
    readBtn.setAttribute('style', "background:red;")
    amIRead = 'unread';
    bookCalculator()

    bookArray.forEach(element => {
        const showBookDiv = document.createElement('div');
        showBookDiv.classList.add("showBook")
        show.appendChild(showBookDiv);
        //create read button
        createReadBtn(element)

        //*creating delete button
        createDeleteBtn(element)

        // *creating edit button
        createEditBtn(element)


        //*displaying element to the div

        showBookDiv.innerHTML = `name: ${element.name} <br> author: ${element.author} <br>  pages: ${element.pages} <br> Notes: ${element.note}`;
    });
}


function clear(name, author, pages, notes) {
    author.value = '';
    pages.value = '';
    name.value = '';
    notes.value='';
}


//* Creating read button
function createReadBtn(book) {
    const index = bookArray.indexOf(book);
    const readUnreadBtn = document.createElement("button");
    readUnreadBtn.classList.add('btn');
    if (bookArray[index].read == 'read') {
        readUnreadBtn.setAttribute('style', 'background: green;')
    } else if (bookArray[index].read == 'unread') {
        readUnreadBtn.setAttribute('style', 'background: red;')
    }

    show.appendChild(readUnreadBtn);
    readUnreadBtn.addEventListener("click", () => {
        if (bookArray[index].read == 'read') {
            bookArray[index].read = 'unread'
        } else if (bookArray[index].read == "unread") {
            bookArray[index].read = 'read'
        }

        showBook()
    }
    )
    readUnreadBtn.innerHTML = `${bookArray[index].read}`
}


//* creating Edit button
function createEditBtn(book) {
    const index = bookArray.indexOf(book);
    const editBtn = document.createElement('button');
    editBtn.textContent = `edit ${bookArray[index].name} book`;
    editBtn.classList.add("btn");
    show.appendChild(editBtn)
    editBtn.addEventListener("click", () => {
        if (isPressed == false) {
            readUnread()
            editBook(book)
            isPressed = true
        }
    })

}


//*creating delete button
function createDeleteBtn(book) {
    const index = bookArray.indexOf(book);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = 'Remove Book';
    deleteBtn.classList.add("btn");
    show.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => deleteBook(book));
}



// calculating total books in the library and read and unread books.
function bookCalculator() {
    const totalBooks = document.getElementById('total_book')
    const totalReadBooks= document.getElementById('total_read_book')
    const totalUnreadBooks= document.getElementById('total_unread_book')
    totalBooks.innerHTML = `Total Number of book: ${bookArray.length}`
    let readBooks= bookArray.filter(book=> book.read=='read');
    totalReadBooks.innerHTML=`Total read books: ${readBooks.length}`

    let unreadBooks= bookArray.filter(book=> book.read=='unread');
    totalUnreadBooks.innerHTML=`Total Unread books: ${unreadBooks.length}`

}