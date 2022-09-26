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
const con = document.querySelector('.container');
const createBtn = document.getElementById("create")
const deleteBtn = document.getElementById('delete')
con.appendChild(show)

createBtn.addEventListener('click', addBook);
deleteBtn.addEventListener('click', deleteBook)

function addBook() {
    show.innerHTML = ''
    const name = document.getElementById('name')
    const author = document.getElementById('author')
    const pages = document.getElementById('pages')
    if (name.value && author.value && pages.value != '') {
        const newBook = new Book(name.value, author.value, pages.value)
    }
    myArray.forEach(element => {
        const showBookDiv = document.createElement('div')
        show.appendChild(showBookDiv)
        btn()
        showBookDiv.innerHTML = `name: ${element.name} || author:${element.author},|| pages: ${element.pages}`
    });
    clear(name, author, pages)
}


function clear(name, author, pages) {
    author.value = ''
    pages.value = ''
    name.value = ''
}

// todo change it's name
function btn() {
    const deleteBtn = document.createElement('button');
    show.appendChild(deleteBtn)  
    deleteBtn.innerHTML = 'delete'
    deleteBtn.classList.add(".deleteBtn")
    deleteBtn.addEventListener('click', deleteBook)
}

function deleteBook (){
    console.log('clicked')
}