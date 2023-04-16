import React,{useEffect, useState} from 'react'
import {NavLink} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {FaBars,FaTimes} from 'react-icons/fa'
import { isLoggedIn, setAuthTokens, clearAuthTokens, getAccessToken, getRefreshToken } from 'axios-jwt'
import { useNavigate } from "react-router-dom";
import { Spinner } from './Spinner';
import {
    MDBContainer,
    MDBNavbar,
    MDBNavbarBrand,
    MDBNavbarToggler,
    MDBIcon,
    MDBNavbarNav,
    MDBNavbarItem,
    MDBNavbarLink,
    MDBBtn,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBCollapse,
  } from 'mdb-react-ui-kit';
  
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { GiHouse } from "react-icons/gi";
import { logout, reset } from "../features/auth/authSlice";

export const Navbar = () => {
  const navigate = useNavigate();
	const dispatch = useDispatch();

	const { user,isLoading } = useSelector((state) => state.auth);

	const logoutHandler = () => {
		dispatch(logout());
		dispatch(reset());
		navigate("/");
	};

  const [showBasic, setShowBasic] = useState(false);



	return (
    <>
        <MDBNavbar sticky  expand='lg' dark bgColor='dark'>
        <MDBContainer fluid>
          <MDBNavbarBrand tag={NavLink} to="/">TICKETEASE</MDBNavbarBrand>
  
                  {user && user ? <>   <MDBNavbarToggler
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
              {user.is_staff ? <>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/properties">Ticket Queue</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/properties">Workspace</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/properties">Close Tickets</MDBNavbarLink>
              </MDBNavbarItem></> :<>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/properties">Create Ticket</MDBNavbarLink>
              </MDBNavbarItem>
              <MDBNavbarItem>
                <MDBNavbarLink  tag={NavLink} to="/properties">View Ticket</MDBNavbarLink>
              </MDBNavbarItem></>}
              
              <MDBNavbarItem>
              <MDBDropdown>
                <MDBDropdownToggle  tag={NavLink} className='nav-link' role='button'>
                {user.email}
                </MDBDropdownToggle>
                <MDBDropdownMenu>
                  <MDBDropdownItem tag={NavLink}  className='nav-link bg-dark'  to="/profile">Profile</MDBDropdownItem>
                  <MDBDropdownItem  className='nav-link bg-dark' tag={NavLink}>Change Password</MDBDropdownItem>
                  <MDBDropdownItem  className='nav-link bg-dark' tag={NavLink} onClick={logoutHandler}><FaSignOutAlt /> Logout</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>



  
            </MDBNavbarNav>
  
          </MDBCollapse></>:<MDBNavbarLink className='nav-link bg-dark text-white' tag={NavLink} to="/login">Login</MDBNavbarLink>}
        </MDBContainer>
      </MDBNavbar>
      </>
	);
};
