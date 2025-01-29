const myLibrary = [];

// Object related //

function Book(title, author, pages, read) {
	// object constructor for the book
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
	this.index = null;
}

Book.prototype.toggleRead = function () {
	// toggle read status on the book object
	this.read = !this.read;
};

// DOM Container Elements //

const booksContainer = document.querySelector('.books-container');
const booksDisplayBox = document.createElement('div');
booksDisplayBox.classList.add('book-list');
booksContainer.appendChild(booksDisplayBox);

// DOM Dialog Elements //

const addBook = document.querySelector('.addBook');
const dialog = document.querySelector('#dialog');
const buttonSubmit = document.querySelector('#submit');
const closeDialog = document.querySelector('#btn-close');

// DOM Dialog Buttons //

addBook.addEventListener('click', () => dialog.showModal()); // pops up modal form to add a book
buttonSubmit.addEventListener('click', (e) => submitBook(e));
closeDialog.addEventListener('click', (e) => {
	//close the modal
	e.preventDefault();
	dialog.close();
});

function submitBook(e) {
	// submit button from the form to add and display the book on the page
	e.preventDefault();
	const titleInput = document.querySelector('#title');
	const authorInput = document.querySelector('#author');
	const pagesInput = document.querySelector('#pages');
	const readInput = document.querySelector('#read');

	addBookToLibrary(
		titleInput.value,
		authorInput.value,
		pagesInput.value,
		readInput.checked
	);
	displayBooks(myLibrary);
	dialog.close();
}

// Functions //

function addBookToLibrary(title, author, pages, read) {
	//creates a book object and adds it to the array
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

function displayBooks(myLibrary) {
	// display each individual book stores inside the array
	booksDisplayBox.textContent = ''; // clear the display
	myLibrary.forEach((item, index) => {
		item.index = index; // assign an index to each book for keeping track of books in the DOM
		const bookDisplayed = document.createElement('div'); // container for all book data
		bookDisplayed.classList.add('book-style');
		displayBookContent(bookDisplayed, item); // displays all the information from the form in the modal dialog
		handleReadStatus(bookDisplayed, item); // handles the logic of the read checkbox for each book
		createRemoveButton(bookDisplayed, item); // adds a button to delete the book
		booksDisplayBox.appendChild(bookDisplayed);
	});
}

function capitalizeWord(string) {
	// get a string and return it capitalized
	const array = string.split('');
	array[0] = array[0].toUpperCase();
	return array.join('');
}

function removeBook(array, index) {
	// remove the book from the array considering the index
	array.splice(index, 1);
	displayBooks(myLibrary);
}

// Display Book Functions //

function displayBookContent(container, item) {
	['title', 'author', 'pages'].forEach((element) => {
		const p = document.createElement('p');
		p.textContent =
			capitalizeWord([element].toString()) + ` : ` + item[element];
		container.appendChild(p);
	});
}

function handleReadStatus(container, item) {
	const readStatus = document.createElement('input');
	readStatus.type = 'checkbox';
	readStatus.id = `${item.index}`;
	readStatus.addEventListener('click', () => item.toggleRead());
	readStatus.checked = item.read;
	container.appendChild(readStatus);
}

function createRemoveButton(container, item) {
	const removeBookButton = document.createElement('button');
	removeBookButton.textContent = 'Delete';
	removeBookButton.classList.add('remove-btn');
	removeBookButton.addEventListener('click', () =>
		removeBook(myLibrary, item.index)
	);

	container.appendChild(removeBookButton);
}
