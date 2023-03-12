//Book class to represent a book
class Book{
    constructor(title,author,isbn){
        this.title=title;
        this.author=author;
        this.isbn=isbn;
    }
}

//UI CLASS - handle tasks
class UI{
    static displayBooks(){

    const books=Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
}
    static addBookToList(book){
        const list=document.querySelector('#book-list')

        const row=document.createElement('tr');

        row.innerHTML=`
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;
    //to append to the list

    list.appendChild(row);
    }
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    }
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);
    
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
      }
    static clearFields(){
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#isbn').value='';
    }
    }

//to handle storage
class Store{
    static getBooks() {
        let books;
        if(localStorage.getItem('books') === null) {
          books = [];
        } else {
          books = JSON.parse(localStorage.getItem('books'));
        }
    
        return books;
      }
    
      static addBook(book) {
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
      }
      static searchBook(author){
        let auth = document.getElementById('author').value;
        let exist = JSON.parse(localStorage.getItem('books')).some(data => data.author.toLowerCase() == auth);
        if(!exist){
            alert("not found");
        }
        else{
            alert("book found");
            
        }
        e.preventDefault();

      }
    
      static removeBook(isbn) {
        const books = Store.getBooks();
    
        books.forEach((book, index) => {
          if(book.isbn === isbn) {
            books.splice(index, 1);
          }
        });
    
        localStorage.setItem('books', JSON.stringify(books));
      }

}
//to display books
document.addEventListener('DOMContentLoaded',UI.displayBooks);


//to add a book
document.querySelector('#book-form').addEventListener('submit',(e)=>{
   
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;

     // Validate
  if(title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } 
  else{
    //instatiate a book
    const book = new Book(title,author,isbn);
    console.log(title,author,isbn)

    //add book to ui
    UI.addBookToList(book);

    //add book to store
    Store.addBook(book);

    //show success message
    UI.showAlert('book successfully added','success');

    //to clear fields
    UI.clearFields();
  }    
    });
  


   //to Search for a book
    function myFunction() {
        let x = document.getElementById("gsearch");
        document.getElementById("list2").innerHTML = "You are searching for: " + x.value;
        let books = JSON.parse(localStorage.getItem('books')) || [];
        let exist = JSON.parse(localStorage.getItem('books')).some(data => data.author.toLowerCase() == x.value.toLowerCase());
        if(!exist){
            alert("Oops..Book not found");
        }
        else{
            alert("Book found-Yaay!!");
            
        }
        e.preventDefault();
        UI.clearFields();

     }
    //to remove book
    document.querySelector('#book-list').addEventListener('click',(e)=>{
        UI.deleteBook(e.target);

        //remove from store
        Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
        UI.showAlert('book removed','success');

});