import React, { useState, useEffect } from "react";
import balle from '../asset/balle.png'
import '../style/Produits.css'
import Chaussure from '../asset/Chaussure.png'
import Kadi from '../asset/pannier.webp'
import Maillot from '../asset/Maillot.png'
import pannier from '../asset/Pannier.png'
import ReactDOM from "react-dom/client";
import UserInfo from './UserInfo'
import Pannier from "../compenent/Panier";

function valider(e){
    e.preventDefault()
    /* en js la fonction preventDefault permet d'indiquer à l'utilisateur
    que si l'événement n'est pas géré explicitement,
    l'action par défaut ne devrait pas être executé comme elle l'est normalement */
}

export default function FavoriteColor() {
  const [input_kingdom, setInputKingdom]= useState(0)
  const [input_op, setInputOp]= useState(0)
  const [input_cm, setInputCm]= useState(0)
  const [input_choujin, setInputChoujin]= useState(0)
  const [input_danda, setInputDanda]= useState(0)
  
  let Articles = [
    {id: 0, name:'Balle', prix: '10$', img: balle,},
    {id:1, name:'Basket', prix:'75$', img:Chaussure},
    {id:2, name:'Maillot', prix:'20$', img:Maillot},
    {id: 3, name:'Pannier', prix:'100$', img:pannier},
  ]
  
  const User = [
    {name:"Kingdom",Star:5}
  ]
  
  const User1 = [
    {name:"OnePiece",Star:5}
  ]

  const User2 = [
    {name:"Chainsaw Man",Star:4}
  ]

  const User3 = [
    {name:"Choujin X",Star:3}
  ]

  const User4 = [
    {name:"Dandadan",Star:3}
  ]
    const [count, setCount] = useState(0)
    

    useEffect(()=>{
      User.push(
        {id:count,
        star:0,})

        console.log(User)
        console.log(count)
    },[count])
    console.log(typeof input_kingdom)
  return (
    <>
    <Pannier input_kingdom={input_kingdom} input_op={input_op} input_cm={input_cm}
    input_choujin={input_choujin} input_danda={input_danda}/>
    
    <div className="Contenu">
      
      {Articles.map((article,index) => (
        <div className='Kingdom'>
        {/* <img src={balle} height="250px" width="200px"></img> */}
        <img src={article.img} height="250px" width="200px"></img>
        <p>{article.name} {article.prix}</p>
        </div>
      ))}

        
             {/* {User.map((user, Articles) => (

              <UserInfo Produit={Articles.name} {Articles.Prix } />
              ))}
             <button
        type="button"
        onClick={() => setInputKingdom(input_kingdom - 1)}
      >
        <p> __</p> 
      </button>

             <button
        type="button"
        onClick={() => setInputKingdom(input_kingdom + 1)}
      >
             <img src={Kadi} height="20px" width="20px"></img>
      </button> */}
         </div>
      
      
        {/* <div className='OnePiece'>
            <img src={Chaussure} height="250px" width="200px"></img>
            <p>Chaussure de basket: 10$</p>
            {User1.map((user, index) => (

            <UserInfo star={user.Star} />
))}
            <button
        type="button"
        onClick={() => setInputOp(input_op - 1)}
      >
        <p> __ </p> 
      </button>

            <button
        type="button"
        onClick={() => setInputOp(input_op + 1)}
      >
            <img src={Kadi} height="20px" width="20px"></img>
            </button>
        </div>

      
      
        <div className='Chainsaw'>
            <img src={Maillot} height="250px" width="200px"></img>
            <p>Maillot de basket: 10$</p>
            {User2.map((user, index) => (

            <UserInfo star={user.Star} />))}
            <button
              type="button"
              onClick={() => setInputCm(input_cm - 1)}
            >
            <p> __ </p> 
            </button>

            <button
        type="button"
        onClick={() => setInputCm(input_cm + 1)}
      >
            <img src={Kadi} height="20px" width="20px"></img>
            </button>
        </div>

        <div className='Choujin'>
            <img src={pannier} height="250px" width="200px"></img>
            <p>Pannier de basket : 100$</p>
            {User3.map((user, index) => (

            <UserInfo star={user.Star} />))}
            <button
        type="button"
        onClick={() => setInputChoujin(input_choujin - 1)}
      >
        <p> __ </p> 
      </button>

            <button
        type="button"
        onClick={() => setInputChoujin(input_choujin + 1)}
      >
           <img src={Kadi} height="20px" width="20px"></img>
            </button>
        </div> */}
      
      
      

    </>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<FavoriteColor />);

// export default function Produits() {
//   const User = [
//     {id: 0, name:'Kingdom', prix:10},
//     {id:1, name:'OnePiece', prix:12},
//   ]
//   const [count, setCount] = useState(0)

//   return (
//     <div className='Contenu'>
      
//         <div className='Kingdom'>
//             <img src={King} height="250px" width="200px"></img>
//             <p>Kingdom: 10$</p>
//             <img src={Kadi} height="20px" width="20px"></img>
//         </div>

        // <div className='OnePiece'>
        //     <img src={One} height="250px" width="200px"></img>
        //     <p>One Piece: 10$</p>
        //     <img src={Kadi} height="20px" width="20px"></img>
        // </div>

        // <div className='Chainsaw'>
        //     <img src={Chainsaw} height="250px" width="200px"></img>
        //     <p>Chainsaw man: 10$</p>
        //     <img src={Kadi} height="20px" width="20px"></img>
        // </div>

        // <div className='Choujin'>
        //     <img src={Chou} height="250px" width="200px"></img>
        //     <p>Choujin x : 10$</p>
        //     <img src={Kadi} height="20px" width="20px"></img>
        // </div>

        // <div className='Dandadan'>
        //     <img src={Dan} height="250px" width="200px"></img>
        //     <p>Dandadan: 10$</p>
        //     <img src={Kadi} height="20px" width="20px"></img>
        // </div>
//     </div>
//   )
// }
