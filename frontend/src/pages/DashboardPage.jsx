import React from 'react'
import {useSelector } from 'react-redux';

export const DashBoardPage = () => {
    const {user}= useSelector((state)=>state.auth)

  return (
    <div style={{paddingTop:"6rem"}}>
         { user.is_staff  ?  <section className="container mt-5">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py=5">
                    <h1 className="display-5 fw-bold">Engineer Dashboard</h1>
                    <p className="col-md-8 fs-4">using a serl sdlfj sdfj ls lsdfjljodfsj fdojs lfjsdlfj sldfjsodfjsdlf slfj sldfjslfj sldfj lsfjlsdf lsdfj sdlfj sdlfjsd lfjdsf jljldsflsdjfl sdflsd fsdjf sdfj sdlfj dlf dlf.</p>
                    <button className="btn btn-primary btn-lg" type="button">Button</button>
                </div>

            </div>
        </section> : <section className="container mt-5">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py=5">
                    <h1 className="display-5 fw-bold">Customer Dashboard</h1>
                    <p className="col-md-8 fs-4">using a serl sdlfj sdfj ls lsdfjljodfsj fdojs lfjsdlfj sldfjsodfjsdlf slfj sldfjslfj sldfj lsfjlsdf lsdfj sdlfj sdlfjsd lfjdsf jljldsflsdjfl sdflsd fsdjf sdfj sdlfj dlf dlf.</p>
                    <button className="btn btn-primary btn-lg" type="button">Button</button>
                </div>

            </div>
        </section>}
        
      
    </div>
  )
}

