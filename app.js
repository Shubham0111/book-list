// book class
class Book{
    constructor(title,author,isbn)
    {
         this.title=title;
         this.author=author;
         this.isbn=isbn;
    }
}

// UI class 
class UI{
    // all the methods static coz we wont be creating obejcts from this class
    static displayBooks(){
    
     const books=Store.getBooks();
     books.forEach((book)=>UI.addBookToList(book));
    }
     static addBookToList(book)
     {
       const list =document.querySelector('#book-list');
         const row=document.createElement('tr');
         row.innerHTML+=`<td>${book.title}</td>
                         <td>${book.author}</td>
                         <td>${book.isbn}</td>
                         <td><a href="#"class="btn btn-danger btn-sm delete">X</a></td>`
         list.appendChild(row);            
     } 
     static deleteBook(el)
     {
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
     }
     
     static showAlert(message,className){
           const div=document.createElement('div');
           div.className=`alert alert-${className}`;
           div.appendChild(document.createTextNode(message));
           const container=document.querySelector('.container');
           const form=document.querySelector('#book-form');
           container.insertBefore(div,form);

           setTimeout(function(){
            document.querySelector('.alert').remove();
           },2000);
     }
}

// store 
class Store {
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

// events 
 document.addEventListener('DOMContentLoaded',UI.displayBooks());
// event: add a book
document.querySelector('#book-form').addEventListener('submit',function(e)
{
    e.preventDefault();
    const title=document.querySelector('#title').value;
    const author=document.querySelector('#author').value;
    const isbn=document.querySelector('#isbn').value;
    // validate
    if(title==='' || author==='' || isbn===''){
         UI.showAlert('Please fill in all fields','danger');   
    }
    else{
    // if correct
    const book=new Book(title,author,isbn);

    UI.addBookToList(book);
    Store.addBook(book);
    UI.showAlert('Book added','success'); 
    document.querySelector('#title').value='';
    document.querySelector('#author').value='';
    document.querySelector('#isbn').value='';
    }
})
// event: to remove a book
document.querySelector('#book-list').addEventListener('click',function(e)
{
    UI.deleteBook(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
    UI.showAlert('Book Removed','success')
});


let res=3;
console.log(3>>1);