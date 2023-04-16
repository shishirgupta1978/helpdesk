import React, { useEffect, useState } from "react";
import {MDBInput,MDBBtn,MDBCol,MDBContainer, MDBRow} from "mdb-react-ui-kit";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import { register, reset } from "../features/auth/authSlice";

export const RegisterPage = () => {
	const [formData, setFormData] = useState({
		username:'',
		email: '',
		password: '',
		re_password: ''
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
			navigate("/");
			
		}

		dispatch(reset());
	}, [isError, isSuccess, message, user, navigate, dispatch]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (formData.password !== formData.re_password) {
			toast.error("Passwords do not match");
		} else {
			dispatch(register(formData));
		}
	};
	return (
		<>
			<Title title="Register" />
			<br/>
			<MDBContainer className="bg-white p-4 "  style={{width:'320px',margin:"auto", borderRadius:"15px"}}>				
					
							<h3 className="text-center">
								<FaUser /> Register
							</h3>
							<hr className="hr-text" />
	
				{isLoading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="justify-content-center">
						<form onSubmit={submitHandler}>
						<MDBInput  label='Username' type='text' name='username' value={formData.username} onChange={handleChange} className="mb-3" required/>

						<MDBInput  label='Email Address' type='email' name='email' value={formData.email} onChange={handleChange} className="mb-3" required/>
							<MDBInput  label='Password' type='password' name='password' value={formData.password} onChange={handleChange}  className="mb-3" required/>
							<MDBInput  label='Confirm Password' type='password' name='re_password' value={formData.re_password} onChange={handleChange}  className="mb-3" required/>

							
							<MDBBtn
								type="submit"
								color="dark"
								className="mt-3 w-100"
							>
								Sign Up
							</MDBBtn>
						</form>
					</MDBCol>
				</MDBRow>

				<MDBRow className="py-3">
					<MDBCol>
						Have an account already? 
						<Link to="/login"> Login</Link>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</>
	);
};

