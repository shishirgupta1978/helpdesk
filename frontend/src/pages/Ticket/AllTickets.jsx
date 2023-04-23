import React, { useEffect, useState,useContext } from 'react'
import { NavLink } from 'react-router-dom'
import {MyContext,axiosApi} from "../..";


export const AllTickets = () => {
    const [data,setData]=useState({'is_loading':false,'is_error':false,'is_success':false,'result':null,'message':null})
    const { context,setContext } = useContext(MyContext);
useEffect(()=>{
    const token=localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access :''
    const config={method:"get",headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}}
axiosApi("ticket/api/all-tickets/",config,setData);
},[context.user])


  return (
    
    <div className="card mx-auto" style={{width: '76rem'}}>
    <div className="card-body">
        <h5 className="card-title mb-3">All Tickets</h5>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Ticket ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Assigned To</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {data['is_success'] && data['result'] && data['result'].map((ticket)=> <tr key={ticket.id}><td><small>{ticket.ticket_number}</small></td><td><small>{ticket.title}</small></td><td><small>{ticket.date_created}</small></td><td><small>
                    {ticket.assigned_to ? ticket.assigned_to?.username : "Not Assigned"}</small></td><td>{ticket.ticket_status == 'Active'? <span className="badge bg-warning">Active</span>:""}{ticket.ticket_status == 'Pending' ? <span className="badge bg-danger">Pending</span> :""}{ticket.ticket_status == 'Completed' ? <span className="badge bg-success">Completed</span> :""}</td><td><small><NavLink to={`/ticket_details/${ticket.id}`}>View Details</NavLink></small></td></tr>) }
                
            </tbody>
        </table>
    </div>
</div>    

  )
}

