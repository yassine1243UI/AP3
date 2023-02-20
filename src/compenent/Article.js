import React from "react"

function UserArticle() {
    let Users = [
      {id: 0, name:'Balle', prix: 10},
      {id:1, name:'Basket', prix:10},
      {id:2, name:'Maillot', prix:10},
      {id: 3, name:'Pannier', prix:100},
    ]
  
    return(
      <div>
        {User.map((user, index) => (
          <UserInfo key={`${user}-${index}`} name={user.name} index={index} prix={User.prix}/>
        ))}
      </div>
    )
  }
  export default UserArticle