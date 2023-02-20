import React from 'react'
import Star from './Star'

export default function Userinfo({name, index, commentaire, connaissance, star, smiley}) {
  return (
   
        <li  className={index % 2===0 ? "blue_card" : "blanc_card"}>
            <Star ratingValue='star'  value={star}/>
           <Star ratingValue='smiley'  value={smiley}/>
        </li>
  )
}
