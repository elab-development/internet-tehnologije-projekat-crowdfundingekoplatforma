import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import AuthContext from '../contexts/AuthContext';

const PrivateRoute = ({ children, ...rest }) => {
    const { user } = useContext(AuthContext);

    if (!user) {
        return <Navigate to="/login" />;
    }

    if (rest.path === '/admin' && !user.is_admin) {
        return <Navigate to="/home" />;
    }

    return children ? children : <Outlet />;
};

export default PrivateRoute;