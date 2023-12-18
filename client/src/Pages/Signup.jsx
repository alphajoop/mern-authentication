import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: '',
  });
  const [statusMessage, setStatusMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:3000/auth/signup',
        formData,
        { withCredentials: true }
      );

      const { success, message } = response.data;

      if (success) {
        setStatusMessage(message);
        setTimeout(() => {
          navigate('/');
        }, 1000);
      } else {
        setStatusMessage(`Error: ${message}`);
      }
    } catch (error) {
      setStatusMessage(`${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container-fluid">
      <div>
        <h2>Signup</h2>
        {statusMessage && (
          <div
            className={`alert ${
              statusMessage.includes('Error') ? 'alert-danger' : 'alert-success'
            }`}
            role="alert"
          >
            {statusMessage}
          </div>
        )}
        <form onSubmit={handleSignup} className="needs-validation" noValidate>
          <div className="form-group mb-3">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Enter your email"
              autoComplete="email"
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <div className="invalid-feedback">Please enter a valid email.</div>
          </div>

          <div className="form-group mb-3">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Enter your password"
              autoComplete="password"
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <div className="invalid-feedback">Please enter a password.</div>
          </div>

          <div className="form-group mb-3">
            <label>Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              placeholder="Enter your username"
              autoComplete="username"
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <div className="invalid-feedback">Please enter a username.</div>
          </div>
          <button
            type="submit"
            className="btn btn-primary mb-3"
            disabled={loading}
          >
            {loading ? 'Signing up...' : 'Signup'}
          </button>
        </form>
        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
