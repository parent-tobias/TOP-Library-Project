import Book from './book.js';

export default class Library{
  constructor(key='books'){
    const initialArray = JSON.parse(localStorage.getItem(key)) || [];

    this._key = key;  
    this._library = initialArray.map( ({
      _title,
      _authors, 
      _pageCount, 
      _isRead
    }) => new Book({_title, _authors, _pageCount}, _isRead) );
  }

  addBook(authors, title, pageCount, read){
    const newBook = new Book({
      _authors: authors,
      _title: title,
      _pageCount: pageCount
    }, read);
    
    this._library.push(newBook);
    localStorage.setItem(this._key, JSON.stringify(this._library));
  }

  removeBook(title){
    this._library = this._library.filter(book=>book._title!==title);
    localStorage.setItem(this._key, JSON.stringify(this._library));
  }
  
  toggleRead(title) {
    this._library = this._library.map((book)=>{
      if(book._title===title) {
        book.toggleRead();
      }

      return book;
    })
    localStorage.setItem(this._key, JSON.stringify(this._library));
  }
  
  search(prop, value){
    return this._library.filter((book)=>book.findBy(prop, value) )
  }

  getAll(){
    return this._library;
  }

  render(){
    /***
     * So all we want this to do is to ask each book 
     *   for its own DOM tree, and insert it within
     *   a DOM tree of our own.
     */
    const libraryEl = document.createElement("article");
    libraryEl.classList.add("cards","grid","grid-cols-3","p-4","w-full","h-3/4","overflow-y-auto");
    this._library.forEach(book => libraryEl.appendChild(book.render() ));
    return libraryEl;
  }
}
