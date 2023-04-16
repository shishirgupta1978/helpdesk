import React from 'react'
import { SectionImage } from '../../components'
import "./ContactPage.scss"

export const ContactPage = () => {
  return (
    <div>
        
         <SectionImage heading="Contact Us" text="Feedback and Suggestions"/>
         <div className='form'>
        <form>
            <label>Your Name</label>
            <input type="text"></input>
            <label>Email</label>
            <input type="email"></input>
            <label>Subject</label>
            <input type="text"></input>
            <label>Message</label>
            <textarea rows="6" placeholder='Type your message here'/>

            <button className='btn'>Submit</button>
        </form>
      
    </div>
        

      
    </div>
  )
}

