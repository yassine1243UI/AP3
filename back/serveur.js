const bcrypt = require('bcrypt'); // ca va nous permettre de rendre notre base de donner plus sécuriser

const express = require('express')//la récupération d'express

const app = express() // création d'une instance d'express

require('dotenv').config() // configuration des variables d'environnement stockées dans un fichier .env

let cors = require('cors') // utilisation de la bibliothèque cors pour gérer les requêtes cross-origin (CORS)

const mariadb = require('mariadb'); // récupération du module mariadb pour se connecter à la base de données

app.use(express.json()) // utilisation du middleware express pour parser les données en JSON

app.use(cors()) // activation de la gestion CORS pour toutes les routes

const pool = mariadb.createPool ({
    host: process.env.DB_HOST, // récupération de l'adresse de l'hôte de la base de données depuis les variables d'environnement
    user: process.env.DB_USER, // récupération de l'utilisateur de la base de données depuis les variables d'environnement
    password: process.env.DB_PWD, // récupération du mot de passe de la base de données depuis les variables d'environnement
    database: process.env.DB_DTB // récupération du nom de la base de données depuis les variables d'environnement
});

app.get('/Bdd', async(req,res) => { // définition d'une route pour récupérer les données de la base de données
    let conn; 
    try{
        console.log("lancement de la connexion") // affichage d'un message dans la console pour indiquer le début de la connexion
        conn = await pool.getConnection(); // établissement de la connexion avec la base de données
        console.log("lancement de la requete") // affichage d'un message dans la console pour indiquer le début de la requête
        const rows = await conn.query('SELECT * FROM ap2'); // exécution d'une requête pour récupérer toutes les données de la table ap2
        console.log(rows); // affichage des données récupérées dans la console
        res.status(200).json(rows) // envoi des données récupérées au client sous forme de JSON
    }
    catch(err){
        console.log(err) // affichage d'un message d'erreur dans la console en cas de problème lors de l'exécution de la requête
    }
})

// Cette fonction écoute les requêtes GET sur l'URL '/produit'
app.get('/produit', async(req,res) => {
  let conn; 
  try{
      // On affiche un message de connexion
      console.log("lancement de la connexion")
      // On récupère une connexion à la base de données
      conn = await pool.getConnection();
      // On affiche un message de requête
      console.log("lancement de la requete")
      // On exécute une requête SELECT pour récupérer tous les produits de la table 'produit'
      const rows = await conn.query('SELECT * FROM produit');
      // On affiche le résultat de la requête
      console.log(rows);
      // On renvoie les résultats au format JSON
      res.status(200).json(rows)
  }
  catch(err){
      // On affiche les erreurs s'il y en a une
      console.log(err)
  }
})

// Cette fonction écoute les requêtes POST sur l'URL '/inscr'
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

// Endpoint pour vérifier l'authentification d'un utilisateur en utilisant un objet `pool` fourni.
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
    } else {
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
      console.log(rows);
      res.status(200).json(rows.affectedRows)
  }
  catch(err){
      console.log(err)
  }
})

// Endpoint pour supprimer un produit en fonction de son ID
app.delete('/Del/:id', async(req,res) => {  
const id = parseInt(req.params.id)     
let conn; 
try{
    console.log("lancement de la connexion")
    conn = await pool.getConnection();
    console.log("lancement de la requete")
    // Supprimer un produit de la base de données en fonction de son ID
    const rows = await conn.query ('DELETE FROM produit WHERE id = ?', [id]);
    console.log(rows);
    res.status(200).json(rows.affectedRows)
}
catch(err){
    console.log(err)
}
})

app.put('/Pannier/:id', async(req,res) => {       
  let conn; 
  const id = parseInt(req.params.id)   
  try{
      console.log("lancement de la connexion")
       
      conn = await pool.getConnection();
      console.log("lancement de la requete")
      // Insérer un nouveau produit dans la base de données
      const rows = await conn.query ('UPDATE produit set Quantite = Quantite - ? WHERE Id = ?', [req.body.index, id]);
      console.log(rows);
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
