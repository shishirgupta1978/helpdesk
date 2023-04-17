import React, { useEffect, useState } from "react";
import {MDBInput,MDBBtn,MDBCol,MDBContainer, MDBRow} from "mdb-react-ui-kit";
import { FaUser } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import { changepassword, reset } from "../features/auth/authSlice";

export const ChangePasswordPage = () => {
	const [formData, setFormData] = useState({
		current_password: '',
		new_password: '',
		re_new_password: ''
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

		if (formData.new_password !== formData.re_new_password) {
			toast.error("Passwords do not match");
		} else {
			dispatch(changepassword(formData));
		}
	};
	return (
		<>
			<Title title="Change Password" />
			<br/>
			<MDBContainer className="bg-white p-4 "  style={{width:'320px',margin:"auto", borderRadius:"15px"}}>				
					
							<h3 className="text-center">
								<FaUser /> Change Password
							</h3>
							<hr className="hr-text" />
	
				{isLoading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="justify-content-center">
						<form onSubmit={submitHandler}>
						<MDBInput  label='Current Password' type='password' name='current_password' value={formData.current_password} onChange={handleChange} className="mb-3" required/>

						<MDBInput  label='New Password' type='password' name='new_password' value={formData.new_password} onChange={handleChange} className="mb-3" required/>
							<MDBInput  label='Confirm New Password' type='password' name='re_new_password' value={formData.re_new_password} onChange={handleChange}  className="mb-3" required/>

							
							<MDBBtn
								type="submit"
								color="dark"
								className="mt-3 w-100"
							>
								Update
							</MDBBtn>
						</form>
					</MDBCol>
				</MDBRow>

				
			</MDBContainer>
		</>
	);
};

