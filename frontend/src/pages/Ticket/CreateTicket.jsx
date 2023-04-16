import React from 'react'

export const CreateTicket = () => {
  return (

    <form action="">
                    <h2>Create a Ticket</h2>
                    <div className="inputbox">
                        <ion-icon name="mail-outline"></ion-icon>
                        <input type="title" required/>
                        <label for="">Title</label>
                    </div>
                    <div className="inputbox">
                        <ion-icon name="lock-closed-outline"></ion-icon>
                        <input type="text" required/>
                        <label for="">Description</label>
                    </div>
                    <button>Log in</button>
                    <div className="register">
                        <p>Don't have a account? <a href="#">Register</a></p>
                    </div>
                </form>

  )
}

