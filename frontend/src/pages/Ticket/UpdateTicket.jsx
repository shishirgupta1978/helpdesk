import React from 'react'

export const UpdateTicket = () => {
  return (
<div className="card mx-auto" style="width: 40rem;">
    <div className="card-body">
        <h5 className="card-title mb-3">Update Ticket</h5>
        <form method="POST">
            <div className="mb-3">
                <label for="username" className="form-label">Issue Title</label>
                
            </div>
            <div className="mb-3">
                <label for="username" className="form-label">Description</label>
                
            </div>

            <button className="btn btn-primary">Submit</button>
        </form>
</div>
</div>    


  )
}

