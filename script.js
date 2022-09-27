let myArray = [];
class Book {
    constructor(name, author, pages) {
        this.name = name;
        this.author = author;
        this.pages = pages
        return (myArray.push({ name: this.name, author: this.author, pages: this.pages }))
    }
}

const show = document.createElement('div')
const container = document.querySelector('.container');
const createBtn = document.getElementById("create")
const deleteBtn = document.getElementById('delete')
container.appendChild(show)

createBtn.addEventListener('click', addBook);

function addBook() {
    console.log(myArray)
    book()
}


function clear(name, author, pages) {
    author.value = ''
    pages.value = ''
    name.value = ''
}


function deleteBook(some) {
    
    const index = myArray.indexOf(some);
    if (index > -1) {
        myArray.splice(index, 1);
    }
    book()
}

function book() {
    show.innerHTML = ''
    const name = document.getElementById('name')
    const author = document.getElementById('author')
    const pages = document.getElementById('pages')

    const newBook = new Book(name.value, author.value, pages.value)

    myArray.forEach(element => {
        const showBookDiv = document.createElement('div')
        show.appendChild(showBookDiv)
        const deleteBtn = document.createElement('button');
        show.appendChild(deleteBtn)
        deleteBtn.innerHTML = 'delete'
        deleteBtn.classList.add(".deleteBtn")
        deleteBtn.addEventListener('click', () => deleteBook(element))
        showBookDiv.innerHTML = `name: ${element.name} || author: ${element.author}, || pages: ${element.pages}`
    });
    clear(name, author, pages)
}