import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PublicRoute = ({ children }) => {
  const { user } = useContext(AuthContext);

  return !user ? children : <Navigate to="/home" />;
};

export default PublicRoute;