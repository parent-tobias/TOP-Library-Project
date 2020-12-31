

export default class Book{
  constructor(bookObject, _isRead){
    /**
     * We want something that can take a user-created book, but
     *  that will also handle a (for example) Google Books API
     *  book.
     */
    const {_title, _authors, _pageCount} = bookObject;
    this._title = _title;
    this._authors = _authors;
    this._pageCount = _pageCount;
    this._isRead = _isRead;
    // and, for future use, let's save everything else.
    this._everythingElse = JSON.parse(JSON.stringify(bookObject))
  }

  findBy(prop, value){
    switch (typeof this[`_${prop}`]){
      case 'number':
        return this[`_${prop}`]===value;
      case 'string':
        return this[`_${prop}`].includes(value);
      case 'object':
        return Array.isArray(this[`_${prop}`] ) 
          ? this[`_${prop}`].includes(value)
          : typeof(value) ==='function'
            ? value(this[`_${prop}`]) 
      // in this case, we are looking for an object. If value is a
      //  function, return the result of that function with this param.
      // Not sure what the alternative would be, so just fail otherwise.
            : false
    }
  }

  toggleRead(){
    this._isRead = !this._isRead;
  }
  
  render(){
    return document.createRange().createContextualFragment(`<section class='card w-3/4 bg-indigo-100 rounded-md shadow-md p-4 m-auto my-2'data-title="${this._title}" class='card'>
  <header>
    <div class='flex justify-between'>
      <h3 class='text-2xl font-black '>${this._title}</h3><span class='remove-book cursor-pointer font-black bg-indigo-600 text-indigo-100 rounded-lg px-1'>x</span>
    </div>
    <span class='byline text-sm italic'>by <span class='author'>${this._authors}</span></span>
  </header>
  <div class='info'>
    <span class='pages'>${this._pageCount} page(s)</span>
    <span class='read'>${this._isRead ? 'Read' : 'Unread'}</span>
  </div>
</section>`);
  }

}
