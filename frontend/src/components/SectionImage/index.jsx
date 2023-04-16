import React from 'react'
import './SectionImage.scss'

export const SectionImage = (props) => {
  return (
    <div className='sec-img'>
        <div className='heading'>
            <h1>{props.heading}</h1>
            <p>{props.text}</p>
        </div>
      
    </div>
  )
}


