import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { isLoggedIn, setAuthTokens, clearAuthTokens, getAccessToken, getRefreshToken } from 'axios-jwt'
import jwt_decode from "jwt-decode";
import authService from "./authService";
import { toast } from "react-toastify";


const initialState = {
	//user: localStorage.getItem("auth-tokens-development") ? jwt_decode(JSON.parse(localStorage.getItem("auth-tokens-development")).accessToken) : null,
	user: isLoggedIn() ? jwt_decode(getAccessToken()) : null,
	isError: false,
	isLoading: false,
	isSuccess: false,
	message: "",
};

export const register = createAsyncThunk(
	"auth/register",
	async (user, thunkAPI) => {
		try {
			return await authService.register(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
				toast.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const forgetpassword = createAsyncThunk(
	"auth/forgetpassword",
	async (user, thunkAPI) => {
		try {
			return await authService.forgetpassword(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
				toast.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);


export const changepassword = createAsyncThunk(
	"auth/changepassword",
	async (user, thunkAPI) => {
		try {
			return await authService.changepassword(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
				toast.error(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);


export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
	try {
		return await authService.login(user);
	} catch (error) {
		const message =
			(error.response &&
				error.response.data &&
				error.response.data.message) ||
			error.message ||
			error.toString();
			toast.error(message);

		return thunkAPI.rejectWithValue(message);
	}
});

export const logout = createAsyncThunk("auth/logout", async () => {
	clearAuthTokens();
});

export const activate = createAsyncThunk(
	"auth/activate",
	async (user, thunkAPI) => {
		try {
			return await authService.activate(user);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();
				toast.error(message);

			return thunkAPI.rejectWithValue(message);
		}
	}
);

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(register.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(register.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				toast.success(
					"An activation email has been sent your email address. Please check your email"
				);
			})
			.addCase(register.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(login.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user =jwt_decode(action.payload.access);
			})
			.addCase(login.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			})
			.addCase(logout.fulfilled, (state) => {
				state.user = null;
				state.isLoading = false;
			})
			.addCase(activate.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(activate.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
			})
			.addCase(activate.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
				state.user = null;
			}).addCase(changepassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(changepassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				toast.success("Request completed successfully.")
			})
			.addCase(changepassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
			}).addCase(forgetpassword.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(forgetpassword.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				toast.success("Request completed successfully.")
			})
			.addCase(forgetpassword.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
			})

			;
	},
});

export const { reset } = authSlice.actions;

export default authSlice.reducer;
