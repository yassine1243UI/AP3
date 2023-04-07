import React from 'react'
import '../style/Footer.css'
import { Link } from 'react-router-dom';

export default function Footer() {
    return (
        <div className='Footer'>
            <ul>
                <li>Adresse: Bikini Bottom </li>
                <li>Num: 06 12 34 56 78 </li>
                <Link to="https://docs.google.com/document/d/15RXYiWt1z49oEKX4FiiG0mLTv0sgY6nlf-9Pxjw4BrY/edit?_hsmi=203379577&_hsenc=p2ANqtz-97p0CouTNWAcsxchk9LcvmFYw4PMTHdDAEuMt0faqdKgZeYIyJUoHPhopZ8Glm0GLo7bgE4NsFoiZA2BTEcwW3_9r--sh1ymxwW1YB9Mb4kCLKhoY">
                    <li>Mention Légal: </li></Link>
                <li>Nous Contacter</li>
            </ul>
        </div>
    )
}
