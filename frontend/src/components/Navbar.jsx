import React,{useState,useContext} from 'react'
import {MyContext} from '..';
import {NavLink} from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import {MDBContainer,MDBNavbar,MDBNavbarBrand, MDBNavbarToggler, MDBIcon, MDBNavbarNav, MDBNavbarItem, MDBNavbarLink, MDBDropdown, MDBDropdownToggle, MDBDropdownMenu, MDBDropdownItem, MDBCollapse } from 'mdb-react-ui-kit';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";

export const Navbar = () => {
  const { context,setContext } = useContext(MyContext);
  const navigate = useNavigate();


	const logoutHandler = () => {
    localStorage.removeItem("Tokens");
     	    setContext({...context,"user":null});

		navigate("/");
	};

  const [showBasic, setShowBasic] = useState(false);



	return (
    <>
        <MDBNavbar sticky  expand='lg' dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand tag={NavLink} to="/">TICKETEASE</MDBNavbarBrand>
  
                  {context.user && context.user ? <>   <MDBNavbarToggler
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
            onClick={() => setShowBasic(!showBasic)}
          >
            <MDBIcon icon='bars' fas />
          </MDBNavbarToggler>
  
          <MDBCollapse navbar show={showBasic}>
            <MDBNavbarNav className='ml-auto mb-2 mb-lg-0 justify-content-end' >
              <MDBNavbarItem>
                <MDBNavbarLink tag={NavLink}  to="/" active aria-current='page'>
                  Home
                </MDBNavbarLink>
              </MDBNavbarItem>
              {context.user.is_staff ? <>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/ticket_queue">Ticket Queue</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/workspace">Workspace</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/close_tickets">Close Tickets</MDBNavbarLink>
              </MDBNavbarItem></> :<>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/create_ticket">Create Ticket</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/all_tickets">View Tickets</MDBNavbarLink>
              </MDBNavbarItem></>}
              
              <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle  tag={NavLink} className='nav-link' role='button'>
                {context.user.email}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem tag={NavLink}  className='nav-link bg-dark' to="/profile">Profile</MDBDropdownItem>
                  <MDBDropdownItem  className='nav-link bg-dark' to="/changepassword" tag={NavLink}>Change Password</MDBDropdownItem>
                  <MDBDropdownItem  className='nav-link bg-dark' tag={NavLink} onClick={logoutHandler}><FaSignOutAlt /> Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>
            </MDBNavbarNav>
          </MDBCollapse></>:<MDBNavbarLink className='nav-link bg-dark text-white' tag={NavLink} to="/login"><FaSignInAlt/> Login</MDBNavbarLink>}
        </MDBContainer>
      </MDBNavbar>
      </>
	);
};
