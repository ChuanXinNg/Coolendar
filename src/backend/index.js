import express from "express";
import mysql from "mysql2";
import cors from "cors";

const app = express();

const db = mysql.createConnection({
  host:"localhost",
  user:"root",
  password:"Chu@nY11009",
  database:"test"
})

app.use(express.json());
app.use(cors());

app.get("/", (req,res)=>{
  res.json("hello, this is the backend");
})

app.get("/todo", (req,res)=>{
  const q = "SELECT * FROM todo"
  db.query(q, (err,data)=>{
    if(err) return res.json(err)
    return res.json(data)
  })
})

app.post("/todo", (req,res)=>{
  const q = "INSERT INTO todo (`todo_id`, `user_id`, `todo_task`, `todo_date`) VALUES (?)";
  const values = ["2", "user_id from backend", "todo_task from backend", "todo_date from backend"];

  db.query(q, [values], (err, data) => {
    if(err) return res.json(err)
    return res.json(data)
  })

})

app.listen(8800, () => {
  console.log("Connected to backend!");
});
