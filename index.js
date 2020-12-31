import Library from './classes/library.js';



/***
 * the functions for handling events. The events for which I'm listening at this point:
 * - add a book
 * - display an add-book form
 * 
 * We will need to add functionality for removing a book, and updating a books read status.
 */
const addBookHandler = (event)=>{
  event.preventDefault();
  addNewBookBtn.click();

  const authorEl = addBookForm.querySelector(".author"),
        titleEl = addBookForm.querySelector(".title"),
        pagesEl = addBookForm.querySelector(".pages"),
        readEl = addBookForm.querySelector(".read");

  myLibrary.addBook(authorEl.value, titleEl.value, pagesEl.value, readEl.checked)

  /*Now, we do the DOM! */
  authorEl.value='';
  titleEl.value='';
  pagesEl.value='';
  readEl.checked=false; // remember, this is a checkbox

  booksContainer.innerHTML = '';
  booksContainer.appendChild(myLibrary.render() );
}

const showAddHandler = (event)=>{
  event.preventDefault();
  addBookForm.classList.toggle("hidden");
  if(addBookForm.classList.contains("hidden" ) ){
    event.target.textContent='Add a new book'
  } else {
    event.target.textContent='Cancel';
  }
}



const addBookForm = document.querySelector("#add-book-form");
const booksContainer = document.querySelector(".books-pane");
const addNewBookBtn= document.querySelector(".add-new-book");


addBookForm.addEventListener("submit", addBookHandler);
addNewBookBtn.addEventListener("click", showAddHandler);

booksContainer.addEventListener("click", (event)=>{
  /***
   * Now this gets funky. We're going to write a few different listeners
   *   here - one for remove a book, and one for toggle a book's read status.
   *
   * I *think* that'll work. :D
   ***/

   console.log(event.target);
  const clickedEl = event.target,
        cardEl = clickedEl.closest('.card'),
        title = cardEl.dataset.title;
  if(clickedEl.classList.contains('read') ){
    myLibrary.toggleRead(title);
    refreshLibrary();

  } else if(clickedEl.classList.contains('remove-book')){
    myLibrary.removeBook(title);
    refreshLibrary();
  }
})

const myLibrary = new Library();

const refreshLibrary = ()=>{
  booksContainer.innerHTML='';
  booksContainer.appendChild(myLibrary.render() );
}


refreshLibrary()
