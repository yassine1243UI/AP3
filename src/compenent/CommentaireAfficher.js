// Importez les dépendances nécessaires
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaTrash, FaPen } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import '../style/Produits.css';
import { FaUser, FaUserEdit, FaUserTimes, FaUserLock } from 'react-icons/fa';

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [affichage, setAffichage] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  let { id } = useParams();
  const ls = localStorage;  

  const recup = async () => {
    await axios
      .get(`http://localhost:8000/AffichCommentaire`)
      .then((res) => {
        console.log(res.data.length);
        setQuiz(res.data);
        setAffichage(true);       
      });
  };

  useEffect(() => {
    recup();
  }, []);

  return (
    <div className="body" style={{ marginTop: '100px' }}>
      <h2>Les Commentaires</h2>
      
    <Link to="/Commentaire">
        <button>
       Ajouter un commentaire
        </button>
    </Link>
      <div className="box">
        
        {affichage ? (
          quiz.map((comm) => (
            <div>
                <div className="cont" style={{ marginTop: '100px' }} key={comm.id}>
                
                <div className="box-title">
                    
                </div>
                <div className="box-body">
                    <p>identifiant user :<h5>{comm.Nom}</h5></p>
                    <p>Commentaire : <h5>{comm.Commentaire}</h5></p>

                </div>
                </div>
                
            </div>
          )
          )
          
        ) : (
          <p>Chargement...</p>
        )}
      </div>
    </div>
  );
}
