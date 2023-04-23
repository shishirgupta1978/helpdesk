import React, { useState, useEffect,useContext } from 'react'
import {axiosApi,MyContext} from '../..'
import { NavLink } from 'react-router-dom';
import {useParams } from "react-router-dom";
import {MDBBtn,MDBModal,MDBModalDialog, MDBModalContent, MDBModalHeader,MDBModalTitle,MDBModalBody,MDBModalFooter,} from 'mdb-react-ui-kit';



export const TicketDetails = () => {
  const [basicModal, setBasicModal] = useState(false);

  const toggleShow = () => setBasicModal(!basicModal);

  const {uid} =useParams()
  const [id,setId]  = useState(uid);
  
  const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  const [closedData, setClosedData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
  const closeHandle=(id1)=>{
    const token=localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access :''
    const config1={method:"get",headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}}
    axiosApi(`ticket/api/close-ticket/${id1}/`,config1,setClosedData);
    setId(id1);
    toggleShow();
    
}
  
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
                  <b>Assigned To:</b> {data.result.ticket["assigned_to"]?.username}
                </div>

              </div><br />
              <div className="row">
                <div className="col">
                  {data.result.ticket.is_resolved ? <>
                    <b>Resolved?:</b> <span className="badge bg-success">Yes, resolved</span></> : <>
                    <b>Resolved?:</b> <span className="badge bg-danger">Not Yet</span></>}
                </div>
                <div className="col">
                  <b>Accepted Date:</b> {data.result.ticket.accepted_date}
                </div>

              </div>
              <br />
              <div className="row">
                <div className="col">
                  <b>Created By:</b> {data.result.ticket.created_by?.username}

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
              <h5 className="card-title mb-3">All Tickets created by {data.result.ticket.created_by?.username}</h5>
              {data.result["tickets_per_user"].map((ticket) => <p key={ticket.id} className="card-text">{ticket.ticket_number} <NavLink  onClick={()=>{setId(ticket.id)}} to={`/ticket_details/${ticket.id}/`}>(View)</NavLink></p>)}



            </div>
          </div>
        </div>

      </div>
      <br />
      {context.user.is_staff && !data.result.ticket.is_resolved && <MDBBtn className="btn btn-danger ms-2" onClick={toggleShow}>Confirm Resolution</MDBBtn>}

      {!context.user.is_staff && !data.result.ticket.is_resolved && <NavLink to={`/update_ticket/${data.result.ticket.id}/`} className="btn btn-primary ms-2">Update Ticket</NavLink>}

      <MDBModal show={basicModal} setShow={setBasicModal} tabIndex='-1'>
        <MDBModalDialog>
          <MDBModalContent>
            <MDBModalHeader>
              <MDBModalTitle>Confirm Resolution</MDBModalTitle>
              <MDBBtn className='btn-close' color='none' onClick={toggleShow}></MDBBtn>
            </MDBModalHeader>
            <MDBModalBody>Are your Sure? Click to submit.</MDBModalBody>

            <MDBModalFooter>
              <MDBBtn color='secondary' onClick={toggleShow}>
                Close
              </MDBBtn>
              <MDBBtn  onClick={()=>{closeHandle(data.result.ticket.id)}}>Save changes</MDBBtn>
            </MDBModalFooter>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>

    
      </div>}
    </>
  )
}

