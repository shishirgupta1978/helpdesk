import React from 'react'

export const TicketDetails = () => {
  const ticket ={}
  return (
    <div>
      <div className="row" >
    <div className="col-md-7">
        <div className="card mx-auto" style="width: 100%;">
            <div className="card-body">
                <h5 className="card-title mb-3">{ticket.title}</h5>
                <p><b>Ticket Number: </b><small>{ticket.ticket_number}</small></p>
                <p className="card-text"><b>Description: </b>{ticket.description}</p>
                <div className="row">
                    <div className="col">
                        <b>Date Created:</b> {ticket.date_created}
                    </div>
                    <div className="col">
                        <b>Assigned To:</b> {ticket.assigned_to}
                    </div>

                </div><br />
                <div className="row">
                    <div className="col">
                        {ticket.is_resolved ? <>
                        <b>Resolved?:</b> <span className="badge bg-danger">Yes, resolved</span></> : <>
                        <b>Resolved?:</b> <span className="badge bg-success">Not Yet</span></>}
                    </div>
                    <div className="col">
                        <b>Accepted Date:</b> {ticket.accepted_date}
                    </div>

                </div>
                <br />
                <div className="row">
                    <div className="col">
                        <b>Created By:</b> {ticket.created_by}
                      
                    </div>
                    <div className="col">
                        <b>Ticket Status:</b><small> {ticket.ticket_status}</small>
                    </div>

                </div>


            </div>
        </div>
    </div>
    <div className="col-md-5">
        <div className="card mx-auto" style="width: 100%;">
            <div className="card-body">
                <h5 className="card-title mb-3">All Tickets created by {ticket.created_by}</h5>
                {tickets_per_user.map((ticket)=><p key={ticket.id} className="card-text">{ticket.ticket_number} <a href="/ticket-details/ticket.pk">(View)</a></p> ) }
                
                

            </div>
        </div>
    </div>

</div>
<br/>
{user.is_engineer && !ticket.is_resolved && <a  className="btn btn-danger"  data-bs-toggle="modal" data-bs-target="#exampleModal">Confirm Resolution</a> }

{request.user.is_customer && !ticket.is_resolved && <a href="/update-ticket/ticket.pk" className="btn btn-primary">Update Ticket</a>}

  
  <div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
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

      
    </div>
  )
}

