const { v4: uuid } = require("uuid");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

class Book {
    constructor(body) {
        this.id = uuid();
        this.title = body.title || "";
        this.description = body.description || "";
        this.authors = body.authors || "";
        this.favorite = body.favorite || "";
        this.fileCover = body.fileCover || "";
        this.fileName = body.fileName || "";
    }
}

const store = {
    books: [new Book({}), new Book({})],
};

app.use(express.json());

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Error: 500');
});

app.post("/api/user/login", (req, res) => {
    res.status(201).json({ id: 1, mail: "test@mail.ru" });
});


app.get("/api/books", (req, res) => {
    res.json(store.books);
});

app.get("/api/books/:id", (req, res) => {
    const id = req.params.id;
    const book = store.books.find((book) => book.id === id);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json("Error 404: страница не найдена");
    }
});

app.post("/api/books", (req, res) => {
    const book = new Book(req.body);
    store.books.push(book);

    res.status(201).json(book);
});

app.put("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const index = store.books.findIndex((book) => book.id === id);

    if (index !== -1) {
        store.books[index] = { ...store.books[index], ...req.body };
        res.json(store.books[index]);
    } else {
        res.status(404).json("Error 404: страница не найдена");
    }
});

app.delete("/api/books/:id", (req, res) => {
    const { id } = req.params;
    const index = store.books.findIndex((book) => book.id === id);

    if (index !== -1) {
        store.books.splice(index, 1);
        res.json("ok");
    } else {
        res.status(404).json("Error 404: страница не найдена");
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});