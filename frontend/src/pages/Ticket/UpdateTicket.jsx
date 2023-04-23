import React, { useEffect, useState,useContext } from "react";
import {MDBInput,MDBBtn,MDBCol,MDBContainer,MDBTextArea,  MDBRow} from "mdb-react-ui-kit";
import { useParams } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { FaSignInAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {Spinner,Title} from "../../components";
import {MyContext,axiosApi} from "../..";

export const UpdateTicket = () => {
	const {uid} =useParams()
	const [id,setId]  = useState(uid);
  
	const [loadData, setLoadData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const [data, setData] = useState({ 'is_loading': false, 'is_error': false, 'is_success': false, 'result': null, 'message': null })
	const { context,setContext } = useContext(MyContext);

	const [formData, setFormData] = useState({
		title: '',
		description: '',
	  });

	  const handleChange = (event) => {
		setFormData({
		  ...formData,
		  [event.target.name]: event.target.value,
		});
	  };
	
	
	

	const navigate = useNavigate();
	useEffect(()=>{
		if(data.is_success)
		{
			toast.success("Record update successfully.")
			navigate("/all_tickets/")
		}
		

		const token=localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access :''
		const config = { method: "get", headers: { "Content-Type": "application/json", "Authorization": "Bearer " + token } }
		if(!loadData.is_success)
		{
			axiosApi(`ticket/api/update-ticket/${id}`, config, setLoadData);
		}
		else{
			setFormData({title:loadData.result.title,description:loadData.result.description})


		}
		
	


	},[loadData.is_success,data.is_success])

	const submitHandler = (e) => {
		e.preventDefault();
        const token=localStorage.getItem("Tokens") ? JSON.parse(localStorage.getItem("Tokens"))?.access :''
		console.log(formData);
		const config = { method: "put", headers: {"Content-Type": "application/json", "Authorization": "Bearer " + token}, data:formData }
		axiosApi(`ticket/api/update-ticket/${uid}`, config, setData);

	};	

  return (
	<>
	{loadData.is_loading && <Spinner />}
	
	{loadData.is_success && <>
			<Title title="Updata Ticket" />
			<br/>
			<MDBContainer className="bg-white p-4"  style={{width:'350px',margin:"auto", borderRadius:"15px"}}>
			
							<h3 className="text-center">
								<FaSignInAlt /> Update Ticket
							</h3>
							<hr className="hr-text" />

				
				<MDBRow className="mt-3">
					<MDBCol className="justify-content-center">
						<form onSubmit={submitHandler}>
							<MDBInput  label='Title' type='text' name='title' value={formData.title} onChange={handleChange} className="mb-3" required/>
							<MDBTextArea  label='Description' type='text' rows={4} name='description' value={formData.description} onChange={handleChange}  className="mb-3" required/>
							<MDBBtn type="submit" color="dark" className="mt-3 w-100">Submit</MDBBtn>
						</form>
					</MDBCol>
				</MDBRow>
			</MDBContainer></>}
		</>


  )
}

