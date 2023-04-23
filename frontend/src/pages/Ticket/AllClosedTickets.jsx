import React, { useEffect, useState, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { MyContext, axiosApi } from "../..";
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';


export const AllClosedTickets = () => {
  const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  const { context, setContext } = useContext(MyContext);
  useEffect(() => {
    const token = localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access : ''
    const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token } }
    axiosApi("ticket/api/all-closed-tickets/", config, setData);
  }, [context.user])


  return (
    <div className="card mx-auto" style={{ width: '76rem' }}>
      <div className="card-body">
        <h5 className="card-title mb-3">Close Tickets</h5>
        <MDBTable striped bordered>
          <MDBTableHead>

            <tr>
              <th scope="col">Ticket ID</th>
              <th scope="col">Title</th>
              <th scope="col">Created On</th>
              <th scope="col">Created By</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>                {data.result && data.result.map((ticket) =>
            <tr><td><small>{ticket.ticket_number}</small></td><td>{ticket.title}</td><td><small>{ticket.date_created}</small></td><td>
              {ticket.created_by?.username}</td><td>{ticket.ticket_status == 'Active' ? <span className="badge bg-warning">Active</span> : ""} {ticket.ticket_status == 'Pending' ? <span className="badge bg-danger">Pending</span> : ""}{ticket.ticket_status == 'Completed' ? <span className="badge bg-success">Completed</span> : ""}</td><td><small><NavLink to={`/ticket_details/${ticket.id}`}>View Details</NavLink></small></td></tr>)}

          </MDBTableBody>
        </MDBTable>
      </div>
    </div>

  )
}

