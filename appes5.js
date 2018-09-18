//Create Book Constructor
function Book (title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}



//Create UI Constructor
function UI (){}

UI.prototype.addBook = function(book) {

    if (book.title === '' || book.author === '' || book.isbn === '') {
        ui.showMessage('Please fill in all details', 'error');
    } else {
        const list = document.querySelector('#book-list');
        
        //Create a new row
        const row = document.createElement('tr');
        //Populate the row
        row.innerHTML = `
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">Delete</a></td>`;

        list.appendChild(row);

        //Show the success message
        ui.showMessage('The book has been added to the list', 'success');
    }
    
}

UI.prototype.clearFields = function() {
    document.querySelector('#book-title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

UI.prototype.showMessage = function(text, nature) {
    //Select an element after which to insert message
    form = document.querySelector('.book-form');

    //Create a DIV element
    message = document.createElement('div');
    if(nature === 'success') {
        message.textContent = text;
        message.className = 'alert success';
    } else {
        message.textContent = text;
        message.className = 'alert error';
    }
    //Insert the DIV element in the DOM
    form.appendChild(message);
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

UI.prototype.deleteBook = function(link){
    if (link.classList.contains('delete')) {
        link.parentElement.parentElement.remove();
    }
}

//Event Listeners
document.querySelector('.book-form').addEventListener('submit', function(e){

    //Get input values
    const title = document.querySelector('#book-title').value,
          author = document.querySelector('#author').value,
          isbn = document.querySelector('#isbn').value;
    
    // Instantiate a book
    const book = new Book(title, author, isbn);

    //Instantiate UI
    ui = new UI();

    //Add book to UI
    ui.addBook(book);

    //Clear input fields
    ui.clearFields();
    

    // console.log(book);
    e.preventDefault();
})


//Delete Event Listener
document.querySelector('#book-list').addEventListener('click', function(e){
    //Instantiate UI
    ui = new UI();

    ui.deleteBook(e.target);

    //Show the success message
    ui.showMessage('The book has been removed from the list', 'success');

    e.preventDefault();
})