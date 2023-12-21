import axios from 'axios';
import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);
  const [username, setUsername] = useState('');
  useEffect(() => {
    const verifyCookie = async () => {
      if (!cookies.token) {
        console.log('No token found, redirecting to /login');
        navigate('/login');
      }
      try {
        const { data } = await axios.post(
          'https://auth-nodejs-mongodb.onrender.com/auth/verify',
          {},
          { withCredentials: true }
        );
        const { status, user } = data;
        console.log('User data:', user);
        setUsername(user);
        if (!status) {
          console.log('Invalid token, redirecting to /login');
          removeCookie('token');
          navigate('/login');
        }
      } catch (error) {
        console.error('Error checking token:', error);
      }
    };
    verifyCookie();
  }, [cookies, navigate, removeCookie]);
  const Logout = () => {
    removeCookie('token');
    navigate('/signup');
  };
  return (
    <>
      <div className="container">
        <h4>
          {' '}
          Welcome <span>{username}</span>
        </h4>
        <button className="btn btn-primary" onClick={Logout}>
          LOGOUT
        </button>
      </div>
    </>
  );
};

export default Home;
