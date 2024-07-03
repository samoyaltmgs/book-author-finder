const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());

let books = [
    { bookName: 'To Kill a Mockingbird', author: 'Harper Lee' },
    { bookName: '1984', author: 'George Orwell' },
    { bookName: 'The Great Gatsby', author: 'F. Scott Fitzgerald' },
    { bookName: 'The Catcher in the Rye', author: 'J.D. Salinger' }
];

// Endpoint to add a new book
app.post('/add-book', (req, res) => {
    const { bookName, author } = req.body;
    books.push({ bookName, author });
    res.json({ message: 'Book added successfully' });
});

// Endpoint to get the author of a book
app.get('/get-author', (req, res) => {
    const bookName = req.query.bookName;
    const book = books.find(b => b.bookName.toLowerCase() === bookName.toLowerCase());
    if (book) {
        res.json({ author: book.author });
    } else {
        res.json({ author: 'Not found' });
    }
});

// Endpoint to get the list of books
app.get('/books', (req, res) => {
    res.json(books);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
