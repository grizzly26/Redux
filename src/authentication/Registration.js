// Registration.js
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../redux/actions';
import './style.css';

const Registration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [errors, setErrors] = useState({});
  const [passwordStrength, setPasswordStrength] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password, confirmPassword } = formData;

    const errors = {};
    if (!validateEmail(email)) {
      errors.email = 'Enter a valid email address';
    }
    if (!validatePassword(password)) {
      errors.password =
        'Password should be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one digit.';
    } else if (password !== confirmPassword) {
      errors.password = 'Passwords do not match';
    }

    if (Object.keys(errors).length === 0) {
      try {
        const user = {
          email,
          password,
          createdAt: Date.now(),
        };

       
        const response = await fetch('http://localhost:5001/users', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          throw new Error('Failed to create user');
        }

       
        const newUser = await response.json();

      
        dispatch(registerUser(newUser));

      
        navigate('/Login');
      } catch (error) {
        console.error('Error registering user:', error);
      }
    } else {
      setErrors(errors);
    }
  };

  const validateEmail = (email) => {
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regex.test(email);
  };

  const validatePassword = (password) => {
    const isValidPassword =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password);

    return isValidPassword;
  };

  const checkPasswordStrength = (password) => {
    const isValidPassword =
      password.length >= 8 &&
      /[A-Z]/.test(password) &&
      /[a-z]/.test(password) &&
      /\d/.test(password);

    if (isValidPassword) {
      setPasswordStrength('');
    } else {
      setPasswordStrength(
        'Password should be at least 8 characters, contain at least one uppercase letter, one lowercase letter, and one digit.'
      );
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === 'password') {
      checkPasswordStrength(value);
    }

    if (name === 'confirmPassword' && formData.password === value) {
      setErrors({ ...errors, password: '' });
    } else if (name === 'confirmPassword' && formData.password !== value) {
      setErrors({ ...errors, password: 'Passwords do not match' });
    }
  };

  const handlePasswordChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, password: value });
    checkPasswordStrength(value);
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <fieldset>
          <div>
            <h1>Register</h1>
            <p>Please fill in this form to create an account.</p>
            <hr />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Enter email"
              className="rect"
            />
            {errors.email && <span>{errors.email}</span>}

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handlePasswordChange}
              placeholder="Enter password"
              className="rect"
            />
            {passwordStrength && <span>{passwordStrength}</span>}
            {errors.password && <span>{errors.password}</span>}

            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
              className="rect"
            />
            {errors.confirmPassword && <span>{errors.confirmPassword}</span>}

            <input type="submit" value="Register" className="my_button" />
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Registration;
