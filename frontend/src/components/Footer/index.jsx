import React from 'react'
import './Footer.scss'
import {FaHome,FaLinkedin,FaMailBulk,FaPhone,FaFacebook,FaTwitter} from "react-icons/fa"

export const Footer = () => {
  return (
    <footer>
        <div className='container'>
            <address>
                <div className='location'>
                    <FaHome size={20} style={{color:'#fff', marginRight:"2rem"}}/>
                        <p>123 Housing Society,<br/>Raj Nagar,<br/>India.</p>
                    
                </div>
                <div className='phone'>
                    <p><FaPhone size={20} style={{color:'#fff', marginRight:"2rem"}}/> 909090900</p>              </div>
                <div className='email'>
                    <p>
                    <FaMailBulk size={20} style={{color:'#fff', marginRight:"2rem"}}/> abc@gmail.com</p>
                </div>



            </address>
            <div className='right'>

            <h4>About the company</h4>
            <p>This is me shishir gupta. React Developer of company. I enjoy discussing new projects and design challengers.</p>
            <div className='social'>
            <FaFacebook size={30} style={{color:'#fff', marginRight:"1rem"}}/>
            <FaTwitter size={30} style={{color:'#fff', marginRight:"1rem"}}/>
            <FaLinkedin size={30} style={{color:'#fff', marginRight:"1rem"}}/>

            </div>



            </div>

        </div>
      
    </footer>
  )
}

