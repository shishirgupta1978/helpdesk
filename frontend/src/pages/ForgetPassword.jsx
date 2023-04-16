import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Input,Form } from '../components';
export const ForgetPassword = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Login logic here
  };

  return (

    <>
    <Form title="Forget Password" width="380px">
    <Input label="Email" type="email" required={true} />
                      
                   
                    <button className='btn'>Send Email</button>

                    <p style={{marginTop:'20px'}}>Back to Login Page? <strong><Link to="/helpdesk/login/">Click Here</Link></strong></p>
    </Form>
  </>
  );
};

