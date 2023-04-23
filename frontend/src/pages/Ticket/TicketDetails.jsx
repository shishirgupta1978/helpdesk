import React, { useState, useEffect,useContext } from 'react'
import {axiosApi,MyContext} from '../..'
import { NavLink } from 'react-router-dom';
import {useParams } from "react-router-dom";



export const TicketDetails = () => {
 
  const {uid} =useParams()
  const [id,setId]  = useState(uid);
  
  const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  
  const { context,setContext } = useContext(MyContext);
  useEffect(() => {
       
    const token=localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access :''
    const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token } }
    axiosApi(`ticket/api/ticket-details/${id}`, config, setData);

  }, [id])

  return (


    <>{ context.user && data.is_success &&
    <div>
      <div className="row" >
        <div className="col-md-7">

          <div className="card mx-auto" style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title mb-3">{data.result.ticket["title"]}</h5>
              <p><b>Ticket Number: </b><small>{data.result.ticket["ticket_number"]}</small></p>
              <p className="card-text"><b>Description: </b>{data.result.ticket["description"]}</p>
              <div className="row">
                <div className="col">
                  <b>Date Created:</b> {data.result.ticket["date_created"]}
                </div>
                <div className="col">
                  <b>Assigned To:</b> {data.result.ticket["assigned_to"]}
                </div>

              </div><br />
              <div className="row">
                <div className="col">
                  {data.result.ticket.is_resolved ? <>
                    <b>Resolved?:</b> <span className="badge bg-danger">Yes, resolved</span></> : <>
                    <b>Resolved?:</b> <span className="badge bg-success">Not Yet</span></>}
                </div>
                <div className="col">
                  <b>Accepted Date:</b> {data.result.ticket.accepted_date}
                </div>

              </div>
              <br />
              <div className="row">
                <div className="col">
                  <b>Created By:</b> {data.result.ticket.created_by}

                </div>
                <div className="col">
                  <b>Ticket Status:</b><small> {data.result.ticket.ticket_status}</small>
                </div>

              </div>


            </div>
          </div>
        </div>
        <div className="col-md-5">
          <div className="card mx-auto" style={{ width: '100%' }}>
            <div className="card-body">
              <h5 className="card-title mb-3">All Tickets created by {data.result.ticket.created_by}</h5>
              {data.result["tickets_per_user"].map((ticket) => <p key={ticket.id} className="card-text">{ticket.ticket_number} <NavLink  onClick={()=>{setId(ticket.id)}} to={`/ticket_details/${ticket.id}/`}>(View)</NavLink></p>)}



            </div>
          </div>
        </div>

      </div>
      <br />
      {context.user.is_staff && !data.result.ticket.is_resolved && <a className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">Confirm Resolution</a>}

      {!context.user.is_staff && !data.result.ticket.is_resolved && <NavLink to={`/update_ticket/${data.result.ticket.id}/`} className="btn btn-primary ms-2">Update Ticket</NavLink>}


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Confirm Resolution</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              Are your Sure? Click to submit.
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <a href="{% url 'close-ticket' ticket.pk %}" className="btn btn-primary">Save changes</a>
            </div>
          </div>
        </div>
      </div>

      </div>}
    </>
  )
}

