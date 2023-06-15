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
  const [panier, setPanier] = useState([]);
  const [total, setTotal] = useState(0);
  const { register, handleSubmit, formState: { errors } } = useForm();

  let { id } = useParams();
  const ls = localStorage;  

  const recup = async () => {
    await axios
      .get(`http://localhost:8000/user`)
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
      <h2>Les users</h2>
      
    <Link to="/AcceuilAdmin">
        <button>
        Acceuil Admin
        </button>
    </Link>
      <div className="box">
        
        {affichage ? (
          quiz.map((user) => (
            <div>
                <div className="cont" style={{ marginTop: '100px' }} key={user.id}>
                
                <div className="box-title">
                    
                </div>
                <div className="box-body">
                    <p>identifiant user :<h5>{user.mail}</h5></p>
                    <p>Role du user: <h5>{user.role === 0 ? "Utilisateur" : "Admin"}</h5></p>
                    
                    <Link to={"/UserModif/" + user.id }>
                        <button>
                            <FaUserEdit /> 
                            Modifier
                        </button>
                    </Link>

                    <Link to={"/UserSup/" + user.id }>
                        <button>
                            <FaUserTimes /> 
                            Supprimer
                        </button>
                    </Link>

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
