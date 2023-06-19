import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form"; 
import axios from 'axios'; 
import { useNavigate } from "react-router-dom"; 
import '../style/inscrire.css'
import { Link } from 'react-router-dom';
import useEffect  from 'react';
import Logo from  '../asset/Logo.png'
export default function AjoutQuestion() {
    const { register, handleSubmit, formState: { errors } } = useForm(); 
    let navigate = useNavigate(); 
    const [quiz, setQuiz] = useState([]);
    const [affichage, setAffichage] = useState(false);
    const [Commentaire, setCommentaire] = useState("");
    const [Id, setId] = useState("");

    const [Nom, setNom] = useState("") 
   
    const recup = async () => {
        await axios
          .get(`http://localhost:8000/user`)
          .then((res) => {
            console.log(res.data.length);
            setQuiz(res.data);
            setAffichage(true);       
          });
      };

      const Comm = async () => {
        await axios.post(`http://localhost:8000/Commentaire`, {
          Id: Id,
          Nom: Nom,
          Commentaire: Commentaire
        })
        .then(res => {
          console.log(res);
          if (res.status === 200) {
            navigate("/AfficherCommentaire");
          } else {
            alert("Erreur d'ajout");
          }
        })
      }
      


    
    return (
        <div className='container' style={{ marginTop:'200px'}}>
       
            <h2> Envoyer votre commentaire </h2>
            <form onSubmit={handleSubmit(Comm)} > 

                <label>Pseudo </label>
                <input {...register("Nom", { required: true })} onChange={(e) => setNom(e.target.value)} />

                <label>Commentaire </label>
                <textarea {...register("Commentaire", { required: true })} onChange={(e) => setCommentaire(e.target.value)}>
                </textarea>
                {(errors.Nom ) ? <span>Vous devez rentrer un commemntaire avant de valider</span> : ""} 

                <input type="Submit" /> 
            </form>
        </div>
    )
}
