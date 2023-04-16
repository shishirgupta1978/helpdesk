import { axiosInstance } from "../../Api";
import { isLoggedIn, setAuthTokens, clearAuthTokens, getAccessToken, getRefreshToken } from 'axios-jwt'

const REGISTER_URL = "/api/auth/users/";
const LOGIN_URL = "api/token/";
const ACTIVATE_URL = "/api/auth/users/activation/";
const DASHBOARD_URL = "/api/auth/users/me";

// Register user
const register = async (userData) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const response = await axiosInstance.post(REGISTER_URL, userData, config);
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

const authService = { register, login, activate };

export default authService;
