import React from 'react'
import { SectionImage } from '../../components'
import { Card } from '../../components';
import { CardData } from '../../assets/data/CardData';
import "./ProjectPage.scss"


export const ProjectsPage = () => {
  return (
    <div>
        <SectionImage heading="PROJECTS" text="Some of my most recent works"/>
        <div className='work-container'>
        <h1 className='project-heading'></h1>
        <div className='project-container'>
            {CardData.map((val,i)=>{
                return <Card key={i} imgsrc={val.imgsrc} title={val.title} text={val.text} view={val.view} source={val.source}/>
            })         }
        </div>
      
    </div>
   </div>
  )
}

