import React, { useEffect } from "react";
import { MDBBtn, MDBCol, MDBContainer, MDBRow } from "mdb-react-ui-kit";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../components";
import { activate, reset } from "../features/auth/authSlice";

export const ActivatePage = () => {
	const { uid, token } = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { isLoading, isError, isSuccess, message } = useSelector(
		(state) => state.auth
	);

	useEffect(() => {

		if (isSuccess) {
			navigate("/");
		}

		dispatch(reset());
	}, [isSuccess, message, navigate, dispatch]);

	const submitHandler = () => {
		const userData = {
			uid,
			token,
		};

		dispatch(activate(userData));
		toast.success("Your account has been activated! You can login now");
	};

	return (
		<>
			<Title title="Activate User" />
			<MDBContainer>
				<MDBRow>
					<MDBCol className="mg-top text-center">
						<section>
							<h1>
								<FaCheckCircle /> Activate your account
							</h1>
							<hr className="hr-text" />
						</section>
					</MDBCol>
				</MDBRow>
				{isLoading && <Spinner />}
				<MDBRow className="mt-3">
					<MDBCol className="text-center">
						<MDBBtn
							type="submit"
							variant="outline-success"
							size="lg"
							className="mt-3 large-btn"
							onClick={submitHandler}
						>
							Activate
						</MDBBtn>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</>
	);
};


