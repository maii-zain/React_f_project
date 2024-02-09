import React, { useState } from 'react';
import { Form, Button, InputGroup } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import '../../CSS/Nav.css';

const RegisterForm = () => {
  const [data, setData] = useState({
    Email: '',
    Name: '',
    Username: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const [errors, setErrors] = useState({
    Email: '',
    Name: '',
    Username: '',
    Password: '',
    ConfirmPassword: '',
  });

  const [Meko, setMeko] = useState([]);
  const history = useHistory();

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validateUsername = (username) => !/\s/.test(username);
  const validatePassword = (password) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validateConfirmPassword = (confirmPassword) => confirmPassword === data.Password;

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
    setSubmitAttempted(true);

    const newErrors = {
      Email: '',
      Name: '',
      Username: '',
      Password: '',
      ConfirmPassword: '',
    };

    if (!validateEmail(data.Email)) {
      newErrors.Email = 'Please enter a valid email address';
    }

    if (data.Name.trim() === '') {
      newErrors.Name = 'Please enter your name';
    }

    if (data.Username.trim() === '') {
      newErrors.Username = 'Username is required';
    } else if (!validateUsername(data.Username)) {
      newErrors.Username = 'Username cannot contain spaces';
    }

    if (!validatePassword(data.Password)) {
      newErrors.Password = 'Password must be at least 8 characters, with one lowercase, one uppercase, one digit, and one special character';
    }

    if (!validateConfirmPassword(data.ConfirmPassword)) {
      newErrors.ConfirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);

    if (Object.values(newErrors).every((error) => error === '')) {
      const newUser = {
        Email: data.Email,
        Name: data.Name,
        Username: data.Username,
        Password: data.Password,
      };

      const storedUsers = JSON.parse(localStorage.getItem('MekoUsers')) || [];
      localStorage.setItem('MekoUsers', JSON.stringify([...storedUsers, newUser]));

      setMeko([...Meko, newUser]);

      console.log('Form submitted:', data);
      console.log('Meko Users:', Meko);

      
      history.push('/login');
    } else {
      console.log('Validation failed');
    }
  };

  return (
    <div style={{ maxWidth: '40%', border: '1px solid peru', marginLeft: '30%', marginTop: '10%', fontSize: '120%', marginTop: '6%' }}>
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
            isInvalid={submitAttempted && errors.Email !== ''}
          />
          <Form.Control.Feedback type="invalid">{errors.Email}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Control type="text" placeholder="Enter your name" value={data.Name} onChange={handleChange} name="Name" />
          <Form.Control.Feedback type="invalid">{errors.Name}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={data.Username}
            onChange={handleChange}
            name="Username"
            isInvalid={submitAttempted && errors.Username !== ''}
          />
          <Form.Control.Feedback type="invalid">{errors.Username}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <InputGroup>
            <Form.Control
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={data.Password}
              onChange={handleChange}
              name="Password"
              isInvalid={submitAttempted && errors.Password !== ''}
            />
            <Button variant="outline-secondary" onClick={handleTogglePassword}>
              {showPassword ? 'Hide' : 'Show'}
            </Button>
            <Form.Control.Feedback type="invalid">{errors.Password}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            value={data.ConfirmPassword}
            onChange={handleChange}
            name="ConfirmPassword"
            isInvalid={submitAttempted && errors.ConfirmPassword !== ''}
          />
          <Form.Control.Feedback type="invalid">{errors.ConfirmPassword}</Form.Control.Feedback>
        </Form.Group>

        <center>
          <Button variant="primary" type="submit" style={{ backgroundColor: 'peru', color: 'white', width: '40%' }}>
            Register
          </Button>
        </center>
        <br />
      </Form>
    </div>
  );
}

export default RegisterForm;
