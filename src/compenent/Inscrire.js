import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form"; // importation de useForm pour gérer les formulaires
import axios from 'axios'; // importation d'axios pour effectuer des appels HTTP
import { useNavigate } from "react-router-dom"; // importation de useNavigate pour la navigation

export default function AjoutQuestion() {
    const { register, handleSubmit, formState: { errors } } = useForm(); // Initialisation des hooks useForm pour le formulaire
    let navigate = useNavigate(); // Initialisation de useNavigate pour la navigation

    const [mail, setmail] = useState("") // Initialisation de l'état mail à une chaîne vide
    const [mdp, setMdp] = useState("") // Initialisation de l'état mdp à une chaîne vide

    const ajoutQuestion = async () => { // Fonction ajoutQuestion qui sera appelée lors de la soumission du formulaire
        await axios.post(`http://localhost:8000/inscr`, { // Appel HTTP POST pour l'inscription
            mail: mail, // Envoi de l'email
            mdp: mdp // Envoi du mot de passe
        })
            .then(res => { // Si la requête est réussie
                console.log(res)
                if (res.status === 200) { // Si le code de statut HTTP est 200 (OK)
                    alert("Ajout réussi") // Affichage d'une alerte avec le message "Ajout réussi"
                    navigate("/"); // Navigation vers la page d'accueil
                }
                else { // Sinon
                    alert("Erreur d'ajout") // Affichage d'une alerte avec le message "Erreur d'ajout"
                }
            })
    }

    return (
        <div className='container' style={{ marginTop:'200px'}}>
            <h2> Inscrivez-vous </h2>
            <form onSubmit={handleSubmit(ajoutQuestion)} > 
                <label>E_mail </label>
                <input {...register("mail", { required: true })} onChange={(e) => setmail(e.target.value)} /> 

                <label>Mdp </label>
                <input type='password' {...register("mdp", { required: true })} onChange={(e) => setMdp(e.target.value)} /> 

                {(errors.mail || errors.mdp ) ? <span>Tous les champs doivent être remplis</span> : ""} 

                <input type="Submit" /> 
            </form>
        </div>
    )
}
