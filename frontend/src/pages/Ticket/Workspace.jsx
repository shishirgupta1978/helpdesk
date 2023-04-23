import React, { useEffect, useState,useContext, useCallback } from 'react'
import { NavLink } from 'react-router-dom'
import {MyContext,axiosApi} from "../..";
import { toast } from 'react-toastify';



export const Workspace = () => {
    const [data,setData]=useState({'is_loading':false,'is_error':false,'is_success':false,'result':null,'message':null})
    const [acceptData,setAcceptData]=useState({'is_loading':false,'is_error':false,'is_success':false,'result':null,'message':null})
    const [id,setId]=useState(0)
    


    
    const { context,setContext } = useContext(MyContext);
useEffect(()=>{
    const token=localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access :''
    const config={method:"get",headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}}
    
    axiosApi("ticket/api/workspace/",config,setData);
    

},[context.user,id])


  return (
<div className="card mx-auto" style={{width: '76rem'}}>
    <div className="card-body">
        <h5 className="card-title mb-3">Ticket Workspace</h5>
        <table className="table table-bordered">
            <thead>
                <tr>
                    <th scope="col">Ticket ID</th>
                    <th scope="col">Title</th>
                    <th scope="col">Created On</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Status</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody>
                {data.result && data.result.map((ticket)=> <tr key={ticket.id}><td><small>{ticket.ticket_number}</small></td><td><small>{ticket.title}</small></td><td><small>{ticket.date_created?.toLocaleString('en-IN',{dateStyle:'short',timeStyle:'medium'})}</small></td><td><small>
                   {ticket.created_by?.username}</small></td><td>{ticket.ticket_status == 'Active'?<span className="badge bg-success">Active</span>:""}{ticket.ticket_status == 'Pending' ? <span className="badge bg-warning">Pending</span>:""}{ticket.ticket_status == 'Completed' ? <span className="badge bg-danger">Completed</span>:""}</td><td><small><NavLink to={`/ticket_details/${ticket.id}`}>View Details</NavLink></small></td></tr> ) }
            </tbody>
        </table>
    </div>
</div>    

  )
}

