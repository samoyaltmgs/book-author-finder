document.addEventListener('DOMContentLoaded', () => {
    loadBooks();
});

function loadBooks() {
    fetch('/books')
        .then(response => response.json())
        .then(data => {
            const bookList = document.getElementById('book-list');
            bookList.innerHTML = '';
            data.forEach(book => {
                const li = document.createElement('li');
                li.textContent = `${book.bookName} - ${book.author}`;
                bookList.appendChild(li);
            });
        })
        .catch(error => {
            console.error('Error loading books:', error);
        });
}

function findAuthor() {
    const bookName = document.getElementById('book-name').value;
    fetch(`/get-author?bookName=${bookName}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('result').textContent = `Author: ${data.author}`;
        })
        .catch(error => {
            document.getElementById('result').textContent = 'Error fetching author';
            console.error('Error:', error);
        });
}

function addBook() {
    const bookName = document.getElementById('new-book-name').value;
    const author = document.getElementById('new-author').value;

    fetch('/add-book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookName, author })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('add-result').textContent = data.message;
        document.getElementById('new-book-name').value = '';
        document.getElementById('new-author').value = '';
        loadBooks();  // Refresh the book list
    })
    .catch(error => {
        document.getElementById('add-result').textContent = 'Error adding book';
        console.error('Error:', error);
    });
}
