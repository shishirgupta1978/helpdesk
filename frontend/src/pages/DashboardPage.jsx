import React,{useContext} from 'react'
import {MyContext} from '..';
import { NavLink } from 'react-router-dom';

export const DashBoardPage = () => {
    const { context } = useContext(MyContext);
  
  

  return (
    <div style={{paddingTop:"6rem"}}>
         {context.user && (context.user.is_staff  ?  <section className="container mt-5">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py=5">
                    <h1 className="display-5 fw-bold">Support Dashboard</h1>
                    <p className="col-md-8 fs-4">Welcome, {context.user.username}.</p>
                    <p className="col-md-8 fs-4">This is the central hub for all support-related activities and information. As a support team member, this dashboard will be your go-to resource for tracking customer inquiries, monitoring support metrics, and accessing important support resources.
</p>
                    <NavLink className="btn btn-primary btn-lg" to="/ticket_queue" >Ticket Queue</NavLink>
                </div>

            </div>
        </section> : <section className="container mt-5">
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid py=5">
                    <h1 className="display-5 fw-bold">User Dashboard</h1>
                    <p className="col-md-8 fs-4">Welcome, {context.user.username}.</p>
                    <p className="col-md-8 fs-4">Welcome to our Helpdesk Support System! We're here to assist you with any issues or questions you may have regarding our services. Our team of dedicated support agents is committed to providing you with the best possible experience and ensuring that your concerns are addressed in a timely and efficient manner.</p>
                    <NavLink className="btn btn-primary btn-lg" to="/create_ticket" >Create Ticket</NavLink>
                </div>

            </div>
        </section>)}
        
      
    </div>
  )
}

