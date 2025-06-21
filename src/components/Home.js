import { useNavigate } from 'react-router-dom';
import Note from './Note';
import { useEffect } from 'react';

const Home = () => {
  const auth_token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth_token) {
      navigate('/login');
    }
  }, [auth_token,navigate]);

  return (
    <>
      <Note />
    </>
  )
}

export default Home
