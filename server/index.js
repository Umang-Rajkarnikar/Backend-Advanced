const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// middleware
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
    console.log("server has started on port 5000");
});

// ROUTES

// create a todo

app.post("/info", async(req, res) =>{
    try {
        
        const { uid, player1, player2, player3, player4, image } = req.body;
        const newTodo = await pool.query(
            "INSERT INTO info (user_id, player1, player2, player3, player4, image) VALUES($1, $2, $3, $4, $5, $6) RETURNING *", 
            [uid, player1, player2, player3, player4, image]
        );

        res.json(newTodo.rows)
    } catch (error) {
        console.log(error);
    }
})

// get all todos

app.get("/info", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM info");
        res.json(allTodos.rows);
    } catch (error) {
        console.log(error);       
    }
});

// get a todo
app.get("/info/:id", async(req, res) => {
    try {
        console.log("sd")
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM info WHERE user_id = $1", [id]);

        res.json(todo.rows[0]);
    } catch (error) {
        console.log(error);               
    }
});

// update a todo
app.put("/info/:id", async(req, res) => {
    try {
        const { id } = req.params;
        const { item, playerNum, isImage } = req.body;
        if(isImage){
            const updateTodo = await pool.query("UPDATE info SET image = $1 WHERE user_id=$2",
            [item, id])
        } else if(playerNum == '1'){
            const updateTodo = await pool.query("UPDATE info SET player1 = $1 WHERE user_id=$2",
            [item, id])
        } else if (playerNum == '2'){
            const updateTodo = await pool.query("UPDATE info SET player2 = $1 WHERE user_id=$2",
            [item, id])        
        } else if (playerNum == '3'){
            const updateTodo = await pool.query("UPDATE info SET player3 = $1 WHERE user_id=$2",
            [item, id])
        } else if (playerNum == '4'){
            const updateTodo = await pool.query("UPDATE info SET player4 = $1 WHERE user_id=$2",
            [item, id])
        }

    } catch (error) {
        console.log(error);                       
    }
});


// delete todo


