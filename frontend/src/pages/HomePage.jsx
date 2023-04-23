import React from "react";
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBBtn } from 'mdb-react-ui-kit';
import { NavLink } from "react-router-dom";
import {Title} from "../components";

export const HomePage = () => {
	return (
		<>
			<Title />
			<MDBContainer className='my-5'>
      <MDBRow className='justify-content-center'>
        <MDBCol md='6'>
          <MDBCard>
            <MDBCardBody>
              <h3 className='mb-4'>Welcome to the Ticket Resolution System!</h3>
              <p>
                If you have any issues or questions, please submit a ticket and our support team will get back to you as soon as possible.
              </p>
              <MDBBtn tag={NavLink} to='/login' color='primary'>
                Login
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
		</>
	);
};

