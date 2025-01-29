const myLibrary = [];

function Book(title, author, pages, read) {
	// object constructor for the book
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
	//creates a book object and adds it to the array
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

console.log(myLibrary);

// handle selectors from html
const shelf = document.querySelector('.book-shelf');
const bookDisplayed = document.createElement('div');
bookDisplayed.classList.add('book-list');
shelf.appendChild(bookDisplayed);
const addBook = document.querySelector('.addBook');
const dialog = document.querySelector('#dialog');
const submitBook = document.querySelector('#submit');
const closeDialog = document.querySelector('#btn-close');

addBook.addEventListener('click', () => dialog.showModal()); // pops up modal form to add a book
submitBook.addEventListener('click', (e) => {
	// submit button from the form to add and display the book on the page
	e.preventDefault();
	const titleInput = document.querySelector('#title');
	const authorInput = document.querySelector('#author');
	const pagesInput = document.querySelector('#pages');
	addBookToLibrary(
		titleInput.value,
		authorInput.value,
		pagesInput.value,
		'yes'
	);
	displayBook(myLibrary);
	dialog.close();
});
closeDialog.addEventListener('click', (e) => {
	//close the modal
	e.preventDefault();
	dialog.close();
});

function displayBook(myLibrary) {
	// create a div with each book in the array
	bookDisplayed.textContent = '';
	myLibrary.forEach((item) => {
		const bookInfoDisplay = document.createElement('div');
		bookInfoDisplay.classList.add('book-style');
		['title', 'author', 'pages', 'read'].forEach((element) => {
			const p = document.createElement('p');
			p.textContent =capitalizeWord([element].toString()) + ` : `+ item[element];
			bookInfoDisplay.appendChild(p);
		});
		bookDisplayed.appendChild(bookInfoDisplay);
	});

}

function capitalizeWord(string){
	const array = string.split('');
	array[0]=array[0].toUpperCase();
	return array.join('');
}