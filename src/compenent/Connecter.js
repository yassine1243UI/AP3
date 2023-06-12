import React from 'react'
import { useState } from 'react'; 
import { useForm } from "react-hook-form";
import axios from 'axios'; 
import '../style/Connecter.css';
import { Link } from 'react-router-dom';
import Logo from  '../asset/Logo.png'
import { useNavigate } from "react-router-dom"; 

export default function Connexion() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    let navigate = useNavigate(); 

    const [mail, setMail] = useState("") 
    const [mdp, setMdp] = useState("")
    const [role, setRole] = useState("")
    const ls = localStorage; 
    ls.clear();

    const handleConnexion = async (e) => {
        e.preventDefault()
        console.log(e)
        await axios.post(`http://localhost:8000/connexion`, { 
            mail: mail, 
            mdp: mdp, 
            role: role
        })
            .then(res => {
                console.log(res)
                if (res.status === 200) { 
                    alert("Connexion réussie") 
                    
                    ls.setItem ("mail", res.data.mail);
                    ls.setItem ("role", res.data.role);
                    console.log(res.data)

                    if (res.data.role === 1 ){
                        navigate("/Admin"); 
                    }

                    if (res.data.role === 0){
                        navigate("/produits"); 
                    }
                }
                else {
                    alert("Erreur de connexion") 
                }
            })


    }

    return (
        <div className='container' style={{ marginTop:'200px'}}>

        <nav className="navbar">    
                 <ul className="navbar-header-Logo">
                <Link to="/"> <img src={Logo} width="150px" height='100px'></img> </Link>
                </ul>
                <ul className="navbar-header3">
                    <Link to="/inscr"> Inscription </Link>
                </ul>
                <ul className="navbar-header4">
                    <Link to="/"> Se connecter </Link>
                </ul>

        </nav>
            <h2> Connexion </h2>

            <form className='form' onSubmit={handleConnexion}>
                <label>Adresse email </label>
                <input {...register("mail", { required: true })} onChange={(e) => setMail(e.target.value)} />

                <label>Mot de passe </label>
                <input type="password" {...register("mdp", { required: true })} onChange={(e) => setMdp(e.target.value)} />

                {(errors.mail || errors.mdp) ? <span>Tous les champs doivent être remplis</span> : ""}

                <input type="submit" />
            </form>

        </div>
    )
}
