const express = require('express')//la récupération d'express
const app = express() // variable utilisant la librairie express
require('dotenv').config()
let cors = require('cors')
const mariadb = require('mariadb');
app.use(express.json())
app.use(cors())


const pool = mariadb.createPool ({

    host: process.env.DB_HOST,

    user: process.env.DB_USER,
    
    password: process.env.DB_PWD,
    
    database: process.env.DB_DTB

});


app.get('/question', async(req,res) => {
    let conn; 
    try{
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requete")
        const rows = await conn.query('SELECT * FROM question');
        console.log(rows);
        res.status(200).json(rows)
    }
    catch(err){
        console.log(err)
    }
})

app.post('/question', async(req,res) => {       
    let conn; 
    try{
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requete")
        const rows = await conn.query ('INSERT INTO question (theme, question, reponse) VALUES (?, ?, ?)', [req.body.theme, req.body.question, req.body.reponse]);
        console.log(rows);
        res.status(200).json(rows.affectedRows)
    }
    catch(err){
        console.log(err)
    }
})


// app.put('/question/:id', (req,res)=> {
//     const id = parseInt(req.params.id)
//     let laQuestion =question.find(question => question.id === id)
//     question.splice(question.indexOf(laQuestion),1)
//     res.status(200).json(question)
// })

app.put('/question/:id', async(req,res) => {  
    const id = parseInt(req.params.id)     
    let conn; 
    try{
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requete")
        const rows = await conn.query ('UPDATE question SET theme = ?, question=?, reponse=?  WHERE id = ?', [req.body.theme, req.body.question, req.body.reponse, id]);
        console.log(rows);
        res.status(200).json(rows.affectedRows)
    }
    catch(err){
        console.log(err)
    }
})

app.delete('/question/:id', async(req,res) => {  
    const id = parseInt(req.params.id)     
    let conn; 
    try{
        console.log("lancement de la connexion")
        conn = await pool.getConnection();
        console.log("lancement de la requete")
        const rows = await conn.query ('DELETE FROM question WHERE id = ?', [id]);
        console.log(rows);
        res.status(200).json(rows.affectedRows)
    }
    catch(err){
        console.log(err)
    }
})

app.listen(8000, ()=>{ // ouverture du serveur sur le port 8000
    console.log("Serveur à l'écoute"); // afficher le message dans la console
})

