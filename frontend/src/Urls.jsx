import {Layout, HomePage, LoginPage,RegisterPage,ActivatePage, ForgetPassword, DashBoardPage, NotFound,ChangePasswordPage,ResetPassword} from './pages'
import {AllClosedTickets,AllTickets,CreateTicket, TicketDetails, TicketQueue,UpdateTicket,Workspace } from './pages';
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
      <Route path="login" element={<LoginPage/>}/>
      <Route path="changepassword" element={<PrivateRoute><ChangePasswordPage/></PrivateRoute>}/>
      <Route path="register" element={<RegisterPage/>}/>
      <Route path="forgetpassword" element={<ForgetPassword/>}/>
      <Route path="activate/:uid/:token" element={<ActivatePage/>}/>
      <Route path="resetpassword/:uid/:token" element={<ResetPassword/>}/>
      <Route path="dashboard" element={<PrivateRoute><DashBoardPage/></PrivateRoute>}/>
      <Route path="ticket_queue" element={<PrivateRoute><TicketQueue/></PrivateRoute>}/>
      <Route path="workspace" element={<PrivateRoute><Workspace/></PrivateRoute>}/>
      <Route path="all_closed_tickets" element={<PrivateRoute><AllClosedTickets/></PrivateRoute>}/>
      <Route path="all_tickets" element={<PrivateRoute><AllTickets/></PrivateRoute>}/>
      <Route path="create_ticket" element={<PrivateRoute><CreateTicket/></PrivateRoute>}/>
      <Route path="ticket_details/:uid" element={<PrivateRoute><TicketDetails/></PrivateRoute>}/>
      <Route path="update_ticket/:uid" element={<PrivateRoute><UpdateTicket/></PrivateRoute>}/>
      <Route path="workspace/:uid" element={<PrivateRoute><Workspace/></PrivateRoute>}/>
      <Route path="*" element={<NotFound/>}/>
      </Route>
    </Routes>
    <ToastContainer theme="dark" />
    </>
  )
}

