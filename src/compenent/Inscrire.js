import {React, useState} from 'react'
import '../style/inscrire.css'

 
function valider(e){
  e.preventDefault()
  /* en js la fonction preventDefault permet d'indiquer à l'utilisateur
  que si l'événement n'est pas géré explicitement,
  l'action par défaut ne devrait pas être executé comme elle l'est normalement */
}

function FormBlog()
{ 
  const [Input_Mail, setInputMail] = useState('')
  const [Input_Mdp, setInputMdp] = useState('')
  const [Input_Mdp2, setInputMdp2] = useState('')
  let inputErrorMail = Input_Mail.includes("")

    return (
      <div className="Contenue">
          <div className="Inscription">
              <form name="Inscription" onsubmit="vérif()">
                  <p><h3>Inscrivez-vous</h3></p>
                  <hr/>
                  <p>E-mail: <input name="mail" type="texte" onChange={(e) => setInputMail(e.target.value)} placeholder="Mail"/> </p>
                  <p>Mot de passe: <input name="Mdp" type="password" onChange={(e) => setInputMdp(e.target.value)} placeholder="Mdp"/></p> 
                  <p>Vérification de mon Mot de passe: <input name="Mdp" type="password" onChange={(e) => setInputMdp2(e.target.value)} placeholder="Vérification Mot de passe"/></p>                  
                  

                  {
                  Input_Mail == "fofanayassine@gmail.com" ?
                  <div>
                    Votre e-mail existe déja !
                  </div> 
                  : 
                    Input_Mdp !== Input_Mdp2 || Input_Mdp === "" ?
                    <div>
                    Vos mot de passe ne corresponde pas.
                    </div> :
                    <p2><input name="ConexionBtn" type="submit" value="Connexion" onsubmit={valider}/></p2>                  
                    
                    
                  }
              </form>
          </div>

      </div>
    )
  }
export default FormBlog

