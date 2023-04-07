import React from 'react'
import { useForm } from "react-hook-form";
import { Link } from 'react-router-dom';
import { useParams, useNavigate } from "react-router-dom";
import axios from 'axios';

export default function SuppressionQuestion() {
    const { handleSubmit } = useForm();
    let { id } = useParams();
    let navigate = useNavigate();

    // Fonction pour supprimer la question en envoyant une requête DELETE au backend
    const suppressionQuestion = async () => {
        await axios.delete(`http://localhost:8000/Del/` + id)
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    alert("Suppression réussie");
                    navigate("/produits");
                }
                else {
                    alert("Erreur de suppression");
                }
            });
    }
    
    return (
        <div className='container' style={{ marginTop:'200px'}}>
            <form onSubmit={handleSubmit(suppressionQuestion)} >
                <h2> Êtes-vous sûr de vouloir supprimer l'article ?</h2>
                <input type="submit" value="Valider" />
                <Link to="/" className='bouton-annuler'> Annuler </Link>
            </form>
        </div>
    )
}
