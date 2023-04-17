import React, { useEffect, useState } from "react";
import {MDBInput,MDBBtn,MDBCol,MDBContainer, MDBRow} from "mdb-react-ui-kit";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import { forgetpassword, reset } from "../features/auth/authSlice";

export const ForgetPassword = () => {
	const [formData, setFormData] = useState({
		email: ''
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };

	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { user, isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {
		dispatch(reset());
	}, [isError, isSuccess,  navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();

			dispatch(forgetpassword(formData));
		
	};
	return (
		<>
			<Title title="Forget Password" />
			<br/>
			<MDBContainer className="bg-white p-4 "  style={{width:'320px',margin:"auto", borderRadius:"15px"}}>				
					
							<h3 className="text-center">
								<FaUser /> Forget Password
							</h3>
							<hr className="hr-text" />
	
				{isLoading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="justify-content-center">
						<form onSubmit={submitHandler}>
						<MDBInput  label='Email' type='email' name='email' value={formData.email} onChange={handleChange} className="mb-3" required/>

							
							<MDBBtn
								type="submit"
								color="dark"
								className="mt-3 w-100"
							>
								Send Confirmation Email
							</MDBBtn>
						</form>
					</MDBCol>
				</MDBRow>
        <MDBRow className="py-3">
					<MDBCol>
						Back to Login Page? 
						<Link to="/login"> Click Here</Link>
					</MDBCol>
				</MDBRow>

				
			</MDBContainer>
		</>
	);
};

