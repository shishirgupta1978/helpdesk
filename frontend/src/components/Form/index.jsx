import React from 'react'
export const Form = (props) => {
  return (
    <div style={{display:'flex',alignItems:'center',height:'100vh',paddingTop:'6rem'  }}>
        <form onSubmit={props.onSubmit} style={{border:'1px solid rgba(255,255,255,0.1)', width:props.width,     paddingTop: '2.5rem',paddingBottom: '2.5rem'}}>
            <h1 style={{Color:'green', textAlign:'center', marginBottom:'35px'}}>{props.title}</h1>
            {props.children}

        </form>
      
    </div>
  )
}

