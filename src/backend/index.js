import express from "express";
import mysql from 'mysql2';
import cors from 'cors';

const app = express();
app.use(cors());

app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Chu@nY11009",
  database: "test"
});

app.get("/", (req, res) => {
  res.json("hello this is backend");
})

app.get("/todotable", (req, res) => {
  const q = "SELECT * FROM todo";
  db.query(q, (err, data) => {
    if(err) return res.json(err);
    return res.json(data);
  })
})

app.post("/todotable", (req, res) => {
  const q = "INSERT INTO todo (`user_id`, `todo_task`, `todo_date`) VALUES (?, ?, ?)";
  const values = [req.body.user_id,
                  req.body.todo_task,
                  req.body.todo_date
                 ];
  db.query(q, values, (err, data) => {
    if (err) return res.json(err);
    return res.json("Insert successfully");
  });
});


app.listen(8800, () => {
  console.log("connected to port 8800");
})