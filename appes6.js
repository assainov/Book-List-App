//Create classes
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBook (book) {
        if (book.title === '' || book.author === '' || book.isbn === ''){
            ui.showMessage('Please fill in all details', 'error');
        } else {

            const list = document.querySelector('#book-list');
            //Create a new element in the DOM and insert the values
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.isbn}</td>
                <td><a href="#" class="delete">Delete</a></td>
            `;
            list.appendChild(tr);
            ui.showMessage('The book has been added successfully', 'success');

            Store.addToStorage(book);
        }
    }
    clearFields() {
        document.querySelector('#book-title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    showMessage(message, nature) {
        //Select the form
        const form = document.querySelector('.book-form');
        //create div
        const div = document.createElement('div');
        
        if (nature === 'error') {
            div.className = 'alert error';
        } else {
            div.className = 'alert success';
        }
        //Insert the message in DIV
        div.appendChild(document.createTextNode(message));
        //Insert the Alert in DOM
        form.appendChild(div);

        setTimeout(function(){
            document.querySelector('.alert').remove();
        }, 3000);
    }
    deleteBook(link){
        if (link.classList.contains('delete')) {
            link.parentElement.parentElement.remove();

            ui.showMessage('The book has been removed', 'success');
        }
    }       
    }

    //STORE CLASS TO STORE IN LOCAL STORAGE
    class Store {
        static getBooks() {
            let books;
            if (localStorage.getItem('books') === null) {
                books = [];
            } else {
                books = JSON.parse(localStorage.getItem('books'));
            }
            return books;
        }
        static addToStorage(book){
            
            let books = Store.getBooks();
    
            books.push(book);
    
            localStorage.setItem('books', JSON.stringify(books));
        }
    
        static retrieveFromStorage() {
            
            let books = Store.getBooks();
    
            const list = document.querySelector('#book-list');
    
            books.forEach(function(item, index){
                //Create a new element in the DOM and insert the values
                const tr = document.createElement('tr');
                tr.innerHTML = `
                    <td>${item.title}</td>
                    <td>${item.author}</td>
                    <td>${item.isbn}</td>
                    <td><a href="#" class="delete">Delete</a></td>
                `;
                list.appendChild(tr);
            })
    }

    static deleteFromStorage(target) {
        
        let books = Store.getBooks();


        books.forEach(function(item,index){
            if (item.isbn === target.parentElement.previousElementSibling.textContent) {
                books.splice(index, 1);
            }
        })

        localStorage.setItem('books', JSON.stringify(books));
    }
}

//Instantiate UI
ui = new UI();


//Retieve books from Local storage on document load
document.addEventListener('DOMContentLoaded', Store.retrieveFromStorage);

//Listen to the form submit
document.querySelector('.book-form').addEventListener('submit', function(e){
    const title = document.querySelector('#book-title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;

    //Instantiate a new book
    book = new Book(title, author, isbn);

    ui.addBook(book);

    ui.clearFields();
    e.preventDefault();
})


//Listen to item delete
document.querySelector('#book-list').addEventListener('click', function(e){
    //Instantiate UI
    ui = new UI();

    ui.deleteBook(e.target);
    Store.deleteFromStorage(e.target);

    e.preventDefault();
})


