import React, { useEffect, useState } from "react";
import {MDBInput,MDBBtn,MDBCol,MDBContainer,  MDBRow} from "mdb-react-ui-kit";
import { FaSignInAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import { login, reset } from "../features/auth/authSlice";

export const LoginPage = () => {

	const [formData, setFormData] = useState({
		email: '',
		password: '',
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
		if (user) {
			navigate("/dashboard");
		}
	}, [user]);

	const submitHandler = (e) => {
		e.preventDefault();
		if (!formData.email) {
			toast.error("An email must be provided");
		}

		if (!formData.password) {
			toast.error("A password must be provided");
		}


		dispatch(login(formData));
	};

	return (
		<>
			<Title title="login" />
			<br/>
			<MDBContainer className="bg-white p-4"  style={{width:'350px',margin:"auto", borderRadius:"15px"}}>
			
							<h3 className="text-center">
								<FaSignInAlt /> Login
							</h3>
							<hr className="hr-text" />

				{isLoading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="justify-content-center">
						<form onSubmit={submitHandler}>
							<MDBInput  label='Email Address' type='email' name='email' value={formData.email} onChange={handleChange} className="mb-3" required/>
							<MDBInput  label='Password' type='password' name='password' value={formData.password} onChange={handleChange}  className="mb-3" required/>
							<MDBRow>
							<MDBCol>
						
							<input type="checkbox"/> Remember me
					</MDBCol>
					<MDBCol>
						<Link to="/forgetpassword"> Forget password?</Link>
					</MDBCol>
				</MDBRow>
							<MDBBtn type="submit" color="dark" className="mt-3 w-100">Sign In</MDBBtn>
						</form>
					</MDBCol>
				</MDBRow>

				<MDBRow className="py-3">
					<MDBCol>
						New Customer?
						<Link to="/register"> Register Here.....</Link>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</>
	);
};

