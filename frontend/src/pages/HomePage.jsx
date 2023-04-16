import React from "react";
import { MDBBtn,MDBContainer } from "mdb-react-ui-kit";
import { NavLink } from "react-router-dom";
import {Title} from "../components";

export const HomePage = () => {
	return (
		<>
			<Title />
			<header className="masthead main-bg-image">
				<MDBContainer className="px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
					<div className="d-flex justify-content-center">
						<div className="text-center">
							<h1 className="mx-auto my-0 text-uppercase">
								TICKETEASE
							</h1>
							<h2 className="text-white-50 mx-auto mt-2 mb-5">
								The one stop shop for all matters properties.
								Buy,Rent or sell with us!
							</h2>
								<MDBBtn tag={NavLink}  to="/properties" variant="primary">Get Started</MDBBtn>
						</div>
					</div>
				</MDBContainer>
			</header>
		</>
	);
};

