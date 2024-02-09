import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import '../../CSS/Nav.css';

const LoginForm = () => {
  const [data, setData] = useState({
    Email: '',
    Password: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });
  const [SubOrNot, setSubOrNot] = useState(false);

  const history = useHistory();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData({
      ...data,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubOrNot(true);

   
    const existingUser = true; 
    const storedUsers = []; 

    if (existingUser) {
      console.log('Login successful:', data);
      history.push('/home');
    } else {
      if (storedUsers.some((user) => user.Email === data.Email)) {
        setErrors({
          email: '',
          password: 'Wrong password. Please try again.',
        });
        console.log('Login failed. Wrong password.');
      } else {
        setErrors({
          email: 'Invalid email. Please try again.',
          password: '',
        });
        console.log('Login failed. Invalid email.');
      }
    }
  };

  return (
    <div style={{ maxWidth: '40%', border: '1px solid peru', marginLeft: '30%', fontSize: '120%', marginTop: '10%' }}>
      <Form style={{ textAlign: 'left', marginLeft: '2%' }} onSubmit={handleSubmit}>
        <br />
        <center>
          <h2 className='RegBrand'>Mekoo</h2>
        </center>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={data.Email}
            onChange={handleChange}
            name="Email"
            isInvalid={SubOrNot && !!errors.email}
          />
          <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={data.Password}
              onChange={handleChange}
              name="Password"
              isInvalid={SubOrNot && !!errors.password}
            />
            <Button variant="outline-secondary" onClick={handleTogglePassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
            <Form.Control.Feedback type="invalid">{errors.password}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <center>
          <Button variant="primary" type="submit" style={{ backgroundColor: 'peru', color: 'white', width: '40%' }}>
            Login
          </Button>
          <p style={{ marginTop: '10px' }}>
            New Member? <Link to="/sign">Sign Up</Link>
          </p>
        </center>
        <br />
      </Form>
    </div>
  );
}

export default LoginForm;
