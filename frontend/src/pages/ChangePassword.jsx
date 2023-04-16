import React from 'react'
import { NavLink, Navigate } from 'react-router-dom'
import { FaEnvelope, FaMap, FaTimes, FaTimesCircle } from 'react-icons/fa'
import {RiLockPasswordFill} from 'react-icons/ri'
export const ChangePassword = () => {
  return (
<div className='form-section'>
<div className="form-box">
            <form action="">
                <h2>Change Password</h2>
                <div className="inputbox">
                <span className='icon'><RiLockPasswordFill/></span>
                    <input type="password" required/>
                    <label for="">Old Password</label>
                </div>
                
                <div className="inputbox">
                <span className='icon'><RiLockPasswordFill/></span>
                    <input type="password" required/>
                    <label for="">New Password</label>
                </div>
                <div className="inputbox">
                <span className='icon'><RiLockPasswordFill/></span>
                    <input type="password" required/>
                    <label for="">Confirm New Password</label>
                </div>
                <button>Update</button>
            </form>
        </div></div>
  )
}

