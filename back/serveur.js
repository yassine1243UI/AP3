const bcrypt = require('bcrypt'); 
const express = require('express')
const app = express()
require('dotenv').config()
let cors = require('cors')
const mariadb = require('mariadb');
app.use(express.json())
app.use(cors())
const pool = mariadb.createPool ({
    host: process.env.DB_HOST, 
    user: process.env.DB_USER,
    password: process.env.DB_PWD,
    database: process.env.DB_DTB,
    connectionLimit: 100,
});

app.get('/Bdd', async(req,res) => { 
    let conn; 
    try{
        console.log("lancement de la connexion") 
        conn = await pool.getConnection(); 
        console.log("lancement de la requete") 
        const rows = await conn.query('SELECT * FROM ap2'); 
        console.log(rows); // affichage des données récupérées dans la console
        res.status(200).json(rows) // envoi des données récupérées au client sous forme de JSON
    }
    catch(err){
        console.log(err)
    }
})

app.get('/produit', async(req,res) => {
  let conn; 
  try{
      console.log("lancement de la connexion")
      conn = await pool.getConnection();
      console.log("lancement de la requete")
      // On exécute une requête SELECT pour récupérer tous les produits de la table 'produit'
      const rows = await conn.query('SELECT * FROM produit');
      console.log(rows);
      res.status(200).json(rows)
  }
  catch(err){
      console.log(err)
  }
})


app.get('/produit/:id', async(req,res) => {
  let conn; 
  const id = parseInt(req.params.id);

  try{
      console.log("lancement de la connexion")
      conn = await pool.getConnection();
      console.log("lancement de la requete")
      const rows = await conn.query('SELECT * FROM produit WHERE id = ?', [id]);
      console.log(rows);
      res.status(200).json(rows)
  }
  catch(err){
      console.log(err)
  }
})

app.post('/inscr', async (req, res, hashedPassword) => {
  let conn;
  try {
      console.log("lancement de la connexion")
      conn = await pool.getConnection();
      console.log("lancement de la requete insert")
      console.log(req.body);
      const bcrypt = require('bcrypt');
      const saltRounds = 10;
      const plainPassword = req.body.mdp;
      hashedPassword = await bcrypt.hash(plainPassword, saltRounds);
      let requete = 'INSERT INTO ap2 (mail, mdp) VALUES (?, ?);'
      let rows = await conn.query(requete, [req.body.mail, hashedPassword]);
      console.log(rows);
      res.status(200).json(rows.affectedRows)
  }
  catch (err) {
      console.log(err);
  }
})


app.post('/connexion', async (req, res) => {  
  const id = parseInt(req.params.id);
  const { mail, mdp } = req.body;
  let conn;  
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    // Interroger la base de données pour récupérer l'utilisateur
    const rows = await conn.query('SELECT * FROM ap2 WHERE mail = ?', [mail]);
    console.log("connexion",rows[0].mdp);
    // Si un utilisateur est trouvé, le renvoyer, sinon renvoyer une erreur d'authentification
    const match = await bcrypt.compare(mdp, rows[0].mdp)
    console.log(match);

    if (rows.length === 1) {
      res.status(200).json({id:rows[0].id, mail:rows[0].mail, role:rows[0].role});
    }
    else {
      console.log("pas correct")
      res.status(401).json({ message: "Nom d'utilisateur ou mot de passe incorrect." });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Une erreur s'est produite lors de la connexion à la base de données." });
  } finally {
    if (conn) {
      conn.release(); // Libérer la connexion à la base de données
    }
  }
});

app.post('/Ajt', async(req,res) => {       
  let conn; 
  try{
      console.log("lancement de la connexion")
      conn = await pool.getConnection();
      console.log("lancement de la requete")
      // Insérer un nouveau produit dans la base de données
      const rows = await conn.query ('INSERT INTO produit (Articles, Image, Prix, Quantite) VALUES (?, ?, ?, ?)', 
      [req.body.Articles, req.body.Image, req.body.Prix, req.body.Quantite]);
      const rows2 = await conn.query ('INSERT INTO vendu (Prix, Articles) VALUES (?, ?)', 
      [req.body.Prix,req.body.Articles]);
      console.log(rows);
      res.status(200).json(rows.affectedRows)
      res.status(200).json(rows2.affectedRows)
  }
  catch(err){
      console.log(err)
  }
})

app.delete('/Del/:id', async(req,res) => {  
const id = parseInt(req.params.id)     
let conn; 
try{
    console.log("lancement de la connexion")
    conn = await pool.getConnection();
    console.log("lancement de la requete")
    const rows = await conn.query ('DELETE FROM produit WHERE id = ?', [id]);
    console.log(rows);
    res.status(200).json(rows.affectedRows)
}
catch(err){
    console.log(err)
}
})

app.delete('/Del/:id', async(req,res) => {  
  const id = parseInt(req.params.id)     
  let conn; 
  try{
      console.log("lancement de la connexion")
      conn = await pool.getConnection();
      console.log("lancement de la requete")
      const rows = await conn.query ('DELETE FROM produit WHERE id = ?', [id]);
      console.log(rows);
      res.status(200).json(rows.affectedRows)
  }
  catch(err){
      console.log(err)
  }
  }) 


app.put('/Pannier', async(req,res) => {       
  let conn; 
  const id = parseInt(req.params.id)   
  try{
      console.log("lancement de la connexion")
       
      conn = await pool.getConnection();
      console.log("lancement de la requete")
      const rows = await conn.query ('INSERT INTO vendu (Prix, Articles) VALUES (?, ?)', 
      [req.body.Prix,req.body.Articles]);
      res.status(200).json(rows.affectedRows)
  }
  catch(err){
      console.log(err)
  }
})

app.put('/modification/:id', async (req, res) => {

    const id = parseInt(req.params.id)  
    let conn;  
    try {
      console.log("lancement de la connexion")  
      conn = await pool.getConnection();  
      console.log("lancement de la requete update")  
      let requete = 'UPDATE produit SET Articles = ?, Image = ?, Prix = ?, Quantite = ? WHERE id = ?;'  
      let rows = await conn.query(requete, [req.body.Articles, req.body.Image, req.body.Prix, req.body.Quantite, id]);  
      console.log(rows);  
      res.status(200).json(rows.affectedRows)  
    }  
    catch (err) {  
      console.log(err);  
    }
  
  })

  


  

// Démarrer le serveur sur le port 8000
app.listen(8000, ()=>{ 
  console.log("Serveur à l'écoute");
})
