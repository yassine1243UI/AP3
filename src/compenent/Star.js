import React from 'react'

export default function Rating(props) {
    const {ratingValue, value}=props
    const starRating=props.value
    const Tab = [1,2,3,4,5]
    var ratingType = ratingValue === 'star' ? "★" : "😁"
  return (
    <div>

        {Tab.map((nbr,index) => (
          <span key={`${nbr}-${index}`}>
             {value>= nbr ? ratingType:null }  
          </span>))}

          

    </div>
  )
}