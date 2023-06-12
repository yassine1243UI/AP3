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

    const [mail, setmail] = useState("") 
    const [mdp, setMdp] = useState("")

    const ajoutUser = async () => { 
        await axios.post(`http://localhost:8000/inscr`, { 
            mail: mail, 
            mdp: mdp 
        })
        .then(res => { 
            console.log(res);
            if (res.status === 200) {
                navigate("/produits");
            } else {
              alert("Erreur d'ajout");
            }
          })
          
    }

    const App = () => {
        const [showBanner, setShowBanner] = useState(true);
      
        useEffect(() => {
          const timer = setTimeout(() => {
            setShowBanner(false);
          }, 5000); // 5000 millisecondes (5 secondes)
          return () => clearTimeout(timer);
        }, []);
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
        
            <h2> Inscrivez-vous </h2>
            <form onSubmit={handleSubmit(ajoutUser)} > 
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
