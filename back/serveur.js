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

app.get('/real1', async (req, res) => {
  let conn; 
  try {
    console.log("Lancement de la connexion");
    conn = await pool.getConnection();
    console.log("Lancement de la requête");
    const result = await conn.query('SELECT COUNT(Articles) AS articleCount FROM produit');
    const articleCount = result[0].articleCount.toString(); // Convertir BigInt en chaîne de caractères
    console.log(articleCount);
    res.status(200).json({ articleCount });
  } catch (err) {
    console.log(err);
  } finally {
    if (conn) {
      conn.release(); // Libérer la connexion après usage
    }
  }
});


app.get('/real2', async(req,res) => {
  let conn; 
  try{
      console.log("lancement de la connexion")
      conn = await pool.getConnection();
      console.log("lancement de la requete")
      console.log("recherche",req.body)
      // On exécute une requête SELECT pour récupérer tous les produits de la table 'produit'
      const rows = await conn.query('SELECT * FROM produit WHERE Articles LIKE ?', [req.body.recherche + '%']);

      console.log(rows);
      res.status(200).json(rows)
  }
  catch(err){
      console.log(err)
  }
})

app.get('/real2bis', async(req,res) => {
  let conn; 
  try{
      console.log("lancement de la connexion")
      conn = await pool.getConnection();
      console.log("lancement de la requete")
      // On exécute une requête SELECT pour récupérer tous les produits de la table 'produit'
      const rows = await conn.query('SELECT * FROM produit WHERE Articles LIKE ?', ['%' + req.body.recherche]);

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

  app.get('/user', async(req,res) => {
    let conn; 
    try{
        // On affiche un message de connexion
        console.log("lancement de la connexion")
        // On récupère une connexion à la base de données
        conn = await pool.getConnection();
        // On affiche un message de requête
        console.log("lancement de la requete")
        // On exécute une requête SELECT pour récupérer tous les produits de la table 'ap2'
        const rows = await conn.query('SELECT * FROM ap2');
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
  
  
  app.get('/user/:id', async(req,res) => {
    let conn; 
    const id = parseInt(req.params.id);
    try{
        // On affiche un message de connexion
        console.log("lancement de la connexion")
        // On récupère une connexion à la base de données
        conn = await pool.getConnection();
        // On affiche un message de requête
        console.log("lancement de la requete")
        const rows = await conn.query('SELECT * FROM ap2 WHERE id = ?', [id]);
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
  
  
    app.delete('/UserDel/:id', async(req,res) => {  
      const id = parseInt(req.params.id)     
      let conn; 
      try{
          console.log("lancement de la connexion")
          conn = await pool.getConnection();
          console.log("lancement de la requete")
          // Supprimer un produit de la base de données en fonction de son ID
          const rows = await conn.query ('DELETE FROM ap2 WHERE id = ?', [id]);
          console.log(rows);
          res.status(200).json(rows.affectedRows)
      }
      catch(err){
          console.log(err)
      }
      }) 
  
  
    app.put('/Usermodification/:id', async (req, res) => {
      const id = parseInt(req.params.id)  
      let conn;  
      try {
        console.log("lancement de la connexion")  
        conn = await pool.getConnection();  
        console.log("lancement de la requete update")  
        let requete = 'UPDATE ap2 SET mail = ?, role = ? WHERE id = ?;'  
        let rows = await conn.query(requete, [req.body.mail, req.body.role, id]);  
        console.log(rows);  
        res.status(200).json(rows.affectedRows)  
      }  
      catch (err) {  
        console.log(err);  
      }
    
    })
  
    app.get('/OCPP', async(req,res) => { 
      let conn; 
      try{
          console.log("lancement de la connexion") 
          conn = await pool.getConnection(); 
          console.log("lancement de la requete") 
          const rows = await conn.query('SELECT * FROM produit ORDER BY Articles ASC;'); 
          console.log(rows);
          res.status(200).json(rows) 
      }
      catch(err){
          console.log(err) // affichage d'un message d'erreur dans la console en cas de problème lors de l'exécution de la requête
      }
    })
    app.get('/ODPP', async(req,res) => { 
      let conn; 
      try{
          console.log("lancement de la connexion") 
          conn = await pool.getConnection(); 
          console.log("lancement de la requete") 
          const rows = await conn.query('SELECT * FROM produit ORDER BY Articles DESC;'); 
          console.log(rows); // affichage des données récupérées dans la console
          res.status(200).json(rows) // envoi des données récupérées au client sous forme de JSON
      }
      catch(err){
          console.log(err) // affichage d'un message d'erreur dans la console en cas de problème lors de l'exécution de la requête
      }
    })
    app.get('/OD', async(req,res) => { 
      let conn; 
      try{
          console.log("lancement de la connexion") 
          conn = await pool.getConnection(); 
          console.log("lancement de la requete") 
          const rows = await conn.query('SELECT * FROM produit ORDER BY Prix DESC;'); 
          console.log(rows); // affichage des données récupérées dans la console
          res.status(200).json(rows) // envoi des données récupérées au client sous forme de JSON
      }
      catch(err){
          console.log(err) // affichage d'un message d'erreur dans la console en cas de problème lors de l'exécution de la requête
      }
    })
    app.get('/OC', async(req,res) => { 
      let conn; 
      try{
          console.log("lancement de la connexion") 
          conn = await pool.getConnection(); 
          console.log("lancement de la requete") 
          const rows = await conn.query('SELECT * FROM produit ORDER BY Prix ASC;'); 
          console.log(rows); // affichage des données récupérées dans la console
          res.status(200).json(rows) // envoi des données récupérées au client sous forme de JSON
      }
      catch(err){
          console.log(err) // affichage d'un message d'erreur dans la console en cas de problème lors de l'exécution de la requête
      }
    })
    
  
    app.post('/Commentaire', async(req,res) => {       
      let conn; 
      try{
          console.log("lancement de la connexion")
          conn = await pool.getConnection();
          console.log("lancement de la requete")
          // Insérer un nouveau produit dans la base de données
          const rows = await conn.query ('INSERT INTO commentaire (Nom, Commentaire) VALUES (?, ?)', 
          [req.body.Nom, req.body.Commentaire]);
          console.log(rows);
          res.status(200).json(rows.affectedRows)
      }
      catch(err){
          console.log(err)
      }
    })

    app.get('/AffichCommentaire', async(req,res) => { 
      let conn; 
      try{
          console.log("lancement de la connexion") 
          conn = await pool.getConnection(); 
          console.log("lancement de la requete") 
          const rows = await conn.query('SELECT * FROM commentaire'); 
          console.log(rows); // affichage des données récupérées dans la console
          res.status(200).json(rows) // envoi des données récupérées au client sous forme de JSON
      }
      catch(err){
          console.log(err)
      }
  })

  

// Démarrer le serveur sur le port 8000
app.listen(8000, ()=>{ 
  console.log("Serveur à l'écoute");
})
