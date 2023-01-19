import express from "express";
import mysql from "mysql";

const port = 3000;
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "todo",
});
connection.connect();

const app = express();
app.use(express.text());
app.use(express.json());


app.get("/", (req, res) => {
  connection.query(`Select * from task`, (err, rows, fields) => {
    if (err) {
      console.log(err);
    }
    res.send(rows);
  });
  console.log(req.body);
});

app.post("/", (req, res) => {
  connection.query(
    `insert into task values(?,?,?)`,
    [req.body.id,req.body.taskname,req.body.isDone],
    (err, rows, fields) => {
      if (err) {
        console.log(err);
      }
      res.send(rows);
    }
  );
});

app.delete("/",(req,res)=>{
    connection.query(
        `delete from task where taskname is null`,
        (err,rows,fields)=>{
            if(err){
                console.log(err);
            }
            res.send(rows);
        }
    );
});

app.put("/",(req,res)=>{
    connection.query(
        `Update task
        Set taskname="Go to Nursey", isDone=false
        where id=3`,
        (err,rows,fields)=>{
            if(err){
                console.log(err);
            }
            res.send(rows);
        }
    );
});
app.listen(port, () => {
  console.log(`Server working at ${port}`);
});



