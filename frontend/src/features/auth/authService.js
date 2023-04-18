import { axiosInstance } from "../../Api";
import { isLoggedIn, setAuthTokens, clearAuthTokens, getAccessToken, getRefreshToken } from 'axios-jwt'

const REGISTER_URL = "/api/auth/users/";
const LOGIN_URL = "api/token/";
const ACTIVATE_URL = "/api/auth/users/activation/";
const DASHBOARD_URL = "/api/auth/users/me";
const CHANGEPASSWORD_URL = "/api/auth/users/set_password/";
const FORGETPASSWORD_URL = "/api/auth/users/reset_password/";
const RESETPASSWORD_URL = "/api/auth/users/reset_password/";

// Register user

const changepassword = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			"Authorization": "Bearer " + getAccessToken()
		},
	};

	const response = await axiosInstance.post(CHANGEPASSWORD_URL, userData, config);
	return response.data;
};

const resetpassword = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
			
		},
	};

	const response = await axiosInstance.post(RESETPASSWORD_URL, userData, config);
	return response.data;
};

const register = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await axiosInstance.post(REGISTER_URL, userData, config);
	return response.data;
};


const forgetpassword = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await axiosInstance.post(FORGETPASSWORD_URL, userData, config);
	return response.data;
};



// Login user

const login = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const response = await axiosInstance.post(LOGIN_URL, userData, config);
	if (response.data) {
		setAuthTokens({
			accessToken: response.data.access,
			refreshToken: response.data.refresh
		  });
	}
	return response.data;
};


const activate = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};
	const response = await axiosInstance.post(ACTIVATE_URL, userData, config);
	return response.data;
};

const authService = { register, login, activate,changepassword,forgetpassword,resetpassword };

export default authService;
