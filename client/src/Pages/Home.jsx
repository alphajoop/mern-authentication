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
        navigate('/login');
      }
      const { data } = await axios.post(
        'http://localhost:3000',
        {},
        { withCredentials: true }
      );
      const { status, user } = data;
      setUsername(user);
      return !status && (removeCookie('token'), navigate('/login'));
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
