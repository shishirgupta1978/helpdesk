import { IAuthTokens, TokenRefreshRequest, applyAuthTokenInterceptor, getBrowserLocalStorage } from 'axios-jwt'
import axios from 'axios';

const BASE_URL = import.meta.env.VITE_BASE_URL;

export const axiosInstance = axios.create({ baseURL: BASE_URL })

const requestRefresh = async (refresh) => {
    return await axios.post(`${BASE_URL}/api/token/refresh/`, { refresh })
      .then(response => resolve(response.data.access))
};

applyAuthTokenInterceptor(axiosInstance, { requestRefresh });  // Notice that this uses the axiosInstance instance.  <-- important
const getStorage = getBrowserLocalStorage
applyAuthTokenInterceptor(axiosInstance, { requestRefresh, getStorage })


// 4. Logging in
const login = async (params) => {
  const response = await axiosInstance.post('/api/auth/jwt/create', params)

  setAuthTokens({
    accessToken: response.data.access,
    refreshToken: response.data.refresh
  })
}

// 5. Logging out
const logout = () => clearAuthTokens()

//axiosInstance.get('/api/endpoint/that/requires/login').then(response => { })
