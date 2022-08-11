const express = require('express');
const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'test',
  password: '99201012',
  port: 5432,
})

const app = express();

// parse json request body
app.use(express.json());

// parse urlencoded request body
app.use(express.urlencoded({ extended: true }));

app.get('/test/give',(req,res)=>{
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
})

app.get('/test/save',(req,res)=>{
    pool.query('INSERT INTO users (email) VALUES ($1)', [req.body.email],(error, results) => {
        if (error) {
            return res.send({error: error})
        }
        res.send(results.rows)
    })
})





app.listen(3000, () => {
    console.log(`Example app listening on port ${3000}`);
  });