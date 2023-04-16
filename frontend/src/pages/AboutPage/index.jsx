import React from 'react'
import './AboutPage.scss'
import { Link } from 'react-router-dom'
import {IntroImg,SectionImg,Project1Img,Project2Img} from "../../assets"
import { SectionImage } from '../../components'
export const AboutPage = () => {
    return (
        <>
            <SectionImage heading="ABOUT" text="I'm a friendly Back-End Developer"/>

            <div className='about'>
                <div className='left'>
                    <h1>Who Am I?</h1>
                    <p>I'm a Django backend developer. I create responsive secure websites for my clients.</p>
                    <Link to="/profile/contact"><button className='btn'>Contact</button></Link>
                </div>
                <div className='right'>
                    <div className='img-container'>
                        <div className='img-stack top'>
                            <img src={Project1Img} className="img" alt="image1" />
                        </div>
                        <div className='img-stack bottom'>
                            <img src={Project2Img} className="img" alt="image2" />
                        </div>

                    </div>

                </div>

            </div>
        </>
    )
}

