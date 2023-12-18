import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const response = await axios.post(
        'http://localhost:3000/auth/login',
        formData,
        { withCredentials: true }
      );

      const { message, success } = response.data;

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
        <h2>Login</h2>
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
        <form onSubmit={handleLogin} className="needs-validation" noValidate>
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
              autoComplete="current-password"
              onChange={handleInputChange}
              className="form-control"
              required
            />
            <div className="invalid-feedback">Please enter a password.</div>
          </div>

          <button
            type="submit"
            className="btn btn-primary mb-3"
            disabled={loading}
          >
            {loading ? 'Login...' : 'Login'}
          </button>
        </form>
        <p>
          Already have an account? <Link to={'/signup'}>Signup</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
