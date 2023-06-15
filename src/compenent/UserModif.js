import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function ModifierArticles() {
  const { handleSubmit, formState: { errors } } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const [mail, setMail] = useState('');
  const [role, setRole] = useState('');

  const recupUser = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/Usermodification/${id}`);
      const { mail, role } = response.data[0];
      setMail(mail);
      setRole(role);
    } catch (error) {
      console.log(error);
    }
  };

  const editUser = async () => {
    try {
      await axios.put(`http://localhost:8000/Usermodification/${id}`, {
        mail: mail,
        role: role,
      });
      alert('Modification réussie');
      navigate('/produits');
    } catch (error) {
      console.log(error);
      alert('Erreur de modification');
    }
  };

  useEffect(() => {
    recupUser();
  }, []);

  return (
    <div className="container">
      <h2>Modifier votre article</h2>
      <form onSubmit={handleSubmit(editUser)}>
        <label>Identifiant</label>
        <input defaultValue={mail} onChange={(e) => setMail(e.target.value)} />
        <label>Role</label>
        <select value={role} onChange={(e) => setRole(e.target.value)}>
          <option value="0">Utilisateur</option>
          <option value="1">Admin</option>
        </select>
        {errors.Mail || errors.Role ? <span>Tous les champs doivent être remplis</span> : ''}
        <p>
        <input type="submit" />
        <Link to='/User'><input type='button' value="Annuler"/></Link>
        </p>
      </form>
    </div>
  );
}
