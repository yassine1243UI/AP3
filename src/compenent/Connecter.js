import {React, useState} from 'react'
import '../style/Connecter.css'


function valider(e){
  e.preventDefault()
  /* en js la fonction preventDefault permet d'indiquer à l'utilisateur
  que si l'événement n'est pas géré explicitement,
  l'action par défaut ne devrait pas être executé comme elle l'est normalement */
}

function FormBlog()
{ 
  const [Input_Mail, setInputMdp] = useState('')
  let inputErrorMail = Input_Mail.includes("")

    return (
      <div className="Contenue">
          <div className="Connexion">
              <form name="Connexion" onsubmit="vérif()">
                  <p><h3>Connectez-vous</h3></p>
                  <hr/>
                  <p>E-mail: <input name="mail" type="texte" onChange={(e) => setInputMdp(e.target.value)} placeholder="Mail"/> </p>
                  <p>Mot de passe: <input name="Mdp" type="passworld" onChange={(e) => setInputMdp(e.target.value)} placeholder="Mdp"/></p> 
                  

                  {
                  Input_Mail != "fofanayassine@gmail.com" ?
                  <div>
                    Votre mail n'est pas enregistre
                  </div> : 
                   <p2><input name="ConexionBtn" type="submit" value="Connexion" onsubmit={valider}/></p2> 
                  }
              </form>
          </div>

      </div>
    )
  }
export default FormBlog
