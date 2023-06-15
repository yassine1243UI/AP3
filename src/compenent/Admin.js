// Importer les bibliothèques nécessaires
import React from 'react'
import { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom";

export default function AjoutArticles() {
    // useForm validation de formulaire
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate();

    // stocker les données entrées dans les champs de saisie
    const [Articles, setArticles] = useState("")
    const [Image, setImage] = useState("")
    const [Prix, setPrix] = useState("")
    const [Quantite, setQuantite] = useState("")

    // Créer une fonction pour envoyer une requête de post au serveur et ajouter un nouvel article
    const AjoutArticles = async () => {

        await axios.post(`http://localhost:8000/Ajt`, {
            Articles: Articles,
            Image: Image,
            Prix: Prix,
            Quantite: Quantite
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) {
                    alert("Ajout réussi")
                    navigate("/AcceuilAdmin");
                }
                else {
                    alert("Erreur d'ajout")
                }
            })
    }


    return (
        <div className='container' style={{ marginTop: '200px' }}>
            <h2> Ajouter un article</h2>

            <form onSubmit={handleSubmit(AjoutArticles)}>
                <label>Articles </label>
                <input {...register("Articles", { required: true })} onChange={(e) => setArticles(e.target.value)} />

                <label>Lien de l'images </label>
                <input {...register("Image", { required: true })} onChange={(e) => setImage(e.target.value)} />

                <label>Prix </label>
                <input {...register("Prix", { required: true })} onChange={(e) => setPrix(e.target.value)} />

                <label>Quantité </label>
                <input {...register("Quantite", { required: true })} onChange={(e) => setQuantite(e.target.value)} />


                {(errors.Articles || errors.Image || errors.Prix || errors.Quantite) ? <span>Tous les champs doivent être remplis</span> : ""}

                <input type="submit" />

                <p><Link to="/Sup"><input type='button' value='Supprimer un article' /></Link>

                    <Link to="/Modifier"><input type='button' value='Modifier un article' /></Link>

                    <Link to="/AcceuilAdmin">
                        <input type='button' value="Acceuil Admin"/>
                    </Link>
                </p>
            </form>
        </div>
    )
}