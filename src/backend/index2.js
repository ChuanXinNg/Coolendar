// cd to the correcct directory
// npm i express mysql nodeman
// node index.js --> to start our app
// go to package.json, under "script" add "start": "nodemon index.js"
// npm start
// starts again everytime you save

import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "3m4n9s3m",
    database: "test"
})


db.connect((err) => {
    if (err) {
        console.error("Error connecting to database:", err);
        return;
    }
    console.log("Connected to the database!");
});

// If there is a authetication problem
// ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'your_current_password';

app.use(express.json())
app.use(cors())

// whenever we visit our homepage of this backend server,
// we are gonna get a request from the user and
// we are gonna send a response after that
app.get("/", (req, res) => {
    res.json("This is the backend.")
})

// whenever we visit /todotable,
// a request is sent and the response is returned 
// go to certain localhostXXXX/XXX to test this
app.get("/todotable", (req, res) => {
    const token = req.headers.authorization;
    const userId = token.user.id;
    const q = `SELECT deadline, todo_task FROM todotable WHERE user_id = ${userId} ORDER BY deadline ASC, idtodo ASC;`
    db.query(q, (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})


// post
// users sending details and stores information into the database
// use backtick `
// go to postman to test this

// for const values
// by default, we cannot send any data to our express server
// to prevent this problem 
// write below 
// app.use(express.json())
// go to postman, change to post: localhost:XXXX/XXX
// go to body, change to raw, change to JSON from text
app.post("/todotable", (req, res) => {
    // Extract the token from the request headers or wherever it's stored
    const token = req.headers.authorization;
    const userId = token.user.id;

    const q = "INSERT INTO todotable (`deadline`, `todo_task`, `user_id`) VALUES (?, ?, ?)";
    const values = [
        req.body.deadline,
        req.body.todo_task,
        userId, // Use the extracted user ID from the token
    ];

    db.query(q, values, (err, data) => {
        if (err) return res.json(err);
        return res.json(data);
    });
});


app.listen(8800, () => {
    console.log("Connected to backend!!")
})
