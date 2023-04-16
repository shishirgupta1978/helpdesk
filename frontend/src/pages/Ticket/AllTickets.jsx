import React from 'react'

export const AllTickets = () => {
    const tickets = []
  return (
    <div className="card mx-auto" style="width: 76rem;">
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
                {tickets.map((ticket)=> <tr key={ticket.id}><td><small>{ticket.ticket_number}</small></td><td><small>{ticket.title}</small></td><td><small>{ticket.date_created}</small></td><td><small>
                    {ticket.assigned_to ? ticket.assigned_to : "Not Assigned"}</small></td><td>{ticket.ticket_status == 'Active'? <span className="badge bg-success">Active</span>:""}{ticket.ticket_status == 'Pending' ? <span className="badge bg-warning">Pending</span> :""}{ticket.ticket_status == 'Completed' ? <span className="badge bg-danger">Completed</span> :""}</td><td><small><a href="\ticket-details\ticket.pk">View Details</a></small></td></tr>) }
                
            </tbody>
        </table>
    </div>
</div>    

  )
}

