import React,{useContext} from 'react'
import {MyContext} from '..';


export const DashBoardPage = () => {
    const { context } = useContext(MyContext);
  
  

  return (
    <div style={{paddingTop:"6rem"}}>
         {context.user && (context.user.is_staff  ?  <section className="container mt-5">
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
        </section>)}
        
      
    </div>
  )
}

