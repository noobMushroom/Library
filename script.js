const container = document.querySelector('.container');
const show = document.createElement('div');
show.classList.add('show')
const createBtn = document.getElementById("create");
const editDiv = document.getElementById('edit')
container.appendChild(show);



let bookArray = [];

let isPressed = false;// it will determine the functionality of different buttons
let amIRead = ''; // tells if user have read the book


// creates new object
class Book {
    constructor(name, author, pages, read, note) {
        this.name = name;
        this.author = author;
        this.pages = pages;
        this.read = read;
        this.note = note;
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
    const notes = document.getElementById('notes')
    if (bookName.value === '') {
        alert("Name required")
        return
    }
    let newBook = bookName.value
    newBook = new Book(bookName.value, author.value, pages.value, amIRead, notes.value);
    bookArray.push(newBook);
    clear(bookName, author, pages, notes);
    showBook();
}

//* this function delete book from the array

function deleteBook(bookName) {
    if (isPressed == false) {
        const index = bookArray.indexOf(bookName);
        if (index > -1) {
            bookArray.splice(index, 1);
        }
        showBook();
    }
}


//* This function edit the books detail
function editBook(book_Name) {
    const index = bookArray.indexOf(book_Name);

    // creating edit button
    const editBtn = document.createElement("button")
    editBtn.innerHTML = `change ${bookArray[index].name} detail`
    editDiv.appendChild(editBtn)
    editBtn.classList.add("editbtn")

    // grabbing important elements
    const bookName = document.getElementById('name');
    const author = document.getElementById('author');
    const pages = document.getElementById('pages');
    const notes = document.getElementById('notes')

    // changing innerHtml of elements 

    bookName.value=bookArray[index].name;
    author.value=bookArray[index].author;
    pages.value=bookArray[index].pages;
    notes.value=bookArray[index].note;

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

        if (notes.value == '') {
            notes.value = bookArray[index].note
        } else {
            bookArray[index].note = notes.value
        }

        bookArray[index].read = amIRead
        showBook()
        clear(bookName, author, pages, notes);
        editDiv.innerHTML = ''
        return isPressed = false
    })
}



// * read unread function to check if the book is read or not 

function readUnread() {
    let isRead = false
    const readBtn = document.getElementById('readBtn')
    readBtn.innerHTML = 'UNREAD'
    readBtn.setAttribute('style', "background:#dc2626;")
    amIRead = 'UNREAD'
    readBtn.addEventListener("click", () => {
        if (isRead == false) {
            readBtn.innerHTML = 'READ'
            readBtn.setAttribute('style', "background:#22c55e;")
            isRead = true
            return amIRead = 'READ'
        } else if (isRead == true) {
            readBtn.innerHTML = 'UNREAD'
            readBtn.setAttribute('style', "background:#dc2626;")
            isRead = false
            return amIRead = 'UNREAD'
        }
    })
}
readUnread()


// this function displays book on the screen
function showBook() {
    show.innerHTML = ''

    // changing back read unread button styling.
    readUnread()
    const readBtn = document.getElementById('readBtn')
    readBtn.innerHTML = 'UNREAD'
    readBtn.setAttribute('style', "background:#dc2626;")
    amIRead = 'UNREAD';

    // shows total books
    bookCalculator()

    bookArray.forEach(element => {
        const showBookDiv = document.createElement('div');
        show.appendChild(showBookDiv);

        //create divs and show them to display
        createShowBookDiv(showBookDiv, element)
        
        //create read button
        createReadBtn(element, showBookDiv)
        const btns = document.createElement('div')
        showBookDiv.appendChild(btns)
        btns.classList.add('button')

        //*creating delete button
        createDeleteBtn(element, btns)

        // *creating edit button
        createEditBtn(element, btns)      
    });
}

//* this functions clear all the inputs
function clear(name, author, pages, notes) {
    author.value = '';
    pages.value = '';
    name.value = '';
    notes.value = '';
}


//* Creating read button
function createReadBtn(book, div) {
    const index = bookArray.indexOf(book);
    const readUnreadBtn = document.createElement("button");
    readUnreadBtn.classList.add('readBtn');

    //setting color of read button and changing it when click
    if (bookArray[index].read == 'READ') {
        readUnreadBtn.setAttribute('style', 'background: #22c55e;')
    } else if (bookArray[index].read == 'UNREAD') {
        readUnreadBtn.setAttribute('style', 'background: #dc2626;')
    }

    div.appendChild(readUnreadBtn);

    //changing the value of read and unread in array
    readUnreadBtn.addEventListener("click", () => {
        if (bookArray[index].read == 'READ') {
            bookArray[index].read = 'UNREAD'
        } else if (bookArray[index].read == "UNREAD") {
            bookArray[index].read = 'READ'
        }

        //showing it on the display
        showBook()
    }
    )
    readUnreadBtn.innerHTML = `${bookArray[index].read}`
}


//* creating Edit button
function createEditBtn(book, div) {
    const index = bookArray.indexOf(book);
    const editBtn = document.createElement('button');
    editBtn.innerHTML = `<img src="icons/edit.png">`;
    editBtn.classList.add("iconsBtn");
    div.appendChild(editBtn)
    editBtn.addEventListener("click", () => {
        if (isPressed == false) {
            readUnread()
            editBook(book)
            isPressed = true
        }
    })

}


//*creating delete button
function createDeleteBtn(book, div) {
    const index = bookArray.indexOf(book);
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<img src="icons/delete (1).png" >';
    deleteBtn.classList.add("iconsBtn");
    div.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', () => deleteBook(book));
}



// calculating total books in the library and read and unread books.
function bookCalculator() {
    const totalBooks = document.getElementById('total_book')
    const totalReadBooks = document.getElementById('total_read_book')
    const totalUnreadBooks = document.getElementById('total_unread_book')
    totalBooks.innerHTML = `${bookArray.length}`
    let readBooks = bookArray.filter(book => book.read == 'READ');
    totalReadBooks.innerHTML = `${readBooks.length}`

    let unreadBooks = bookArray.filter(book => book.read == 'UNREAD');
    totalUnreadBooks.innerHTML = `${unreadBooks.length}`

}


//creating different divs to show book details. 
function createShowBookDiv(div, element){ 
        const bookName = document.createElement('div')
        bookName.classList.add("book_Name")
        const authorName = document.createElement('div')
        authorName.classList.add("bookDetails")
        const pages = document.createElement('div')
        pages.classList.add("bookDetails")
        const notes = document.createElement('div')
        notes.classList.add("bookNotes")
        div.appendChild(bookName);
        div.appendChild(authorName)
        div.appendChild(pages)
        div.appendChild(notes)
        div.classList.add("showBook")

        // *shows book div 

        bookName.innerHTML = ` ${element.name}`
        authorName.innerHTML = `${element.author}`
        pages.innerHTML = ` ${element.pages}`
        notes.innerHTML = `${element.note}`
}