import {Layout, HomePage, AboutPage, ContactPage,ProjectsPage,LoginPage,RegisterPage,ActivatePage, ForgetPassword, DashBoardPage, NotFound,ChangePasswordPage,ResetPassword} from './pages'
import { PrivateRoute } from './components'
import {Routes,Route,Navigate} from 'react-router-dom'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


export function Urls() {

  return (
    <>
    <Routes>
      <Route path="/" element={<Layout/>}>
      <Route index element={<Navigate to="/home"/>}/>
      <Route path="home" element={<HomePage/>}/>
      <Route path="about" element={<AboutPage/>}/>
      <Route path="contact" element={<ContactPage/>}/>
      <Route path="projects" element={<ProjectsPage/>}/>
      <Route path="login" element={<LoginPage/>}/>
      <Route path="changepassword" element={<PrivateRoute><ChangePasswordPage/></PrivateRoute>}/>
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="forgetpassword" element={<ForgetPassword/>}/>
      <Route path="activate/:uid/:token" element={<ResetPassword/>}/>
      <Route path="resetpassword/:uid/:token" element={<ActivatePage/>}/>
      <Route path="dashboard" element={<PrivateRoute><DashBoardPage/></PrivateRoute>}/>
      <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    <ToastContainer theme="dark" />
    </>
  )
}

