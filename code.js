const myLibrary = [];

function Book(title, author, pages, read) {
	this.title = title;
	this.author = author;
	this.pages = pages;
	this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
	const book = new Book(title, author, pages, read);
	myLibrary.push(book);
}

console.log(myLibrary);

const shelf = document.querySelector('.book-shelf');
const bookDisplayed = document.createElement('div');
const addBook = document.querySelector('.addBook');
const dialog = document.querySelector('#dialog');
const submitBook = document.querySelector('#submit');
const closeDialog = document.querySelector('#btn-close');

addBook.addEventListener('click', () => dialog.showModal());
submitBook.addEventListener('click', (e) => {
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
	e.preventDefault();
	dialog.close();
});
shelf.appendChild(bookDisplayed);

function displayBook(myLibrary) {
	bookDisplayed.textContent = '';
	myLibrary.forEach((item) => {
		const bookTitle = document.createElement('p');
		const bookAuthor = document.createElement('p');
		const bookPages = document.createElement('p');
		const bookRead = document.createElement('p');
		bookTitle.textContent = item.title;
		bookAuthor.textContent = item.author;
		bookPages.textContent = item.pages;
		bookRead.textContent = item.read;
		bookDisplayed.appendChild(bookTitle);
		bookDisplayed.appendChild(bookAuthor);
		bookDisplayed.appendChild(bookPages);
		bookDisplayed.appendChild(bookRead);
	});
}
